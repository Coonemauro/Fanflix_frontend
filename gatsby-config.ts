import type { GatsbyConfig } from "gatsby";
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `bvtv`,
    siteUrl: `https://www.bvtv.be`,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: ['nl', 'fr', 'en'],
        defaultLanguage: 'nl',
        redirect: false,
        svgo: true,
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-fastify`,
      options: {
        features: {},
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL,
        accessToken: process.env.STRAPI_TOKEN,
        skipFileDownloads: true,
        collectionTypes: ["talent", "category", "subcategory", "order"],
        // Verwijder de 'optionalFields' als deze niet strikt noodzakelijk zijn
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "talents",
        engine: "flexsearch",
        query: `
        {
          allStrapiTalent{
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
        }`,
        ref: "slug",
        index: ["name", "description"],
        store: ["slug", "name", "price", "description", "strapi_id", "active", "image"],
        normalizer: ({ data }) =>
          data.allStrapiTalent.edges.map(({ node }) => ({
            slug: node.slug,
            name: node.name,
            price: node.price,
            description: node.description,
            strapi_id: node.strapi_id,
            active: node.active,
            image: node.image,
          })),
      },
    },
  ],
};

export default config;
