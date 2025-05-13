import React, { useEffect } from "react";
import { GetServerDataProps, GetServerDataReturn, graphql } from "gatsby";
import { Stack, Avatar, Group, Text, Breadcrumbs, Button, Box, MediaQuery, Accordion, Container, Title, createStyles, rem } from "@mantine/core";
import HowTo from "../components/Howto/Howto";
import { Layout } from "../components/Layout";
import TalentVideoGroup from "../components/Main/TalentVideoGroup";
import { Talent } from "../interfaces";
import { IconVideo, IconVideoPlus, IconReportMoney } from "@tabler/icons-react";
import TalentCardGroup from "../components/Main/TalentCardGroup";
import { useIntl, navigate, Link } from "gatsby-plugin-intl";

type TalentDetailsProps = {
    data: { strapiTalent: Talent, recommended: any, allTalent: any },
    serverData: any
}

const TalentDetails: React.FC<TalentDetailsProps> = ({ data, serverData }) => {
    const useStyles = createStyles((theme) => ({
        wrapper: {
            position: 'relative',
            boxSizing: 'border-box',
            //backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
        inner: {
            position: 'relative',
            paddingTop: rem(60),
            paddingBottom: rem(20),

            [theme.fn.smallerThan('sm')]: {
                paddingBottom: rem(80),
                paddingTop: rem(20),
            },
        },

        titleFAQ: {
            marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        },

        item: {
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.lg,
            border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
                }`,
        },

    }));

    const { classes } = useStyles();
    const intl = useIntl()

    const placeholder =
        'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';


    const talent = data.strapiTalent
    const recommendedTalents = data.recommended.edges
    const allTalents = data.allTalent.edges

    const serverTalent: Talent = serverData.data.attributes
    if (serverTalent) {
        talent.price = serverTalent.price
        talent.description = serverTalent.description
        talent.active = serverTalent.active
        talent.videoURL = serverTalent.videoURL
        talent.profileOrders = serverTalent.profileOrders
        talent.deliveryDays = serverTalent.deliveryDays
        talent.fastDelivery = serverTalent.fastDelivery
        talent.fastDeliveryDays = serverTalent.fastDeliveryDays
    }

    const breadcrumbItems = [
        { label: intl.formatMessage({ id: "common.home" }), link: '/' },
        { label: intl.formatMessage({ id: `categories.${talent.subcategory.category.name}` }), link: `/browse/${talent.subcategory.category.slug}` },
        { label: intl.formatMessage({ id: `subcategories.${talent.subcategory.name}` }), link: `/browse/${talent.subcategory.category.slug}/${talent.subcategory.slug}` },
    ].map((item) => (
        <Link to={`${item.link}`} style={{ color: 'inherit' }}>
            <Text fz="sm">{item.label}</Text>
        </Link>
    ));

    const handleBookNow = () => {
        navigate(`/${talent.slug}/book`);
    };

    useEffect(() => {
        let recenty = localStorage.getItem('recently')
        if (recenty) {
            var recentlyArray = JSON.parse(recenty)

            let newNode = { node: talent }

            const existingIndex = recentlyArray.findIndex((item: { node: { strapi_id: any; }; }) => item.node.strapi_id === newNode.node.strapi_id);

            if (existingIndex !== -1) {
                const existingItem = recentlyArray.splice(existingIndex, 1)[0];
                recentlyArray.unshift(existingItem);
            } else {
                recentlyArray.unshift(newNode);
            }
            if (recentlyArray.length > 10) {
                recentlyArray = recentlyArray.slice(0, 10);
            }
            localStorage.setItem('recently', JSON.stringify(recentlyArray))
        } else {
            localStorage.setItem('recently', JSON.stringify([{ node: talent }]))
        }
    })

    return (
        <Layout title={talent.name} hideMenuBar>
            <Stack spacing={10}>
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <Breadcrumbs separator=">" mt={10}>
                        {breadcrumbItems}
                        <Text fz="sm">{talent.name}</Text>
                    </Breadcrumbs>
                </MediaQuery>
                <Box
                    sx={(theme) => ({
                        position: 'sticky',
                        top: 0,
                        zIndex: 5,
                        backgroundColor: theme.colors.dark[7],
                    })}
                >
                    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                        <Group spacing="xs" py={10} noWrap>
                            <Stack justify="flex-start">
                                <Avatar src={talent.image[0].url} radius={130} size={130} />
                            </Stack>
                            <Stack justify="flex-start" spacing={0} p={0}>
                                <Text fz={{ base: 20, sm: 30 }} fw={{ base: 500, sm: 600 }}>
                                    {talent.name}
                                </Text>
                            </Stack>
                            {talent.active &&
                                <Stack align="center" justify="flex-end" spacing={0} p={0} ml={25}>
                                    <Button radius="xl" size="lg" onClick={handleBookNow}>
                                        {intl.formatMessage({ id: "book.book_for" })} €{talent.price}
                                    </Button>
                                </Stack>
                            }
                            {!talent.active &&
                                <Button radius="xl" size="lg" ml={25} disabled >
                                    {intl.formatMessage({ id: "book.n_a" })}
                                </Button>
                            }
                            <Stack justify="flex-start" spacing={0} p={0} pl={40} >
                                <Group spacing={5} pr={30} noWrap>
                                    <IconReportMoney size="1.3rem" />
                                    <Text weight={400} size="lg" miw={200}>
                                     {intl.formatMessage({ id: "book.money_back" })}
                                    </Text>
                                </Group>
                                <Text weight={300} size="xs" >
                                    {intl.formatMessage({ id: "book.money_back_desc" })}
                                </Text>
                            </Stack>
                        </Group>
                    </MediaQuery>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                        <Group spacing="xs" py={8}>
                            <Avatar src={talent.image[0].url} radius={50} size={50} />
                            <Text fz={{ base: 20, sm: 30 }} fw={{ base: 500, sm: 600 }}>
                                {talent.name}
                            </Text>
                            {talent.active &&
                                <Button radius="lg" size="sm" ml={25} onClick={handleBookNow}>
                                    {intl.formatMessage({ id: "book.book_for" })} €{talent.price}
                                </Button>
                            }
                            {!talent.active &&
                                <Button radius="lg" size="sm" ml={25} disabled>{intl.formatMessage({ id: "book.n_a" })}</Button>
                            }
                        </Group>
                    </MediaQuery>
                </Box>

                <Group spacing={0}>
                    <Group spacing={5} pr={30}>
                        <IconVideo size="1.1rem" />
                        <Text weight={400} size="sm" >
                            {intl.formatMessage({ id: "book.delivery_within" })} {talent.deliveryDays ?? 7} {intl.formatMessage({ id: "book.days" })}
                        </Text>
                    </Group>
                    {talent?.fastDelivery &&
                        <Group spacing={5}>
                            <IconVideoPlus size="1.1rem" />
                            <Text weight={400} size="sm" >
                                {intl.formatMessage({ id: "book.fast_delivery_within" })} {talent.fastDeliveryDays ?? 1} {talent?.fastDeliveryDays > 1 ? intl.formatMessage({ id: "book.days" }) : intl.formatMessage({ id: "book.day" })}
                            </Text>
                        </Group>
                    }
                </Group>


                <Text color="dimmed" fz={{ base: 15, sm: 20 }}>
                    {talent.description}
                </Text>

                <TalentVideoGroup talent={talent} />
                <Box mt={30}><HowTo /></Box>
                <Box mt={30}>
                {recommendedTalents.length > 2 &&
                    <TalentCardGroup title={intl.formatMessage({ id: "common.might_also_like" })}  link={undefined} talents={recommendedTalents} serverTalents={undefined} />
                }
                {recommendedTalents.length <= 2 &&
                    <TalentCardGroup title={intl.formatMessage({ id: "common.might_also_like" })} link={undefined} talents={allTalents} serverTalents={undefined} />
                }
                </Box>

                <div className={classes.wrapper}>
                    <Container size="sm" className={classes.inner}>
                        <Title align="center" className={classes.titleFAQ}>
                            Frequently Asked Questions
                        </Title>

                        <Accordion variant="separated">
                            <Accordion.Item className={classes.item} value="reset-password">
                                <Accordion.Control>How can I reset my password?</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="another-account">
                                <Accordion.Control>Can I create more that one account?</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="newsletter">
                                <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="credit-card">
                                <Accordion.Control>Do you store credit card information securely?</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="payment">
                                <Accordion.Control>What payment systems to you work with?</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Container>
                </div>

            </Stack>
        </Layout>
    )
}

export default TalentDetails

export const query = graphql`
  query($strapi_id: Int, $subID: Int) {
    strapiTalent(strapi_id: {eq: $strapi_id}) {
      strapi_id
      slug
      active      
      name
      description
      price
      deliveryDays
      fastDelivery
      fastDeliveryDays
      image {
        url
      }
      subcategory {
        name
        slug
        category {
          name
          slug
        }
      }
    }
    recommended: allStrapiTalent(
        sort: { completeOrderCount: DESC }
        filter: {
          subcategory: {strapi_id: {eq: $subID}}, strapi_id: {ne: $strapi_id}
        }
        limit: 10
        ){
        edges {
          node {
            image {
              url
            }
            slug
            price
            name
            description
            strapi_id
            active
          }
        }
      }    

    allTalent: allStrapiTalent(
        sort: { completeOrderCount: DESC }
        filter: {
            strapi_id: {ne: $strapi_id}
        }
        limit: 10
        ){
        edges {
          node {
            image {
              url
            }
            slug
            price
            name
            description
            strapi_id
            active
          }
        }
      }    

  }
`

export async function getServerData(props: GetServerDataProps): GetServerDataReturn {
    const id = props.pageContext.strapi_id
    try {
        const res = await fetch(`${process.env.STRAPI_API_URL}/api/talents/${id}?fields[0]=price&fields[1]=description&fields[2]=active&fields[3]=videoURL&populate[profileOrders][fields][4]=videoURL&fields[5]=deliveryDays&fields[6]=fastDelivery&fields[7]=fastDeliveryDays&fields[8]=viewCount`, {
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