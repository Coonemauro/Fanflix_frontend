exports.createPages = async function ({ actions, graphql }) {
  const result = await graphql(`
    query {
      talents: allStrapiTalent {
        edges {
          node {
            slug
            strapi_id
            subcategory {
              strapi_id
            }
            enrollAccepted
          }
        }
      }
      categories: allStrapiCategory {
        edges {
          node {
            strapi_id
            slug
            subcategories {
              strapi_id
              slug
            }
          }
        }
      }
      tags: allStrapiTag {
        edges {
          node {
            strapi_id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const talentDetailsTemplate = require.resolve(
    "./src/templates/talentDetails.tsx"
  );
  const talentBookTemplate = require.resolve("./src/templates/talentBook.tsx");
  const talents = result.data.talents.edges;
  talents.forEach((talent) => {
    if (talent.node.slug !== null && talent.node.enrollAccepted === true && talent.node.subcategory !== null && talent.node.subcategory.strapi_id !== null) {
      actions.createPage({
        path: talent.node.slug,
        component: talentDetailsTemplate,
        context: { strapi_id: talent.node.strapi_id, subID: talent.node.subcategory.strapi_id },
      });

      actions.createPage({
        path: `${talent.node.slug}/book`,
        component: talentBookTemplate,
        context: { strapi_id: talent.node.strapi_id  },
      });
    }
  });

  const browseTemplate = require.resolve("./src/templates/browseTalents.tsx");
  actions.createPage({
    path: `browse`,
    component: browseTemplate,
    context: {},
  });

  actions.createPage({
    path: `search`,
    component: browseTemplate,
    context: {},
  });

  const categories = result.data.categories.edges;
  categories.forEach((category) => {
    const slug = category.node.slug;
    if (slug !== null) {
      actions.createPage({
        path: `browse/${slug}`,
        component: browseTemplate,
        context: { catID: category.node.strapi_id },
      });
      const subcategories = category.node.subcategories;
      subcategories.forEach((subcategory) => {
        if (subcategory.slug !== null) {
          actions.createPage({
            path: `browse/${slug}/${subcategory.slug}`,
            component: browseTemplate,
            context: { subID: subcategory.strapi_id },
          });
        }
      });
    }
  });

  //const browseTagTemplate = require.resolve('./src/templates/browseTags.jsx');
  const tags = result.data.tags.edges;
  tags.forEach((tag) => {
    const slug = tag.node.slug;
    if (slug !== null) {
      actions.createPage({
        path: `browse/${slug}`,
        //component: browseTagTemplate,
        component: browseTemplate,
        context: { tagID: tag.node.strapi_id },
      });
    }
  });
};
