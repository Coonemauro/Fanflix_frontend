import React from "react"
import { GetServerDataProps, GetServerDataReturn } from "gatsby"
import { Layout } from "../../components/Layout"
import { Container, Stack, Title, Text, Stepper, Paper, Divider, Box, Group, Tooltip, Button, rem } from "@mantine/core"
import HowTo from "../../components/Howto/Howto"
import { Order, Talent } from "../../interfaces"
import { IconMailOpened, IconVideo, IconMailFast, IconCheck, IconCopy, IconFileDownload } from "@tabler/icons-react"
import { Player, BigPlayButton, LoadingSpinner, ControlBar, VolumeMenuButton, CurrentTimeDisplay, FullscreenToggle, PlayToggle, ReplayControl } from "video-react"
import { useClipboard } from "@mantine/hooks"
import '../../../node_modules/video-react/dist/video-react.css'
import '../../styles/video-react-custom.css'
import { useIntl } from "gatsby-plugin-intl"

type OrderPageProps = {
    serverData: any
}

const OrderPage: React.FC<OrderPageProps> = ({ serverData }) => {
    const intl = useIntl()
    const clipboard = useClipboard();

    const order: Order = serverData.data[0]?.attributes
    const talent: Talent = serverData.data[0]?.attributes.talent.data.attributes

    const handleDownload = () => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob"; // set responseType to "blob" to get the file content
        xhr.onload = () => {
            const blob = new Blob([xhr.response], { type: "application/octet-stream" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${order.orderID}.mp4`; // set the download attribute to the fileName prop
            link.click();
            URL.revokeObjectURL(url);
        };
        xhr.open("GET", order!.videoURL);
        xhr.send();
    };

    return (
        <Layout title={`Personal video from ${talent?.name}`}>
            <Container size='sm'>
                {serverData.data.length > 0 &&
                    <Stack align="center" spacing='xl'>
                        {order.status !== "complete" && <>
                            <Title order={2}>{intl.formatMessage({ id: "order.excited" })}</Title>
                            <Stepper allowNextStepsSelect={false} active={0} breakpoint='sm' size="xl" orientation="vertical">
                                <Stepper.Step icon={<IconMailOpened size="1.1rem" />} description={`${intl.formatMessage({ id: "order.check" })} ${order.userEmail}`} />
                                <Stepper.Step icon={<IconVideo size="1.1rem" />} description={`${talent?.name} ${intl.formatMessage({ id: "order.will_complete" })}`} />
                                <Stepper.Step icon={<IconMailFast size="1.1rem" />} description={intl.formatMessage({ id: "order.when_complete" })}/>
                            </Stepper>
                            <Title mt={20} order={4}>{intl.formatMessage({ id: "order.details" })}</Title>
                            <Paper shadow="lg" radius="lg" p="lg" withBorder>
                                <Text><b>{intl.formatMessage({ id: "order.talent" })}:</b> {talent.name}</Text>
                                <Text><b>{intl.formatMessage({ id: "order.from" })}:</b> {order.from}</Text>
                                <Text><b>{intl.formatMessage({ id: "order.to" })}:</b> {order.to}</Text>
                                <Text><b>{intl.formatMessage({ id: "order.occasion" })}:</b> {order.occasion}</Text>
                                <Text mb={20}><b>{intl.formatMessage({ id: "order.request" })}:</b> {order.requestDescription}</Text>
                                <Divider />
                                <Text><b>#:</b> {order.orderID}</Text>
                                {/*<Text><b>Status:</b> {order.status ? order.status : "open"}</Text>
                                <Text><b>Payment Status:</b> {order.paymentStatus}</Text>*/}
                            </Paper>
                        </>}
                        {order.status === "complete" && <>
                            <Group spacing="xl" position="center">
                                <Box h={400} w={225} mx={5}>
                                    <Player
                                        fluid={false}
                                        width={225}
                                        height={400}
                                        preload="auto"
                                        playsInline={true}
                                        poster={order.videoURL.replace(".mp4", ".png").replace("/video/upload/", "/video/upload/so_0/c_fill/h_400/w_225/")}
                                        className="player">
                                        <source src={order.videoURL.replace("/video/upload/", "/video/upload/c_fill/h_400/w_225/")} />
                                        <BigPlayButton position="center" />
                                        <LoadingSpinner />
                                        <ControlBar autoHide={false} disableDefaultControls >
                                            <PlayToggle />
                                            <VolumeMenuButton vertical />
                                            <CurrentTimeDisplay />
                                            <ReplayControl seconds={30} />
                                            <FullscreenToggle />
                                        </ControlBar>
                                    </Player>
                                </Box>
                                <Stack spacing={0}>
                                    <Title order={5}>{intl.formatMessage({ id: "order.complete" })}</Title>
                                    <Title order={1} variant="gradient"
                                        gradient={{ from: 'pink', to: 'yellow', deg: 45 }}>
                                        {talent?.name}
                                    </Title>
                                    <Text pt={10} fw={200} size="md"><i>{intl.formatMessage({ id: "order.sent_by" })} {order.from}</i></Text>
                                    <Group mt={30}>
                                        <Tooltip
                                            label={intl.formatMessage({ id: "order.link_copied" })}
                                            offset={5}
                                            position="bottom"
                                            radius="xl"
                                            transitionProps={{ duration: 100, transition: 'slide-down' }}
                                            opened={clipboard.copied}
                                        >
                                            <Button variant="outline" radius="xl" size="sm"
                                                leftIcon={
                                                    clipboard.copied ? (
                                                        <IconCheck size="1.3rem" stroke={1.5} />
                                                    ) : (
                                                        <IconCopy size="1.3rem" stroke={1.5} />
                                                    )
                                                }
                                                styles={{
                                                    root: { paddingRight: rem(15), height: rem(40) },
                                                    rightIcon: { marginLeft: rem(10) },
                                                }}
                                                onClick={() => clipboard.copy(window.location.href)}
                                            >
                                                {intl.formatMessage({ id: "order.copy_link" })}
                                            </Button>
                                        </Tooltip>
                                        <Button radius="xl" size="sm"
                                            leftIcon={
                                                <IconFileDownload size="1.3rem" stroke={1.5} />
                                            }
                                            styles={{
                                                root: { paddingRight: rem(15), height: rem(40) },
                                                rightIcon: { marginLeft: rem(10) },
                                            }}
                                            onClick={handleDownload}
                                        >
                                            {intl.formatMessage({ id: "order.download" })}
                                        </Button>
                                    </Group>
                                </Stack>
                            </Group>
                        </>}
                    </Stack>
                }
                {!order &&
                    <Stack align="center" spacing='xs'>
                        <Title order={2} mb={50}>{intl.formatMessage({ id: "order.not_found" })}</Title>
                        <HowTo />
                    </Stack>
                }
            </Container>
        </Layout>
    )
}
export default OrderPage

export async function getServerData(props: GetServerDataProps): GetServerDataReturn {
    const orderID = props.params?.orderID
    try {
        const res = await fetch(`${process.env.STRAPI_API_URL}/api/orders?filters[orderID]=${orderID}&populate=talent`, {
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
        console.error(error)
    }
    return {
        props: props.params,
    };
}