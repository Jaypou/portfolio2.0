"use server";

// export async function getAllBlogs(locale: string) {
//   const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";
//   const res = await fetch(graphqlAPI, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     next: { revalidate: 86400 }, // 24 hours
//     body: JSON.stringify({
//       query: ``,
//     }),
//   });
//   const json = await res.json();
//   return json.data.blogs;
// }

export async function getAllBlogs(locale: string) {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
          query MyQuery {
  blogsConnection(orderBy: createdAt_DESC) {
    edges {
      cursor
      node {
        author {
          bio
          name
          picture {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
      }
    }
  }
  categories {
    name
    slug
  }
}
          `,
    }),
  });
  const json = await res.json();

  return json.data.blogsConnection.edges;
}

// export async function getAllBlogs(locale: string) {
//   const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

//   const res = await fetch(graphqlAPI, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     next: { revalidate: 86400 }, // 24 hours
//     body: JSON.stringify({
//       query: `
//         query MyQuery {
//           blogsConnection(locales: [${locale}, en], orderBy: createdAt_DESC) {
//             edges {
//               cursor
//               node {
//                 authors {
//                   bio
//                   name
//                   id
//                   picture {
//                     url
//                   }
//                 }
//                 createdAt
//                 slug
//                 title
//                 excerpt
//                 featuredImage {
//                   url
//                 }
//                 categories {
//                   name
//                   slug
//                 }
//               }
//             }
//           }
//         }
//         `,
//     }),
//   });
//   const json = await res.json();
//   return json.data.blogsConnection.edges;
// }

export async function getAllBlogsStaticParams() {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
            query MyQuery {
            blogsConnection {
                edges {
              cursor
              node {
                authors {
                  bio
                  name
                  id
                  picture {
                    url
                  }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                  url
                }
                categories {
                  name
                  slug
                }
              }
            }
          }
        }
        `,
    }),
  });
  const json = await res.json();

  return json.data.blogsConnection.edges;
}

export async function getBlogDetails(slug: string, locale: string) {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
            query MyQuery {
            blog(where: {slug: "${slug}"}, locales: [${locale}, en]) {
                authors {
                bio
                nom
                id
                picture {
                    url
                }
                }
                createdAt
                slug
                title
                excerpt
                featuredImage {
                url
                }
                categories {
                name
                slug
                }
                content {
                                 json
                                 html
                                 # markdown
                    }
            }
            }
            `,
    }),
  });
  const json = await res.json();

  return json.data.post;
}

export async function getFeaturedBlogs(locale: string) {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
            query MyQuery {
            blogs(orderBy: createdAt_DESC, last: 3, where: {featuredPost: true}, locales: [${locale}, en]) {
                authors {
                name
                picture {
                    url
                }
                }
                featuredImage {
                url
                }
                title
                slug
                createdAt
                categories {
                name
                slug
                }
            }
            }
            `,
    }),
  });
  const json = await res.json();

  return json.data.posts;
}

export async function getCategories(locale: string) {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
            query MyQuery {
            categories(locales: [${locale}, en]) {
                name
                slug
            }
            }
            `,
    }),
  });
  const json = await res.json();

  return json.data.categories;
}

export async function getCategoriesStaticParams() {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
                query MyQuery {
                categories {
                    name
                    slug
                }
                }
                `,
    }),
  });
  const json = await res.json();

  return json.data.categories;
}

export async function getCategoryPost(slug: string, locale: string) {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
                query MyQuery {
                blogsConnection(where: {categories_some: {slug: "${slug}"}}, locales: [${locale}, en]) {
                    edges {
                    cursor
                    node {
                        authors {
                        bio
                        name
                        id
                        picture {
                            url
                        }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                        url
                        }
                        categories {
                        name
                        slug
                        }
                    }
                    }
                }
                }
                `,
    }),
  });
  const json = await res.json();

  return json.data.blogsConnection.edges;
}

export async function getRecentPosts(locale: string) {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
            query MyQuery {
            blogs(orderBy: createdAt_DESC, first: 3, locales: [${locale}, en]) {
                authors {
                name
                picture {
                    url
                }
                }
                featuredImage {
                url
                }
                title
                slug
                createdAt
                categories {
                name
                slug
                }
            }
            }
            `,
    }),
  });
  const json = await res.json();

  return json.data.posts;
}

export async function getSimilarPosts(
  categories: string[],
  slug: string,
  locale: string
) {
  const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? "";

  const res = await fetch(graphqlAPI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 86400 }, // 24 hours
    body: JSON.stringify({
      query: `
                query getSimilarPosts($slug: String!, $categories: [String!]) {
                (where: {
                      slug_not: $slug
                      AND: { categories_some: { slug_in: $categories } }},
                        last: 3, locales: [${locale}, en]
                         ){
                    authors {
                    name
                    picture {
                        url
                    }
                    }
                    featuredImage {
                    url
                    }
                    title
                    slug
                    createdAt
                    categories {
                    name
                    slug
                    }
                }
                }
                `,
      variables: { categories, slug },
    }),
  });
  const json = await res.json();

  return json.data.posts;
}
