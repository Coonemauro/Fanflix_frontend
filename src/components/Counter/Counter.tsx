import { Stack, Text, Avatar, Group } from '@mantine/core';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { CategoryNode, SubcategoryNode } from '../../interfaces';
import { useIntl, navigate } from 'gatsby-plugin-intl';


const Counter: React.FC = () => {
    const query = graphql`
    query {
      allStrapiCategory {
        edges {
          node {
            strapi_id
            name
            slug
            leadImageTalent {
                image {
                    url
                }
            }

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
                slug
            }
            leadImageTalent {
                image {
                    url
                }
            }
          }
        }
      }

    }`
    const { allStrapiCategory, allStrapiSubcategory } = useStaticQuery(query)
    const categories: CategoryNode[] = allStrapiCategory.edges.map((category: CategoryNode) => { return category })
    const subcategories: SubcategoryNode[] = allStrapiSubcategory.edges.map((subcategory: SubcategoryNode) => { return subcategory })

    const intl = useIntl();

    return (
      <>
      </>
        // <Stack spacing="md">
        //     <Group position="center">
        //         {subcategories.map((subcategory) => (
        //             <Stack align="center" w={120} spacing={5}
        //                 style={{cursor: 'pointer',}}
        //                 onClick={event => {
        //                     navigate(`/browse/${subcategory.node.category.slug}/${subcategory.node.slug}`)
        //                 }}
        //             >
        //                 <Avatar src={subcategory.node.leadImageTalent.image[0].url} radius={100} size={100} />
        //                 <Text size="sm" fw={900}>
        //                     {intl.formatMessage({ id: `subcategories.${subcategory.node.name}` })}
        //                 </Text>
        //             </Stack>
        //         ))}
        //     </Group>
        // </Stack>
    );
}

export default Counter