import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Header, HoverCard, Group, Button, Text, Divider, Center, Box, Burger, Drawer, ScrollArea, rem, Title, Autocomplete, Grid, List, Container, AutocompleteItem, SelectItemProps, Avatar, ActionIcon, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconSearch, IconArrowRight } from '@tabler/icons-react';
import { graphql, useStaticQuery } from 'gatsby';
import headerStyles from './Header.styles';
import { CategoryNode, SubcategoryNode } from '../../interfaces';
import { IntlContextConsumer, changeLocale, useIntl, Link, navigate } from "gatsby-plugin-intl";
import logo from '../../images/homepage/logo.png';

// @ts-ignore
import { useFlexSearch } from 'react-use-flexsearch';

type MenuBarProps = {
    hideMenuBar?: boolean
}

const MenuBar: React.FC<MenuBarProps> = ({ hideMenuBar = false }) => {
    const { classes, theme } = headerStyles()
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const browseURL = "/browse"

    const query = graphql`
    query {
      allStrapiCategory {
        edges {
          node {
            strapi_id
            name
            slug
          }
        }
      }
      allStrapiSubcategory {
        edges {
          node {
            strapi_id
            name
            slug
            category {
              strapi_id
              name
              slug
            }
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
      localSearchTalents {
        index
        store
      }
    }`

    const { allStrapiCategory, allStrapiSubcategory, localSearchTalents, popular } = useStaticQuery(query)
    const categories: CategoryNode[] = allStrapiCategory.edges.map((category: CategoryNode) => { return category })
    const subcategories: SubcategoryNode[] = allStrapiSubcategory.edges.map((subcategory: SubcategoryNode) => { return subcategory })
    const [selectedCategory, setSelectedCategory] = useState<CategoryNode>(categories[0]);
    const [selectedSubcategories, setSelectedSubcategories] = useState<SubcategoryNode[]>([]);

    function loadSubcategories(category: CategoryNode): SubcategoryNode[] {
        const filteredSubcategories = subcategories.filter((subcategory) => {
            return subcategory.node.category.strapi_id === category.node.strapi_id
        })
        return filteredSubcategories
    }

    useEffect(() => {
        if (selectedCategory) {
            const subcategories = loadSubcategories(selectedCategory);
            setSelectedSubcategories(subcategories);
        } else {
            setSelectedSubcategories(loadSubcategories(categories[0]));
        }
    }, [selectedCategory]);

    const [searchQuery, setSearchQuery] = useState('');

    const flexSearchResults = useFlexSearch(
        searchQuery,
        localSearchTalents.index,
        localSearchTalents.store
    )

    const searchResults = flexSearchResults.map((item: { slug: string, name: string, active: boolean }) => ({ ...item, value: item.name })).filter((item: { active: boolean; }) => item.active == true)

    const initSearchResults = popular.edges.map((item: { node: { name: any; }; }) => ({ ...item?.node, value: item.node.name })).filter((item: { active: boolean; }) => item.active == true)

    var searchSubmit = false
    const handleSearchSubmit = (item: AutocompleteItem) => {
        searchSubmit = true
        navigate(`/${item.slug}`)
    }

    const handleSearchButton = () => {
        if (!searchSubmit) {
            if (searchQuery.length > 0) {
                navigate(`/search?q=${searchQuery}`)
            } else {
                navigate(`/browse`)
            }
            searchSubmit = false
        }
    }

    const ref = useRef<HTMLInputElement>(null);
    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (searchQuery.length > 0) {
            if (event.key === 'Enter') {
                setTimeout(function () {
                    if (!searchSubmit) {
                        navigate(`/search?q=${searchQuery}`)
                        searchSubmit = false
                    }
                }, 500);
            }
        }
    }

    interface ItemProps extends SelectItemProps {
        description: string;
        image: any;
    }

    const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
        ({ description, value, image, ...others }: ItemProps, ref) => (
            <div ref={ref} {...others}>
                <Group noWrap>
                    <Avatar src={image[0].url} />
                    <div>
                        <Text>{value?.slice(0, 40) ?? "-"}</Text>
                        <Text size="xs" color="dimmed">
                            {description.slice(0, 30)}
                        </Text>
                    </div>
                </Group>
            </div>
        )
    );

    const intl = useIntl();

    return (
            <header className={classes.header}>
                <nav className={classes.navigation}>
                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <HoverCard width={365} radius="md" shadow="md" withinPortal position="top-start" >
                            <HoverCard.Target>
                                <Link to="/browse/actors" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            {intl.formatMessage({ id: "header.categories" })}
                                        </Box>
                                        <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                                    </Center>
                                </Link>
                            </HoverCard.Target>
                        </HoverCard>
                        <Link to="/about" className={classes.link}>
                            {intl.formatMessage({ id: "header.how_it_works" })}
                        </Link>
                        <Link to="/join" className={classes.link}>
                            {intl.formatMessage({ id: "header.join_as_talent" })}
                        </Link>
                    </Group>
                    <Group sx={{ height: '100%' }} spacing={10} noWrap pl={10}>
                        <Autocomplete
                            classNames={{ input: classes.input }}
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder={intl.formatMessage({ id: "header.search" })}
                            data={searchResults.length > 0 ? searchResults : initSearchResults}
                            onItemSubmit={handleSearchSubmit}
                            itemComponent={AutoCompleteItem}
                            onKeyDown={handleSearchKeyDown}
                            miw={{ base: 220, xs: 60 }}
                            maxDropdownHeight={800}
                            radius="xl"
                            size="md"
                            rightSection={
                                <IconSearch
                                size="1rem"
                                color="#0077cc"
                                style={{ fontWeight: 600 }}
                                stroke={3.5}
                                />
                            }
                            rightSectionWidth={45}
                            
                        />
                        <Link to="/login" className={classes.link}>
                            {intl.formatMessage({ id: "header.login" })}
                        </Link>
                        </Group>
                </nav>
                <div className={classes.redBanner}>
                    <div className={classes.scrollingText}>
                        <span>→ AL 10.679 WARME FANFLIXVIDEO’S</span>
                        <span>→ STUUR EEN BOODSCHAP, STEUN HET GOEDE DOEL.</span>
                        <span>→ BESTEL JE VIDEO EN VLAM MEE!</span>
                    </div>
                </div>
                <section className={classes.headerContent}>
                    <div className={classes.whitebackground}>
                        <div className={classes.headertext}>
                        <h1 className={classes.headingTitle}>
                            <span className={classes.red}>GEPERSONALISEERDE</span><br />
                            <span className={classes.pink}>VIDEO’S VAN JE</span><br />
                            <span className={classes.yellow}>FAVORIETE VLAMMERS</span>
                        </h1>

                        <a href="#" className={classes.buttonAll}>
                            ONTDEK ALLE VLAMMERS →
                        </a>
                        </div>
                        <div>
                            <img src={logo} alt="Logo-fanflix" className={classes.logo} />
                        </div>
                        <div className={classes.videoContainer}>
                            <video></video>
                            <div></div>
                        </div>
                    </div>
                </section>
            </header>
    )
}

export default MenuBar