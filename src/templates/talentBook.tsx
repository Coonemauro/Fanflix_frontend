import React, { useState } from "react";
import { GetServerDataProps, GetServerDataReturn, graphql } from "gatsby";
import { notifications } from '@mantine/notifications';
import { Stepper, TextInput, Button, Group, Text, Stack, Title, Card, createStyles, Avatar, Select, Textarea, Checkbox, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconNotes, IconUserCheck } from "@tabler/icons-react";
import { useDisclosure, useFocusTrap, useWindowScroll } from "@mantine/hooks";
import axios from "axios";
import { Order, Talent } from "../interfaces";
import { Layout } from "../components/Layout";
import { useIntl } from "gatsby-plugin-intl";

type TalentBookProps = {
    data: { strapiTalent: Talent },
    serverData: any
}

const TalentBook: React.FC<TalentBookProps> = ({ data, serverData }) => {
    const intl = useIntl()
    const talent = data.strapiTalent

    const serverTalent: Talent = serverData.data.attributes
    if (serverTalent) {
        talent.price = serverTalent.price
        talent.description = serverTalent.description
        talent.deliveryDays = serverTalent.deliveryDays
        talent.fastDelivery = serverTalent.fastDelivery
        talent.fastDeliveryDays = serverTalent.fastDeliveryDays
    }

    let fastDeliveryRate = 0.3 // 30%
    if (talent.fastDeliveryDays === 1) {
        fastDeliveryRate = 0.3; // 30% if fastDeliveryDays is 1
      } else if (talent.fastDeliveryDays === 2) {
        fastDeliveryRate = 0.2; // 20% if fastDeliveryDays is 2
      } else if (talent.fastDeliveryDays === 3) {
        fastDeliveryRate = 0.1; // 10% if fastDeliveryDays is 3
      }

    const useStyles = createStyles((theme) => ({
        hiddenMobile: {
            [theme.fn.smallerThan("xs")]: {
                display: 'none',
            },
        },
        header: {
            position: 'fixed',
            top: 0,
            zIndex: 100000,
            width: '100%',
            //maxWidth: '16',
            left: '50%',
            transform: 'translateX(-50%)',
        },
        warningText: {
            color: theme.colors.orange[6]
        }
    }))
    const { classes } = useStyles();
    const focusTrapRef = useFocusTrap();
    const [scroll, scrollTo] = useWindowScroll();
    const [active, setActive] = useState(1);
    const [showFormErrorMessage, setShowFormErrorMessage] = useState(false)

    const handleContinue = () => {
        if (form.validate().hasErrors) {
            setShowFormErrorMessage(true)
            return;
        }
        //scrollTo({ y: 0 })
        setShowFormErrorMessage(false)
        setActive(2)
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    const form = useForm({
        validateInputOnBlur: true,
        initialValues: {
            toName: '',
            fromName: '',
            occasion: '',
            requestDescription: '',
            userEmail: ''
        },
        validate: {
            toName: (value) => value.trim().length < 3 ? intl.formatMessage({ id: "book.name_validate" }) : null,
            fromName: (value) => value.trim().length < 3 ? intl.formatMessage({ id: "book.name_validate" }) : null,
            occasion: (value) => value === '' ? intl.formatMessage({ id: "book.occasion_validate" }) : null,
            requestDescription: (value) => value.trim().length < 20 ? intl.formatMessage({ id: "book.instruction_validate" }) : null,
        },
    })

    const [messagePlaceholder, setMessagePlaceholder] = useState(intl.formatMessage({ id: "book.video_instruction_placeholder" }));
    const handleOccasionChange = (value: string) => {
        switch (value) {
            case "birthday":
                setMessagePlaceholder(intl.formatMessage({ id: "book.video_occasion_birthday_hint" }));
                break;
            case "question":
                setMessagePlaceholder(intl.formatMessage({ id: "book.video_occasion_question_hint" }));
                break;
            case "advice":
                setMessagePlaceholder(intl.formatMessage({ id: "book.video_occasion_advice_hint" }));
                break;
            default:
                setMessagePlaceholder(intl.formatMessage({ id: "book.video_occasion_other_hint" }))
        }
        form.setFieldValue('occasion', value);
    }

    const checkEmailForm = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : intl.formatMessage({ id: "book.email_validate" })),
        },
    });

    const [checkCodeOpened, checkCodeHandlers] = useDisclosure(false);

    const checkEmailSubmit = async () => {
        if (checkEmailForm.validate().hasErrors) {
            return
        }
        checkCodeForm.setFieldValue('checkCode', '')
        checkCodeHandlers.open()

        const checkEmail = checkEmailForm.getInputProps('email').value
        type CheckEmailDataType = {
            email: string,
            code: number
        }

        const checkEmailData: CheckEmailDataType = {
            email: checkEmail,
            code: Math.floor(100000 + Math.random() * 900000),
        }
        await axios.post(
            `${process.env.STRAPI_API_URL}/api/user-email-checks`,
            { data: checkEmailData },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                //alert(`(DEV ONLY: ${checkEmailData.code})`)
            })
            .catch((error) => {
                console.error(error)
                notifications.show({
                    title: 'Connection error',
                    message: 'Something went wrong, try a bit later.',
                    color: 'red',
                    withBorder: true,
                })
            });
    }

    const checkCodeForm = useForm({
        initialValues: {
            checkCode: '',
        },
        validate: {
            checkCode: (value) => ((value.length == 6 && /^\d+$/.test(value)) ? null : 'wrong format'),
        },
    })
    const checkCodeSubmit = async () => {
        if (checkCodeForm.validate().hasErrors) {
            return
        }
        let validcodeID = -1
        const checkCode = checkCodeForm.getInputProps('checkCode').value
        await axios
            .get(
                `${process.env.STRAPI_API_URL}/api/user-email-checks?filters[$and][0][code][$eq]=${checkCode}&filters[$and][1][email][$eq]=${checkEmailForm.getInputProps('email').value}`,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                const validcodeArray = response.data.data
                if (validcodeArray.length > 0) {
                    validcodeID = validcodeArray[validcodeArray.length - 1].id
                }
            })
            .catch((error) => {
                console.error(error)
                notifications.show({
                    title: intl.formatMessage({ id: "book.email_verification_failed" }),
                    message: intl.formatMessage({ id: "book.email_verification_failed_desc" }),
                    color: 'red',
                    withBorder: true,
                })
                return
            });

        if (validcodeID == -1) {
            notifications.show({
                title: intl.formatMessage({ id: "book.email_verification_invalid" }),
                message: intl.formatMessage({ id: "book.email_verification_invalid_desc" }),
                color: 'red',
                withBorder: true,
            })
            return
        }

        await axios
            .delete(
                `${process.env.STRAPI_API_URL}/api/user-email-checks/${validcodeID}`,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .catch((error) => {
                console.error(error)
            });
        form.setFieldValue('userEmail', checkEmailForm.getInputProps('email').value)
    }

    type DeliveryOption = 'standard' | 'fast';
    const [delivery, setDelivery] = useState<DeliveryOption[]>(['standard']);
    const handleDeliveryChange = (value: DeliveryOption[]) => {
        if (value.length > 1) {
            let option = value[1]
            if (option === 'standard') {
                setFinalPrice(talent.price)
            } else {
                setFinalPrice(Math.round(talent.price * (1 + fastDeliveryRate)))
            }
            setDelivery([option]);
        }
    };

    const [finalPrice, setFinalPrice] = useState(talent.price)

    const [bookingInprogress, setBookingInprogress] = useState(false)

    const handleBook = async () => {
        setBookingInprogress(true)

        let numberOfDays = talent.deliveryDays;
        if (delivery.includes('fast')) {
          numberOfDays = 1;
        }
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + numberOfDays));
        
        const order: Order = {
            orderID: '',
            to: form.getInputProps('toName').value,
            from: form.getInputProps('fromName').value,
            talent: talent.strapi_id,
            userEmail: checkEmailForm.getInputProps('email').value,
            occasion: form.getInputProps('occasion').value,
            requestDescription: form.getInputProps('requestDescription').value,
            payedAmount: finalPrice,
            checkoutURL: "",
            createdAt: "",
            paymentID: "",
            paymentStatus: "open",
            status: "open",
            updatedAt: "",
            videoURL: "",
            dueDate: deliveryDate.toISOString().split('T')[0]
        }

        let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 24; i++) {
            order.orderID += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        await axios
            .post(
                `${process.env.STRAPI_API_URL}/api/orders`,
                { data: order },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                window.location.href = response.data.data.attributes.checkoutURL
            })
            .catch((error) => {
                console.error(order)
                console.error(error)
                notifications.show({
                    title: intl.formatMessage({ id: "book.failed" }),
                    message: intl.formatMessage({ id: "book.failed_desc" }),
                    color: 'red',
                    withBorder: true,
                })
            });

        setBookingInprogress(false)
    }

    return (
        <Layout title={`${intl.formatMessage({ id: "book.book_from" })} ${talent.name}`} noMenuBar={true}>
            <Stack maw={600} mx="auto">
                <Card h={60} withBorder py={10} mb={10} radius={0} className={classes.header} mx="auto">
                    <Group maw={600} mx="auto" >
                        <Avatar src={`${talent.image[0].url}`} alt={talent.name} radius="xl" />
                        <Stack spacing={3}>
                            <Text size="xs">{intl.formatMessage({ id: "book.reques_from" })} {talent.name}</Text>
                            <Text size="xs">{talent.description}</Text>
                        </Stack>
                    </Group>
                </Card>
                <Stepper mt={60} active={active} onStepClick={setActive} size="sm" allowNextStepsSelect={false} orientation="vertical">
                    <Stepper.Step label={intl.formatMessage({ id: "book.stepper_pick" })} description={intl.formatMessage({ id: "book.stepper_pick_desc" })} allowStepSelect={false} className={classes.hiddenMobile}>
                    </Stepper.Step>
                    <Stepper.Step label={intl.formatMessage({ id: "book.stepper_write" })} description={intl.formatMessage({ id: "book.stepper_write_desc" })} icon={<IconNotes size="1.1rem" />}>
                        <Card withBorder shadow="md" px={30} mt={20} radius="md">
                            <Title order={4} pb={10}>1. {intl.formatMessage({ id: "book.video_for" })}</Title>
                            <TextInput placeholder={intl.formatMessage({ id: "book.video_for_placeholder" })} radius="md" {...form.getInputProps('toName')} />
                        </Card>
                        <Card withBorder shadow="md" px={30} mt={20} radius="md">
                            <Title order={4} pb={10}>2. {intl.formatMessage({ id: "book.video_from" })}</Title>
                            <TextInput  placeholder={intl.formatMessage({ id: "book.video_from_placeholder" })} radius="md" {...form.getInputProps('fromName')} />
                        </Card>
                        <Card withBorder shadow="md" px={30} mt={20} radius="md">
                            <Title order={4} pb={10}>{intl.formatMessage({ id: "book.video_occasion" })}</Title>
                            <Select
                                data={[
                                    { value: "birthday", label: intl.formatMessage({ id: "book.video_occasion_birthday" }) },
                                    { value: "question", label: intl.formatMessage({ id: "book.video_occasion_question" }) },
                                    { value: "advice", label: intl.formatMessage({ id: "book.video_occasion_advice" }) },
                                    { value: "other", label:intl.formatMessage({ id: "book.video_occasion_other" }) },
                                ]}
                                placeholder={intl.formatMessage({ id: "book.video_occasion_placeholder" })}
                                dropdownPosition="bottom"
                                withinPortal
                                {...form.getInputProps('occasion')}
                                onChange={handleOccasionChange}
                            />
                        </Card>
                        <Card withBorder shadow="md" px={30} mt={20} radius="md">
                            <Title order={4} pb={10}>4. {intl.formatMessage({ id: "book.video_instruction" })}</Title>
                            <Textarea
                                minRows={5}
                                placeholder={messagePlaceholder}
                                label={`${intl.formatMessage({ id: "book.video_instructions_for" })} ${talent.name}`}
                                autosize
                                {...form.getInputProps('requestDescription')}
                            />
                            <Group position="center" mt="xl">
                                <Stack>
                                    <Text className={classes.warningText} size={12} hidden={!showFormErrorMessage}>{intl.formatMessage({ id: "book.scroll_up" })}</Text>
                                    <Button radius="lg" size="md" px="xl" onClick={handleContinue}>{intl.formatMessage({ id: "book.continue" })}</Button>
                                </Stack>
                            </Group>
                        </Card>
                    </Stepper.Step>
                    <Stepper.Step label={intl.formatMessage({ id: "book.stepper_pay" })} description={intl.formatMessage({ id: "book.stepper_pay_desc" })} icon={<IconUserCheck size="1.1rem" />}>
                        <Card withBorder shadow="md" px={30} mt={20} radius="md">
                            <Stack spacing={30}>
                                <Stack spacing="xs" >
                                    <Title order={3} pb={10}>{intl.formatMessage({ id: "book.email" })}</Title>
                                    <Text>{intl.formatMessage({ id: "book.email_desc" })}</Text>
                                    {form.isTouched('userEmail') &&
                                        <Text fw={700}>{form.getInputProps('userEmail').value}</Text>
                                    }
                                    {!form.isTouched('userEmail') &&
                                        <Group position="center" ref={focusTrapRef}>
                                            <TextInput
                                                data-autofocus
                                                w={"100%"}
                                                placeholder={intl.formatMessage({ id: "book.email_placeholder" })}
                                                {...checkEmailForm.getInputProps('email')}
                                            />
                                            <Group w={"100%"} position="center">
                                                <Button onClick={checkEmailSubmit} variant="outline" radius="lg" size="sm" w={200}>
                                                    {intl.formatMessage({ id: "book.send_code" })}
                                                </Button>
                                            </Group>
                                            <Modal centered opened={checkCodeOpened} onClose={checkCodeHandlers.close} >
                                                <Stack justify="space-between" align="center" spacing={5} pt={0}>
                                                    <Title order={3}>{intl.formatMessage({ id: "book.email_verification" })}</Title>
                                                    <Text size='xs'>{intl.formatMessage({ id: "book.email_verification_send" })}</Text>
                                                    <Text size='xs'>{checkEmailForm.getInputProps('email').value}</Text>
                                                    <TextInput
                                                        size="lg"
                                                        w={95}
                                                        mt={20}
                                                        {...checkCodeForm.getInputProps('checkCode')}
                                                        onChange={(event) => {
                                                            checkCodeForm.setFieldValue('checkCode', event.currentTarget.value.slice(0, 6))
                                                        }}
                                                    />
                                                    <Button onClick={checkCodeSubmit} variant="outline" radius="lg" size="sm" w={150} mt={30}>
                                                        {intl.formatMessage({ id: "book.email_verification_verify" })}
                                                    </Button>
                                                    <Button onClick={checkEmailSubmit} variant="subtle" radius="md" size="xs" compact mt={15}>
                                                        {intl.formatMessage({ id: "book.email_verification_resend" })}
                                                    </Button>
                                                </Stack>
                                            </Modal>
                                        </Group>
                                    }
                                </Stack>
                                <Stack spacing="xs">
                                    <Title order={3} pb={10}>{intl.formatMessage({ id: "book.speed" })}</Title>
                                    {talent.fastDelivery &&
                                        <Checkbox.Group value={delivery} onChange={handleDeliveryChange}>
                                            <Checkbox radius="md" size="xl" label={`${intl.formatMessage({ id: "book.standard" })} - ${intl.formatMessage({ id: "book.within" })} ${talent.deliveryDays ?? 7} ${intl.formatMessage({ id: "book.days" })}`} value="standard" mb={15} />
                                            <Checkbox radius="md" size="xl" label={`${intl.formatMessage({ id: "book.fast_delivery_for" })} +${fastDeliveryRate * 100}% - ${intl.formatMessage({ id: "book.within" })} ${talent.fastDeliveryDays ?? 1} ${talent?.fastDeliveryDays > 1 ? intl.formatMessage({ id: "book.days" }) : intl.formatMessage({ id: "book.day" })}`} value="fast" />
                                        </Checkbox.Group>
                                    }
                                    {!talent.fastDelivery &&
                                        <Text>{intl.formatMessage({ id: "book.within" })} {talent.deliveryDays ?? 7} {intl.formatMessage({ id: "book.days" })}</Text>
                                    }
                                </Stack>
                                <Stack spacing="xs">
                                    <Title order={3} pb={5}>{intl.formatMessage({ id: "book.payment" })}</Title>
                                    <Text>{intl.formatMessage({ id: "book.payment_desc" })}</Text>
                                </Stack>
                                <Group position="center" m="xl">
                                    <Button radius="md" size="lg" px="xl" onClick={handleBook} loading={bookingInprogress} disabled={!form.isTouched('userEmail')}>
                                        {intl.formatMessage({ id: "book.book_for_short" })} €{finalPrice}
                                    </Button>
                                </Group>
                            </Stack>
                        </Card>
                    </Stepper.Step>
                </Stepper>
            </Stack>
        </Layout>
    )
}

export default TalentBook

export const query = graphql`
  query($strapi_id: Int) {
    strapiTalent(strapi_id: {eq: $strapi_id}) {
      strapi_id
      slug
      name
      description
      deliveryDays
      fastDelivery
      fastDeliveryDays
      image {
        url
      }
    }
  }
`
export async function getServerData(props: GetServerDataProps): GetServerDataReturn {
    const id = props.pageContext.strapi_id
    try {
        const res = await fetch(`${process.env.STRAPI_API_URL}/api/talents/${id}?fields[0]=price&fields[1]=deliveryDays&fields[2]=fastDelivery&fields[3]=fastDeliveryDays&fields[4]=description`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`,
                'Content-Type': 'application/json'
            },
        })

        if (!res.ok) {
            throw new Error(`Response failed`)
        }
        return {
            props: await res.json(),
        }
    } catch (error) {
        return {
            status: 500,
            headers: {},
            props: {},
        };
    }
}

