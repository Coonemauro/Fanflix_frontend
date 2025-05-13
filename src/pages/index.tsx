import React, { useEffect, useState } from "react"
import { GetServerDataProps, GetServerDataReturn, PageProps, graphql, useStaticQuery } from "gatsby"
import { Title, Stack, Box } from "@mantine/core"
import TalentCardGroup from "../components/Main/TalentCardGroup"
import MainContent from "../components/Main/MainContent"
import { Layout } from "../components/Layout"
import CookieConsent from "react-cookie-consent";
import { Talent } from "../interfaces"
import Counter from "../components/Counter/Counter"
import { useIntl } from "gatsby-plugin-intl"


const IndexPage: React.FC<PageProps> = ({ serverData }) => {
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

    popular: allStrapiTalent(
      sort: { completeOrderCount: DESC }
      filter: {tags: {elemMatch: {name: {eq: "Popular"}}}}
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
  const popularTalents = popular.edges
  
  const [recentlyTalents, setRecentlyTalents] = useState<{ node: Talent }[]>()

  useEffect(() => {
    let recenty = localStorage.getItem('recently')
    if (recenty) {
      setRecentlyTalents(JSON.parse(recenty))
    }
  },[])

  const intl = useIntl()

  return (
    <Layout title={intl.formatMessage({ id: "common.home" })}>
      <Stack justify="flex-start" spacing="2.1rem" sx={{ width: '90vw', margin: '0 auto', paddingTop: '2rem', paddingBottom: '2rem' }}>        
        <Title order={2} sx={(theme) => ({
          color: theme.white,
          fontSize: '2.25rem', 
          fontWeight: 700,     
          textTransform: 'uppercase',
          textAlign: 'center',
        })}
        >
          <Box component="span" sx={(theme) => ({
            backgroundColor: '#275DF5',
            paddingLeft: `calc(${theme.spacing.xl} * 2)`,
            paddingRight: `calc(${theme.spacing.xl} * 2)`,
            paddingBottom: theme.spacing.xs,
            paddingTop: theme.spacing.xs,
            borderRadius:'20px',
            display: 'inline-block', // belangrijk voor padding & border-radius
          })}>{intl.formatMessage({ id: "common.company_slogan" })}</Box><br/>

          <Box component="span" sx={(theme) => ({
            backgroundColor: '#275DF5',
            paddingLeft: `calc(${theme.spacing.xl} * 2)`,
            paddingRight: `calc(${theme.spacing.xl} * 2)`,
            paddingBottom: theme.spacing.xs,
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            display: 'inline-block', // belangrijk voor padding & border-radius
          })}>{intl.formatMessage({ id: "common.company_slogan2" })}</Box>
          </Title>
        <Counter/>
        <MainContent title={intl.formatMessage({ id: "main.title" })} link={"/browse/popular"} talents={popularTalents} serverTalents={serverData}/>
        {/* <TalentCardGroup title={intl.formatMessage({ id: "tags.Featured" })} link={"/browse/featured"} talents={feauredTalents} serverTalents={serverData} />
        <TalentCardGroup title={intl.formatMessage({ id: "tags.Popular" })} link={"/browse/popular"} talents={popularTalents} serverTalents={serverData}/>         
        { recentlyTalents && recentlyTalents.length > 0 &&
        <TalentCardGroup title={intl.formatMessage({ id: "common.recently_viewed" })} link={undefined} talents={recentlyTalents} serverTalents={undefined} />
        }  */}
      </Stack>
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </Layout>
  )
}

export default IndexPage

export async function getServerData(props: GetServerDataProps): GetServerDataReturn {
  try {
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/talents?fields[0]=price&fields[1]=description&fields[2]=active&filters[tags][name]=Popular&filters[tags][name]=Featured`, {
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