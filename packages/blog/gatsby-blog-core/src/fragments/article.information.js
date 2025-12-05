import { graphql } from 'gatsby'

export const query = graphql`
  fragment ArticleInformation on Article {
    id
    title
    slug
    link
    excerpt
    tableOfContents(maxDepth: 2) @include(if: $includeTableOfContents)
    timeToRead @include(if: $includeTimeToRead)
    featured
    protected
    thumbnailText
    date(formatString: "MMMM DD, YYYY")
    category {
      ...ArticleCategory
    }
    author {
      ...ArticleAuthor
    }
    parent {
      ... on Mdx {
        internal {
          contentFilePath
        }
      }
    }
    keywords
    tags {
      id
      name
      slug
    }
  }
`
