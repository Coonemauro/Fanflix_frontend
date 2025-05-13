import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { Header, HoverCard, Group, Button, Text, Divider, Center, Box, Burger, Drawer, ScrollArea, rem, Title, Autocomplete, Grid, List, Container, AutocompleteItem, SelectItemProps, Avatar, ActionIcon, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconSearch, IconArrowRight } from '@tabler/icons-react';
import { graphql, useStaticQuery } from 'gatsby';
import headerStyles from './Header.styles';
import { CategoryNode, SubcategoryNode } from '../../interfaces';
import { IntlContextConsumer, changeLocale, useIntl, Link, navigate } from "gatsby-plugin-intl";
import en_flag from '../../images/flags/en.svg';
import nl_flag from '../../images/flags/be.svg';
import fr_flag from '../../images/flags/fr.svg';

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

    const flagImages: Record<any, any> = {
        en: en_flag,
        nl: nl_flag,
        fr: fr_flag,
    };

    return (
        <Container pb={hideMenuBar ? 0 : 90} size="100rem" m={0} p={0}>
            <Header height={60} px={hideMenuBar ? 0 : "sm"} className={hideMenuBar ? '' : classes.header} maw="100rem" >
                <Group position="apart" sx={{ height: '100%' }} spacing={0} noWrap>
                    <Group sx={{ height: '100%' }} spacing={0} >
                        <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                        <Link to="/" className={`${classes.logo} ${classes.hiddenVerySmall}`}>
                            <Text variant="gradient"
                                gradient={{ from: 'pink', to: 'yellow', deg: 45 }}
                                ta="center"
                            >
                                BV&nbsp;TV
                            </Text>
                        </Link>
                    </Group>
                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <HoverCard width={365} radius="md" shadow="md" withinPortal position="top-start" >
                            <HoverCard.Target>
                                <Link to="/browse" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            {intl.formatMessage({ id: "header.categories" })}
                                        </Box>
                                        <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                                    </Center>
                                </Link>
                            </HoverCard.Target>
                            <HoverCard.Dropdown sx={{ overflow: 'hidden' }} py={20} px={5} className={classes.zTop}>
                                <Grid columns={3}>
                                    <List icon={[]} spacing="0">
                                        {categories.map((category) => (
                                            <List.Item
                                                key={category.node.strapi_id}
                                                onMouseEnter={() => setSelectedCategory(category)}
                                            >
                                                <Button
                                                    onClick={event => {
                                                        event.preventDefault()
                                                        navigate(`${browseURL}/${category.node.slug}`)
                                                    }}
                                                    w={120}
                                                    style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                                                    color="dark"
                                                    key={category.node.strapi_id}
                                                    m={0}
                                                    variant={selectedCategory === category ? "default" : "subtle"}>
                                                    <Text size="md" fw={500}>
                                                        {intl.formatMessage({ id: `categories.${category.node.name}` })}
                                                    </Text>
                                                </Button>
                                            </List.Item>
                                        ))}
                                    </List>
                                    <Divider
                                        color="dark.3"
                                        orientation="vertical"
                                        ml={10}
                                    />
                                    <List icon={[]} spacing="0">
                                        {selectedSubcategories.map((subcategory) => (
                                            <List.Item key={subcategory.node.strapi_id}>
                                                <Button
                                                    onClick={event => {
                                                        event.preventDefault()
                                                        navigate(`${browseURL}/${subcategory.node.category.slug}/${subcategory.node.slug}`)
                                                    }}
                                                    w={200}
                                                    style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                                                    variant="subtle"
                                                    color="dark"
                                                    key={subcategory.node.strapi_id}
                                                >
                                                    <Text size="sm" fw={500}>
                                                        {intl.formatMessage({ id: `subcategories.${subcategory.node.name}` })}
                                                    </Text>
                                                </Button>
                                            </List.Item>
                                        ))}
                                        <List.Item>
                                            <Button
                                                onClick={event => {
                                                    event.preventDefault()
                                                    navigate(`${browseURL}/${selectedCategory?.node.slug}`)
                                                }}
                                                w={200}
                                                style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
                                                variant="subtle"
                                                color="dark"
                                                rightIcon={<IconArrowRight size={15} />}
                                                key={`${selectedCategory?.node.strapi_id}_all`}
                                            >
                                                <Text size="sm" fw={600}>
                                                    {intl.formatMessage({ id: "header.view_all" })}
                                                </Text>
                                            </Button>
                                        </List.Item>
                                    </List>
                                </Grid>
                            </HoverCard.Dropdown>
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
                            ref={ref}
                            //className={classes.search}
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder={intl.formatMessage({ id: "header.search" })}
                            icon={<IconSearch size="1rem" stroke={1.8} />}
                            data={searchResults.length > 0 ? searchResults : initSearchResults}
                            onItemSubmit={handleSearchSubmit}
                            onKeyDown={(event) => {
                                handleSearchKeyDown(event)
                            }}
                            itemComponent={AutoCompleteItem}
                            //limit={15}
                            //miw={120}
                            miw={{ base: 220, xs: 60 }}
                            //maw={380}
                            maxDropdownHeight={800}
                            //nothingFound={<Box onClick={handleSearchButton}><Text size="lg">"{searchQuery}"</Text></Box>}
                            radius="xl"
                            size="md"
                            rightSection={
                                <ActionIcon size={30} radius="xl" color={theme.primaryColor} variant="filled" onClick={handleSearchButton}>
                                    <IconArrowRight size={20} stroke={1.5} />
                                </ActionIcon>
                            }
                            rightSectionWidth={42}
                        />
                        <IntlContextConsumer>
                            {({ languages, language: currentLocale }) => (
                                <Menu shadow="md">
                                    <Menu.Target>
                                        <Avatar src={flagImages[currentLocale]} size={26} radius="lg" />
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        {languages.map(language => (
                                            <Menu.Item
                                                key={language}
                                                onClick={() => changeLocale(language)}
                                                icon={
                                                    <Avatar
                                                        src={flagImages[language]}
                                                        size={18}
                                                        radius="lg"
                                                    />
                                                }
                                            >
                                                {intl.formatMessage({ id: `header.${language}` })}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Dropdown>
                                </Menu>
                            )}
                        </IntlContextConsumer>
                        </Group>
                </Group>
            </Header>
            <Drawer
                transitionProps={{ duration: 450 }}
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title=<Link to="/" className={classes.logo} onClick={closeDrawer}>
                    <Title order={2} variant="gradient"
                        gradient={{ from: 'pink', to: 'yellow', deg: 45 }}
                        ta="center"
                        fz="xxl"
                        fw={1000}>
                        BV TV
                    </Title>
                </Link>
                className={classes.hiddenDesktop}
                zIndex={1000000}

            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-lg" px="lg">
                    <Link to="/browse" className={classes.link} onClick={closeDrawer}>
                        <Center inline>
                            <Box component="span" mr={20} fz="xl">
                                {intl.formatMessage({ id: "header.categories" })}
                            </Box>
                            <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                        </Center>
                    </Link>
                    {categories.map((category) => (
                        <>
                            <Link to={`${browseURL}/${category.node.slug}`} className={classes.link} onClick={closeDrawer} key={category.node.slug}>
                                <Center inline>
                                    <Box component="span" mr={5} ml={20} fz="lg" key={category.node.slug}>
                                        {intl.formatMessage({ id: `categories.${category.node.name}` })}
                                    </Box>
                                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                                </Center>
                            </Link>
                            {loadSubcategories(category).map((subcategory) => (
                                <Link to={`${browseURL}/${category.node.slug}/${subcategory.node.slug}`} className={classes.link} onClick={closeDrawer} key={subcategory.node.slug}>
                                    <Center inline>
                                        <Box component="span" mr={5} ml={40} key={subcategory.node.slug}>
                                            {intl.formatMessage({ id: `subcategories.${subcategory.node.name}` })}
                                        </Box>
                                    </Center>
                                </Link>
                            ))}
                        </>
                    ))}
                    <Link to="/about" className={classes.link} onClick={closeDrawer}>
                        <Center inline>
                            <Box component="span" mr={20} fz="xl">
                                {intl.formatMessage({ id: "header.how_it_works" })}
                            </Box>
                        </Center>
                    </Link>
                    <Link to="/join" className={classes.link} onClick={closeDrawer}>
                        <Center inline>
                            <Box component="span" mr={20} fz="xl">
                                {intl.formatMessage({ id: "header.join_as_talent" })}
                            </Box>
                        </Center>
                    </Link>

                </ScrollArea>
            </Drawer>
        </Container>
    )
}

export default MenuBar