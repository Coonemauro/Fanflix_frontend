import React, { useEffect, useRef, useState } from "react";
import { GetServerDataProps, GetServerDataReturn, graphql } from "gatsby";
import { Group, Stack, Title, Text, Pagination, SimpleGrid, Space, LoadingOverlay, Button, Flex, ScrollArea, Box } from "@mantine/core";
import TalentCard from "../components/Main/TalentCard";
import { Layout } from "../components/Layout";
import { useLocation } from '@reach/router';
import { Talent } from "../interfaces";
import { IconChevronDown, IconChevronUp, IconSelector } from "@tabler/icons-react";
// @ts-ignore
import { useFlexSearch } from 'react-use-flexsearch';
import { useIntl } from "gatsby-plugin-intl";

type BrowseTalentsProps = {
  data: {
    strapiCategory: {
      name: string
    },
    strapiSubcategory: {
      name: string
    }
    strapiTag: {
      name: string
    }
    allStrapiTalent: {
      edges: any
    }
    localSearchTalents: any
  },
  pageContext: {
    catID: number,
    subID: number,
    tagID: number
  },
  serverData: any
}

const BrowseTalents: React.FC<BrowseTalentsProps> = ({ data, pageContext, serverData }) => {
  const itemsPerPage = 40

  const { catID, subID, tagID } = pageContext

  const [title, setTitle] = useState("No talents")

  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);
  const [sortAscending, setSortAscending] = useState(false)

  const [allTalents, setAllTalents] = useState<{ node: Talent }[]>()
  const [talents, setTalents] = useState<{ node: Talent }[]>()
  const paginatedData = talents?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const location = useLocation();
  const params = new URLSearchParams(location.search)
  const searchParam = params.get("q")
  const intl = useIntl()
  useEffect(() => {
    if (location.pathname.includes("browse")) {
      var browseTitle = intl.formatMessage({ id: "categories.all" })
      if (catID) {
        browseTitle = intl.formatMessage({ id: `categories.${data.strapiCategory.name}` })
      } else if (subID) {
        browseTitle = intl.formatMessage({ id: `subcategories.${data.strapiSubcategory.name}` })
      } else if (tagID) {
        browseTitle = intl.formatMessage({ id: `tags.${data.strapiTag.name}` })
      }
      setTitle(browseTitle)
      initTalents(data.allStrapiTalent.edges)
    } else if (location.pathname.includes("search")) {
      setTitle(`${intl.formatMessage({ id: "common.results_for" })} "${searchParam}"`)
    }
  }, [location])

  const flexSearchResults = useFlexSearch(
    searchParam,
    data.localSearchTalents.index,
    data.localSearchTalents.store
  )
  const [searching, setSearching] = useState(false)
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  useEffect(() => {
    if (location.pathname.includes("search") && flexSearchResults) {
      if (flexSearchResults.length == 0) {
        if (!searching) {
          setSearching(true)
          timerRef.current = setTimeout(() => {
            console.log("searchtimeout")
              setSearching(false);
              initTalents([])
          }, 1000);
        } else {
          clearTimeout(timerRef.current!);
          setSearching(false)
          initTalents([])
        }
      } else {
        clearTimeout(timerRef.current!);
        setSearching(false)
        let searchTalents = flexSearchResults.map((itemNode: any) => {
          return { node: itemNode };
        })
        initTalents(searchTalents)
      }
    }
  }, [flexSearchResults])

  const initTalents = (talents: { node: Talent }[]) => {
    let activeTalents = talents.filter((item) => item.node.active == true)
    if (serverData && activeTalents.length > 0) {
      activeTalents?.map((talentNode: { node: Talent | null }, index: number) => {
        if (talentNode.node !== null) {
          const serverTalent = serverData.data.find((talent: { id: any; }) => talent.id === talentNode.node!.strapi_id)
          if (serverTalent && activeTalents) {
            activeTalents[index].node.price = serverTalent.attributes.price
            activeTalents[index].node.description = serverTalent.attributes.description
            activeTalents[index].node.active = serverTalent.attributes.active
            activeTalents[index].node.fastDelivery = serverTalent.attributes.fastDelivery
          }
        }
      })
    }
    setAllTalents(activeTalents)
    setTalents(activeTalents)
  }

  const handleSort = () => {
    setSorted(true)
    let s = !sortAscending
    setSortAscending(s)
    if (talents) {
      const sortedTalents = [...talents].sort((a, b) => {
        if (s) {
          return a.node.price - b.node.price;
        } else {
          return b.node.price - a.node.price;
        }
      });
      setTalents(sortedTalents)
    }
  };

  const handleFilter = () => {
    const filteredTalents = talents?.filter((item) => item.node.price >= 20 && item.node.price <= 60)
    setTalents(filteredTalents)
  };

  const [fastDelivery, setFastDelivery] = useState(false);
  const handleFastDelivery = () => {
    let fd = !fastDelivery
    setFastDelivery(fd)
    if (fd) {
      setTalents(talents?.filter((item) => item.node.fastDelivery == true))
    } else {
      if (sorted && allTalents) {
        const sortedTalents = [...allTalents].sort((a, b) => {
          if (sortAscending) {
            return a.node.price - b.node.price;
          } else {
            return b.node.price - a.node.price;
          }
        });
        setTalents(sortedTalents);
      } else {
        setTalents(allTalents)
      }
    }
  }

  const clearFilter = () => {
    setSorted(false)
    setFastDelivery(false)
    setTalents(allTalents);
  };

  return (
    <Layout title={title} width={1640}>
      <Stack spacing="xl" mih={200}>
        {(!talents || searching) &&
          <Box mx="auto" my="auto" w={40} h={40} pos="relative" >
            <LoadingOverlay visible={true} overlayOpacity={0} />
          </Box>}
        {!searching && talents && paginatedData && allTalents && <>
          <Group position="apart">
            <Group align="baseline">
              <Title>
                {title}
              </Title>
              <Text size="md" color="dimmed">
                {talents.length} {intl.formatMessage({ id: "common.results" })}
              </Text>
            </Group>
            <ScrollArea type="never">
              <Flex gap="xs" wrap="nowrap" align="flex-end">
                <Button compact variant="default" radius="xl" onClick={handleSort} rightIcon={sorted ? (sortAscending ? <IconChevronUp size="0.9rem" stroke={1.5} /> : <IconChevronDown size="0.9rem" stroke={1.5} />) : <IconSelector size="0.9rem" stroke={1.5} />}>
                  {intl.formatMessage({ id: "common.sort_by_price" })}
                </Button>
                <Button compact variant={fastDelivery ? "light" : "default"} radius="xl" onClick={handleFastDelivery}>
                  {intl.formatMessage({ id: "common.fast_delivery" })}
                </Button>
                {/*<Button variant="outline" radius="xl" size="xs" onClick={handleFilter}>Filter by price: 20-60</Button>*/}
                <Button compact variant="subtle" radius="xl" onClick={clearFilter}>
                  {intl.formatMessage({ id: "common.clear_filters" })}
                </Button>
              </Flex>
            </ScrollArea>
          </Group>
          {talents.length == 0 &&
            <Title order={2} mx="auto" my="auto" >No Talents Found</Title>
          }
          <SimpleGrid
            cols={6}
            spacing="md"
            breakpoints={[
              //{ maxWidth: 1350, cols: 5, spacing: 'md' },
              //{ maxWidth: 1150, cols: 4, spacing: 'md' },
              //{ maxWidth: 950, cols: 3, spacing: 'sm' },
              //{ maxWidth: 1350, cols: 5 },
              //{ maxWidth: 1150, cols: 4 },
              //{ maxWidth: 950, cols: 3},
              /*{ maxWidth: 'xs', cols: 1},
              { maxWidth: 'sm', cols: 2},
              { maxWidth: 'md', cols: 3},
              { maxWidth: 'lg', cols: 4},
              { maxWidth: 'xl', cols: 5},*/
              //{ minWidth: 'xs', cols: 1 },
              /*
                { minWidth: 0, maxWidth: 320, cols: 1 }, // xs
                { minWidth: 321, maxWidth: 599, cols: 2 }, // sm
                { minWidth: 600, maxWidth: 1023, cols: 3 }, // md
                { minWidth: 1024, maxWidth: 1335, cols: 4 }, // lg
                { minWidth: 1336, maxWidth: 1443, cols: 5 }, // xl
                */
              { minWidth: 0, maxWidth: 360, cols: 1 }, // xs
              { minWidth: 361, maxWidth: 499, cols: 2 }, // sm
              { minWidth: 500, maxWidth: 799, cols: 3 }, // md
              { minWidth: 800, maxWidth: 1335, cols: 4 }, // lg
              { minWidth: 1336, maxWidth: 1443, cols: 5 }, // xl

            ]}
          >
            {paginatedData.map((talentNode: { node: any; }) => {
              var talent = talentNode.node
              if (talent.image && talent.image.length > 0) {
                return (
                  <TalentCard
                    key={talent.slug}
                    slug={talent.slug}
                    name={talent.name}
                    imageURL={talent.image[0].url}
                    description={talent.description}
                    price={talent.price}
                    group={false} cardWidthNormal={160} cardWidthMobile={210} />
                )
              }
            })}
          </SimpleGrid>
          {allTalents.length > itemsPerPage &&
            <>
              <Space h="md" />
              <Group position="center">
                <Pagination
                  total={Math.ceil(allTalents.length / itemsPerPage)}
                  onChange={(newPage) => setCurrentPage(newPage)}
                />
              </Group>
            </>
          }
        </>}
      </Stack>
    </Layout>
  )
}

