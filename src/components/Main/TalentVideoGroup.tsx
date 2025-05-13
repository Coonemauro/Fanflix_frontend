import React, { useEffect, useRef, useState } from "react";
import { Group, Title, ScrollArea, Stack, Button, createStyles, Box } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Talent } from "../../interfaces";
import { Player, BigPlayButton, LoadingSpinner, ControlBar, VolumeMenuButton, PlayToggle, CurrentTimeDisplay, TimeDivider, DurationDisplay } from "video-react";
import { useElementSize } from "@mantine/hooks";

import '../../../node_modules/video-react/dist/video-react.css'
import '../../styles/video-react-custom.css'
import { useIntl } from "gatsby-plugin-intl";

type TalentVideoGroupProps = {
    talent: Talent
}

const TalentVideoGroup: React.FC<TalentVideoGroupProps> = ({ talent }) => {
    const useStyles = createStyles((theme) => ({
        hiddenMobile: {
            [theme.fn.smallerThan('321')]: {
                display: 'none',
            },
        },
    }))

    const { classes } = useStyles();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

    const cardWidth = 235

    function handleScrollRight() {
        scrollRef.current?.scrollTo({ left: scrollPosition.x + cardWidth * 2, behavior: 'smooth' });
    }
    function handleScrollLeft() {
        scrollRef.current?.scrollTo({ left: scrollPosition.x - cardWidth * 2, behavior: 'smooth' });
    }

    const [videoCount, setVideoCount] = useState(1);

    useEffect(() => {
        let count = 1;
        if (talent.profileOrders?.data) {
            count = 1 + talent.profileOrders.data.length;
        }
        setVideoCount(count);
    }, [talent]);

    const { ref } = useElementSize();

    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const handlePlay = (index: number) => {
        players.current.forEach((player, i) => {
            if (i !== index) {
              player.pause();
            }
          });        
          setPlayingIndex(index);
    };
    const players = useRef<typeof Player[]>([]);
    
    const intl = useIntl()

    return (
        <Stack justify="flex-start" spacing="md" ref={ref}>
            <Group position="apart" maw={(cardWidth * videoCount)}>
                <Group>
                    <Title order={3} >
                    {intl.formatMessage({ id: "common.videos" })}
                    </Title>
                </Group>
                <Group spacing="0.3rem" className={classes.hiddenMobile}>
                    <Button
                        onClick={handleScrollLeft}
                        variant="default"
                        color="gray"
                        size="xs"
                        disabled={scrollPosition.x <= 0}
                        sx={{
                            '&[data-disabled]': { opacity: 0.3 },
                            width: '115px'
                        }}
                        w={32}
                        p={0}
                    ><IconChevronLeft size={15} color='white' /></Button>
                    <Button
                        onClick={handleScrollRight}
                        variant="default"
                        color="gray"
                        size="xs"
                        disabled={
                            scrollPosition.x >= (scrollRef.current?.scrollWidth ?? 1) - (scrollRef.current?.clientWidth ?? 0)
                        }
                        sx={{
                            '&[data-disabled]': { opacity: 0.3 },
                        }}
                        w={32}
                        p={0}
                    ><IconChevronRight size={15} color='white' /></Button>
                </Group>
            </Group>
            <ScrollArea type="never" viewportRef={scrollRef} onScrollPositionChange={onScrollPositionChange}>
                <Group noWrap w={cardWidth * videoCount} spacing={0}>
                    {talent.videoURL &&
                        <Box h={400} w={225} mx={5} key={talent.strapi_id}>
                            <Player
                                muted={playingIndex !== talent.strapi_id}
                                onPlay={() => handlePlay(talent.strapi_id)}
                                ref={(player) => {
                                    players.current[talent.strapi_id] = player;
                                }}
                                fluid={false}
                                width={225}
                                height={400}
                                preload="auto"
                                playsInline={true}
                                poster={talent.videoURL.replace(".mp4", ".png").replace("/video/upload/", "/video/upload/so_0/c_fill/h_400/w_225/")}
                                className="player">
                                <source src={talent.videoURL.replace("/video/upload/", "/video/upload/c_fill/h_400/w_225/")} />
                                <BigPlayButton position="center" />
                                <LoadingSpinner />
                                <ControlBar autoHide={false} disableDefaultControls >
                                    <PlayToggle />
                                    <VolumeMenuButton vertical />
                                    <CurrentTimeDisplay />
                                    <TimeDivider />
                                    <DurationDisplay />
                                </ControlBar>
                            </Player>
                        </Box>
                    }
                    {!talent.videoURL &&
                        <Box h={400} w={225} mx={5} key={talent.strapi_id}>
                        <Player
                            muted={playingIndex !== talent.strapi_id}
                            onPlay={() => handlePlay(talent.strapi_id)}
                            ref={(player) => {
                                players.current[talent.strapi_id] = player;
                            }}
                            fluid={false}
                            width={225}
                            height={400}
                            preload="auto"
                            playsInline={true}
                            poster="https://res.cloudinary.com/kavics/video/upload/so_0/c_fill/h_400/w_225/v1682326725/1682326570977.png"
                            className="player">
                            <source src="https://res.cloudinary.com/kavics/video/upload/c_fill/h_400/w_225/v1682326725/1682326570977.mp4"/>
                            <BigPlayButton position="center" />
                            <LoadingSpinner />
                            <ControlBar autoHide={false} disableDefaultControls >
                                <PlayToggle />
                                <VolumeMenuButton vertical />
                                <CurrentTimeDisplay />
                                <TimeDivider />
                                <DurationDisplay />
                            </ControlBar>
                        </Player>
                    </Box>
                    }
                    {talent.profileOrders.data && talent.profileOrders.data.map((order: { attributes: { videoURL: string; }; id: number; }) => {
                        if (order.attributes.videoURL) {
                            return (
                                <Box h={400} w={225} mx={5} key={order.id}>
                                    <Player
                                        muted={playingIndex !== order.id}
                                        onPlay={() => handlePlay(order.id)}
                                        ref={(player) => {
                                            players.current[order.id] = player;
                                        }}
                                        fluid={false}
                                        width={225}
                                        height={400}
                                        preload="auto"
                                        playsInline={true}
                                        poster={order.attributes.videoURL.replace(".mp4", ".png").replace("/video/upload/", "/video/upload/so_0/c_fill/h_400/w_225/")}
                                        className="player">
                                        <source src={order.attributes.videoURL.replace("/video/upload/", "/video/upload/c_fill/h_400/w_225/")} />
                                        <BigPlayButton position="center" />
                                        <LoadingSpinner />
                                        <ControlBar autoHide={false} disableDefaultControls >
                                            <PlayToggle />
                                            <VolumeMenuButton vertical />
                                            <CurrentTimeDisplay />
                                            <TimeDivider />
                                            <DurationDisplay />
                                        </ControlBar>
                                    </Player>
                                </Box>
                            )
                        }
                    })}
                </Group>
            </ScrollArea>
        </Stack>
    )
}

export default TalentVideoGroup