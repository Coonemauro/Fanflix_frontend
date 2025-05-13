import React, { useRef, useState } from "react";
import { Group, Title, ScrollArea, Stack, Button, createStyles, Text, useMantineTheme } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import TalentCard from "./TalentCard";
import { useElementSize } from "@mantine/hooks";
import { useIntl, Link } from "gatsby-plugin-intl";
import { Box } from "@mantine/core";
import HowTo from "../Howto/Howto";
import WarmeFanflixers from "./WarmeFanflixers";
import { graphql, useStaticQuery, GetServerDataProps, GetServerDataReturn } from "gatsby";
import { useEffect } from "react";



type TalentCardGroupProps = {
  title: string
  link: string | undefined
  talents: Array<any>
  serverTalents: any
}

const MainContent: React.FC<TalentCardGroupProps> = ({ title, link, talents, serverTalents, serverData }) => {
  const { featured, popular } = useStaticQuery(graphql`
    query {
      featured: allStrapiTalent(
        sort: { completeOrderCount: DESC }
        filter: {tags: {elemMatch: {name: {eq: "Featured"}}}}
      ) {
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
            completeOrderCount
          }
        }
      }
    }
    `)
    const feauredTalents = featured.edges
  // SSR
  if (serverTalents !== undefined && talents !== null && talents !== undefined && talents.length > 0) {
    talents.map((talentNode, index) => {
      const serverTalent = serverTalents.data.find((talent: { id: any; }) => talent.id === talentNode.node.strapi_id)
      if (serverTalent) {
        talents[index].node.price = serverTalent.attributes.price
        talents[index].node.description = serverTalent.attributes.description
        talents[index].node.active = serverTalent.attributes.active
      }
    })
  }

  const useStyles = createStyles((theme) => ({
    hiddenMobile: {
      [theme.fn.smallerThan('321')]: {
        display: 'none',
      },
    },
  }))
  const { classes } = useStyles();

  const theme = useMantineTheme();
  const cardWidthNormal = 210
  const cardWidthMobile = 160

//   const activeTalentCount = talents.filter((talent) => talent.node.active).length
const activeTalentCount = (talents ?? []).filter((talent) => talent.node.active).length;

  const viewport = useRef<HTMLDivElement>(null);
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  function handleScrollRight() {
    let cardWidth = theme.fn.smallerThan("sm") ? cardWidthMobile : cardWidthNormal
    viewport.current?.scrollTo({ left: scrollPosition.x + cardWidth * 2, behavior: 'smooth' });
  }
  function handleScrollLeft() {
    let cardWidth = theme.fn.smallerThan("sm") ? cardWidthMobile : cardWidthNormal
    viewport.current?.scrollTo({ left: scrollPosition.x - cardWidth * 2, behavior: 'smooth' });
  }

  const { ref } = useElementSize();

  const intl = useIntl()
  
  return (
    <>
      <Box sx={{position: 'relative',width: '90vw',marginLeft: 'auto',marginRight: 'auto',}}>
        <svg style={{width:'100%'}} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1769.502" height="1212.692" viewBox="0 0 1769.502 1212.692">
            <defs>
              <linearGradient id="linear-gradient" x1="0.502" y1="0.019" x2="0.497" y2="1.02" gradientUnits="objectBoundingBox">
                <stop offset="0" stop-color="#f5c153"/>
                <stop offset="0.969" stop-color="#ee80a0"/>
                <stop offset="1" stop-color="#00b5ff" stop-opacity="0.102"/>
              </linearGradient>
            </defs>
            <path id="Path_659" data-name="Path 659" d="M7244.776,3281.356H5623.718c-40.991,0-74.217,30.843-74.217,68.881v597.531c0,19.485,8.719,37.079,22.723,49.613a77.026,77.026,0,0,0,51.494,19.286h654.7c.566-.018,64.133.027,64.737.009,20.588-.1,37.265,8.118,52.333,20.435,14.454,11.521,29.355,24.291,44.4,38.419,32.837,31.377,49.593,61.1,94.884,61.5H7248.4c38.981,0,70.607-26.825,70.607-59.93V3350.237C7319,3312.2,7285.776,3281.356,7244.776,3281.356Zm8.613,734.841v-.389c.672.036,1.355.091,2.019.145C7254.744,4016.06,7254.061,4016.133,7253.389,4016.2Z" transform="translate(-5549.5 -3281.356)" fill="#ee80a0"/>
            <path id="Path_660" data-name="Path 660" d="M7210.254,3281.356H5622.207c-40.157,0-72.706,30.843-72.706,68.881v597.531a67.035,67.035,0,0,0,22.26,49.613,74.58,74.58,0,0,0,50.446,19.286h641.371c.554-.018,62.827.027,63.419.009,20.169-.1,36.506,8.118,51.267,20.435,14.16,11.521,28.758,24.291,43.5,38.419,32.168,31.377,48.583,61.1,92.952,61.5H7213.8c38.188,0,69.169-26.825,69.169-59.93V3350.237C7282.969,3312.2,7250.42,3281.356,7210.254,3281.356Zm8.438,734.841v-.389c.658.036,1.327.091,1.977.145C7220.019,4016.06,7219.35,4016.133,7218.692,4016.2Z" transform="translate(-5531.484 -3281.356)" fill="#d33a30"/>
            <path id="Path_662" data-name="Path 662" d="M7168.876,3281.356H5620.4c-39.156,0-70.895,30.843-70.895,68.881v597.531a67.8,67.8,0,0,0,21.706,49.613,71.716,71.716,0,0,0,49.189,19.286h625.391c.541-.018,61.262.027,61.839.009,19.667-.1,35.6,8.118,49.99,20.435,13.807,11.521,28.041,24.291,42.416,38.419,31.366,31.377,47.372,61.1,90.635,61.5h681.668c37.236,0,67.446-26.825,67.446-59.93V3350.237C7239.78,3312.2,7208.042,3281.356,7168.876,3281.356ZM7177.1,4016.2v-.389c.642.036,1.294.091,1.928.145C7178.4,4016.06,7177.746,4016.133,7177.1,4016.2Z" transform="translate(-5509.889 -3281.356)" fill="#2559e2"/>
            <path id="Path_661" data-name="Path 661" d="M7123.579,3281.356H5618.412a68.9,68.9,0,0,0-68.912,68.881v597.531a68.912,68.912,0,0,0,68.912,68.9h607.9c.525-.018,59.548.027,60.109.009,19.117-.1,34.6,8.118,48.591,20.435,13.421,11.521,27.257,24.291,41.229,38.419,30.489,31.377,46.047,61.1,88.1,61.5h662.6c36.194,0,65.56-26.825,65.56-59.93V3350.237A68.9,68.9,0,0,0,7123.579,3281.356Zm8,734.841v-.389c.624.036,1.258.091,1.875.145C7132.834,4016.061,7132.2,4016.133,7131.576,4016.2Z" transform="translate(-5486.249 -3281.356)" fill="#f5c152"/>
            <path id="Path_316" data-name="Path 316" d="M7167.808,3516.462v426.851a63.222,63.222,0,0,1-63.219,63.23H6505.414c-.163.011-.338.011-.5.011H6452.56a60.566,60.566,0,0,0-36.289,12.191c-5.056,3.819-9.181,7.288-12.825,10.341-10.417,8.734-16.162,13.548-27.51,13.548s-17.083-4.814-27.513-13.548c-3.643-3.052-7.769-6.521-12.824-10.341a60.511,60.511,0,0,0-36.277-12.191h-54.64c-.164,0-.339,0-.5-.011H5641.709a63.222,63.222,0,0,1-63.219-63.23V3516.462a63.22,63.22,0,0,1,63.219-63.219H7104.588A63.22,63.22,0,0,1,7167.808,3516.462Z" transform="translate(-5488.531 -3297.682)" fill="#f5f5f5"/>
            <path id="Path_318" data-name="Path 318" d="M6936.033,4441.222c0,11.159-4.733,16.8-13.321,27.051-3.005,3.584-6.408,7.639-10.164,12.607a59.481,59.481,0,0,0-11.982,35.667v2.172c-.009,0-.009-1.621-.019-3.05a62.158,62.158,0,0,1-62.156,62.157H5611.6a62.156,62.156,0,0,1-62.147-62.157v-56.754h-.208V4217.592c.09.869.208,1.738.353,2.6a44.271,44.271,0,0,1-.353-5.62v3.023a45,45,0,0,1-.263-4.833v-4.5a44.859,44.859,0,0,1,44.835-44.835H6232.61a44.257,44.257,0,0,1,9.485,1.014c9.656.009,17.177.009,17.376,0,19.1-.1,34.581,8.118,48.563,20.436,13.413,11.521,27.241,24.291,41.206,38.418,30.472,31.377,46.02,61.1,88.049,61.5h34.173v.3h366.928a61.95,61.95,0,0,1,43.948,18.209,63.822,63.822,0,0,1,13.946,21.277,62.005,62.005,0,0,1,4.262,22.67c.01,8.77.01,9.865.019,18.644a59.526,59.526,0,0,0,11.982,35.676c3.756,4.969,7.158,9.023,10.164,12.607C6931.3,4424.417,6936.033,4430.073,6936.033,4441.222Z" transform="translate(-5485.729 -3365.134)" fill="#fcfcfc"/>
            <g id="Group_223" data-name="Group 223" transform="translate(730.509 179.105)">
              <g id="Group_222" data-name="Group 222" transform="translate(0 0)">
                <g id="Group_221" data-name="Group 221">
                  <path id="Path_357" data-name="Path 357" d="M6443.161,4009.009c-13.566,0-20.673-5.957-31.431-14.973-3.588-3.007-7.654-6.415-12.584-10.141a54.412,54.412,0,0,0-32.6-10.966H6311.9a25.844,25.844,0,0,1-25.639-25.986v-441.7a25.842,25.842,0,0,1,25.639-25.985h260.232a25.842,25.842,0,0,1,25.638,25.985v441.7a25.843,25.843,0,0,1-25.639,25.986h-52.356a54.416,54.416,0,0,0-32.6,10.966c-4.931,3.727-9,7.134-12.585,10.142C6463.834,4003.052,6456.728,4009.009,6443.161,4009.009ZM6311.9,3485.359a19.735,19.735,0,0,0-19.537,19.883v441.7a19.735,19.735,0,0,0,19.538,19.884h54.637a60.551,60.551,0,0,1,36.282,12.2c5.054,3.82,9.183,7.281,12.826,10.334,10.423,8.736,16.165,13.548,27.512,13.548s17.087-4.812,27.511-13.547c3.643-3.054,7.771-6.514,12.827-10.335a60.547,60.547,0,0,1,36.28-12.2h52.356a19.735,19.735,0,0,0,19.538-19.884v-441.7a19.734,19.734,0,0,0-19.537-19.884Z" transform="translate(-6286.265 -3479.258)" fill="url(#linear-gradient)"/>
                </g>
              </g>
            </g>
            <g id="Group_270" data-name="Group 270" transform="translate(99.982 974.966)">
              <g id="Group_269" data-name="Group 269" transform="translate(0)">
                <g id="Group_268" data-name="Group 268">
                  <path id="Path_389" data-name="Path 389" d="M5876.953,4436.288c-1.895-2.258-4.047-4.822-6.395-7.932a34.281,34.281,0,0,1-6.913-20.548v-33a16.294,16.294,0,0,0-16.382-16.166H5605.942a16.293,16.293,0,0,0-16.376,16.166v164.027a16.286,16.286,0,0,0,16.376,16.158h241.321a16.287,16.287,0,0,0,16.382-16.158v-34.442a34.266,34.266,0,0,1,6.913-20.547c2.347-3.109,4.5-5.674,6.395-7.932,5.682-6.786,9.435-11.266,9.435-19.813S5882.635,4443.066,5876.953,4436.288ZM5874,4473.44c-1.922,2.3-4.1,4.9-6.514,8.085a38.2,38.2,0,0,0-7.687,22.867v34.442a12.445,12.445,0,0,1-12.539,12.313H5605.942a12.443,12.443,0,0,1-12.532-12.313V4374.808a12.44,12.44,0,0,1,12.532-12.315h241.321a12.442,12.442,0,0,1,12.539,12.315v33a38.194,38.194,0,0,0,7.688,22.868c2.411,3.187,4.591,5.786,6.514,8.085,5.507,6.57,8.54,10.183,8.54,17.34S5879.511,4466.871,5874,4473.44Z" transform="translate(-5589.566 -4358.642)" fill="#f5c153"/>
                </g>
              </g>
            </g>
            <g id="Group_273" data-name="Group 273" transform="translate(431.921 974.966)">
              <g id="Group_272" data-name="Group 272" transform="translate(0)">
                <g id="Group_271" data-name="Group 271">
                  <path id="Path_390" data-name="Path 390" d="M6243.729,4436.288c-1.895-2.258-4.04-4.822-6.4-7.932a34.328,34.328,0,0,1-6.912-20.548v-33a16.292,16.292,0,0,0-16.375-16.166H5972.724a16.293,16.293,0,0,0-16.381,16.166v164.027a16.286,16.286,0,0,0,16.381,16.158h241.323a16.285,16.285,0,0,0,16.375-16.158v-34.442a34.314,34.314,0,0,1,6.912-20.547c2.355-3.109,4.5-5.674,6.4-7.932,5.681-6.786,9.441-11.266,9.441-19.813S6249.41,4443.066,6243.729,4436.288Zm-2.95,37.152c-1.922,2.3-4.1,4.9-6.513,8.085a38.192,38.192,0,0,0-7.687,22.867v34.442a12.439,12.439,0,0,1-12.531,12.313H5972.724a12.444,12.444,0,0,1-12.538-12.313V4374.808a12.441,12.441,0,0,1,12.538-12.315h241.323a12.435,12.435,0,0,1,12.531,12.315v33a38.191,38.191,0,0,0,7.688,22.868c2.411,3.187,4.591,5.786,6.513,8.085,5.507,6.57,8.541,10.183,8.541,17.34S6246.286,4466.871,6240.778,4473.44Z" transform="translate(-5956.342 -4358.642)" fill="#f5c153"/>
                </g>
              </g>
            </g>
            <g id="Group_277" data-name="Group 277" transform="translate(772.772 974.966)">
              <g id="Group_276" data-name="Group 276" transform="translate(0)">
                <g id="Group_275" data-name="Group 275">
                  <g id="Group_274" data-name="Group 274">
                    <path id="Path_391" data-name="Path 391" d="M6620.351,4436.288c-1.9-2.258-4.041-4.822-6.389-7.932a34.29,34.29,0,0,1-6.912-20.548v-33a16.3,16.3,0,0,0-16.381-16.166H6349.346a16.3,16.3,0,0,0-16.382,16.166v164.027a16.287,16.287,0,0,0,16.382,16.158h241.323a16.291,16.291,0,0,0,16.381-16.158v-34.442a34.275,34.275,0,0,1,6.912-20.547c2.348-3.109,4.494-5.674,6.389-7.932,5.681-6.786,9.44-11.266,9.44-19.813S6626.032,4443.066,6620.351,4436.288Zm-2.95,37.152c-1.922,2.3-4.1,4.9-6.513,8.085a38.189,38.189,0,0,0-7.688,22.867v34.442a12.439,12.439,0,0,1-12.531,12.313H6349.346a12.445,12.445,0,0,1-12.538-12.313V4374.808a12.441,12.441,0,0,1,12.538-12.315h241.323a12.435,12.435,0,0,1,12.531,12.315v33a38.188,38.188,0,0,0,7.688,22.868c2.411,3.187,4.591,5.786,6.513,8.085,5.507,6.57,8.54,10.183,8.54,17.34S6622.908,4466.871,6617.4,4473.44Z" transform="translate(-6332.963 -4358.642)" fill="#f5c153"/>
                  </g>
                </g>
              </g>
            </g>
            <g id="Group_281" data-name="Group 281" transform="translate(1110.554 974.966)">
              <g id="Group_280" data-name="Group 280" transform="translate(0)">
                <g id="Group_279" data-name="Group 279">
                  <g id="Group_278" data-name="Group 278">
                    <path id="Path_392" data-name="Path 392" d="M6993.582,4436.288c-1.895-2.258-4.047-4.822-6.4-7.932a34.283,34.283,0,0,1-6.912-20.548v-33a16.292,16.292,0,0,0-16.375-16.166H6722.57a16.291,16.291,0,0,0-16.375,16.166v164.027a16.285,16.285,0,0,0,16.375,16.158H6963.9a16.285,16.285,0,0,0,16.375-16.158v-34.442a34.269,34.269,0,0,1,6.912-20.547c2.348-3.109,4.5-5.674,6.4-7.932,5.681-6.786,9.434-11.266,9.434-19.813S6999.263,4443.066,6993.582,4436.288Zm-2.95,37.152c-1.921,2.3-4.1,4.9-6.513,8.085a38.192,38.192,0,0,0-7.687,22.867v34.442a12.444,12.444,0,0,1-12.531,12.313H6722.57a12.443,12.443,0,0,1-12.531-12.313V4374.808a12.44,12.44,0,0,1,12.531-12.315H6963.9a12.44,12.44,0,0,1,12.531,12.315v33a38.19,38.19,0,0,0,7.687,22.868c2.411,3.187,4.592,5.786,6.513,8.085,5.507,6.57,8.541,10.183,8.541,17.34S6996.139,4466.871,6990.631,4473.44Z" transform="translate(-6706.195 -4358.642)" fill="#f5c153"/>
                  </g>
                </g>
              </g>
            </g>
          </svg>

          <Stack justify="flex-start" spacing="md" ref={ref}>

          {/* Titel + stem-link */}
          <Group
            position="center"
            sx={{
              position: 'absolute',
              top: '14.5%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3rem', // equivalent aan gap-12
              width: '100%',
              textTransform: 'uppercase',
            }}
          >
            <Title
              order={2}
              sx={{
                fontSize: '1.5rem',
                '@media (min-width: 640px)': {
                  fontSize: '2.25rem', // sm:text-4xl
                },
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {title}
            </Title>

            {link && (
              <Link to={`${link}`} style={{ textDecoration: 'none' }}>
                <Text
                  size="sm"
                  sx={{ color: 'black', fontWeight: 500 }}
                >
                  {intl.formatMessage({ id: "main.vote" })}
                </Text>
              </Link>
            )}
          </Group>

  {/* Grid met talentcards */}
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '1rem',
      width: '77vw',
      position: 'absolute',
      top: '24%',
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  >
    {talents && talents.length > 0 && talents.map((talentNode) => {
      const talent = talentNode.node;
      if (talent.active && talent.image && talent.image.length > 0) {
        return (
          <Link 
            to={`${talent.slug}`} 
            key={talent.slug} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ color: 'black', cursor: 'pointer' }}>
              <div style={{ width: '100%', height: '250px', overflow: 'hidden' }}>
                <img
                  src={talent.image[0].url}
                  alt={talent.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
                />
              </div>

              <Box sx={{ paddingTop: "1rem" }}>
                <Title order={4} sx={{ padding: 0 }}>{talent.name}</Title>
                <Text sx={{ padding: 0 }}>{talent.description}</Text>
                <Text sx={{ padding: 0 }}>€ {talent.price}</Text>
              </Box>
            </div>
          </Link>
        );
      }
    })}
  </div>

      {/* Knop van ontdek ze allemaal + de styling ervan*/}
        <Link to="/browse/actors" style={{textDecoration: 'none',color: 'inherit',width: '100%',}}>
          <Box style={{position: 'absolute',display: 'flex',justifyContent: 'space-between',alignItems: 'center',backgroundColor: '#275DF5',bottom: '36.7%',right: '4.8vw',width: '38vw',borderRadius: '30px',padding: '1rem 2rem',fontSize: '1.875rem',color: 'white',}}>
              <span style={{textTransform:'uppercase'}}>ontdek ze allemaal!</span>
              <span>→</span>
          </Box>
        </Link>

      
      {/* Knop van probeer het zelf + de styling ervan*/}
      <Link to="/jouw-pad-hier" style={{display: 'flex',justifyContent: 'space-between',textDecoration: 'none',color: 'inherit',}}>
        <Box style={{position: 'absolute',backgroundColor: '#F5C153',color: 'black',bottom: '19%',right: 0,borderRadius: '40px',fontWeight: 'bold',padding: '0.75rem 1.25rem', fontSize: '1.15rem',textTransform: 'uppercase',}}>
            probeer het zelf!
        </Box>
      </Link>
  </Stack>
  <HowTo/>
  </Box>
  <WarmeFanflixers title={intl.formatMessage({ id: "tags.Featured" })} link={"/browse/featured"} talents={feauredTalents} serverTalents={serverData}/>
    </>
  )
}

export default MainContent