export default BrowseTalents

export const query = graphql`
  query($catID: Int, $subID: Int, $tagID: Int) {
    strapiCategory(strapi_id: {eq: $catID}) {
      name
    }
    strapiSubcategory(strapi_id: {eq: $subID}) {
      name
    }
    strapiTag(strapi_id: {eq: $tagID}) {
      name
    }
    allStrapiTalent(
      sort: { completeOrderCount: DESC }
      filter: {
        subcategory: {strapi_id: {eq: $subID}, category: {strapi_id: {eq: $catID}}}
        tags: {elemMatch: {strapi_id: {eq: $tagID}}}
      }) {
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
          fastDelivery
          completeOrderCount
        }
      }
    }
    localSearchTalents {
      index
      store
    }    
  }
`

export async function getServerData(props: GetServerDataProps): GetServerDataReturn {
  const catID = props.pageContext.catID
  const subID = props.pageContext.subID
  try {
    var filter = ""
    if (subID) {
      filter = `&filters[subcategory][id]=${subID}`
    } else if (catID) {
      filter = `&filters[subcategory][category][id]=${catID}`
    }
    const res = await fetch(`${process.env.STRAPI_API_URL}/api/talents?fields[0]=price&fields[1]=description&fields[2]=active&fields[3]=fastDelivery&${filter}`, {
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

