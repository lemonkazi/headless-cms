import React from "react"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
import "../css/@wordpress/block-library/build-style/style.css"
import "../css/@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query MyQuery {
    WordPress {
      pageBy(pageId: 27) {
        id
        title
        content
      }
    }
  }
`

const SecondPage = ({ data }) => {
  const { pageBy } = data.WordPress

  return (
    <Layout>
      <SEO title={pageBy.title} />
      
        
      {!!pageBy.content && (
        <div className="entry-content wp-block-post-content is-layout-constrained wp-block-post-content-is-layout-constrained">
          {parse(pageBy.content)}
        </div>
      )}
      
      {/* You can render additional content here */}

      <Link to="/">Go back to the homepage</Link>
      
    </Layout>
  )
}
export default SecondPage
