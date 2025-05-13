import type { GatsbyConfig } from "gatsby"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `bvtv`,
    siteUrl: `https://www.bvtv.be`,
  },
  graphqlTypegen: true,
  plugins: [],
}

module.exports = {
  plugins: [
    //'gatsby-plugin-mantine',
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // Language JSON resource path
        path: `${__dirname}/src/intl`,
        // Supported languages
        languages: ['nl','fr','en'],
        // Default language
        defaultLanguage: 'nl',
        // Redirects to `/default/` when connecting `/`
        redirect: false,
        svgo: true,
      },
    },    
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
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
        optionalFields: [
          {
            name: `talent`,
            fields: [`image`, `description`],
            defaultValue: null,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "talents",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "flexsearch",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        //engineOptions: "speed",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
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

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "slug",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ["name", "description"],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ["slug", "name", "price", "description", "strapi_id", "active", "image"],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        
        normalizer: ({ data }) =>
          data.allStrapiTalent.edges.map(({ node }) => ({
            slug: node.slug,
            name: node.name,
            price: node.price,
            description: node.description,
            strapi_id: node.strapi_id,
            active: node.active,
            image: node.image
          })),
      },
    },    
  ],
}

export default config
