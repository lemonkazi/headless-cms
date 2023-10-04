import React from "react"
import { graphql, Link } from "gatsby"
import parse from "html-react-parser"


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
      <section>
        <h1>{parse(pageBy.title)}</h1>
        {!!pageBy.content && (
          <div>{parse(pageBy.content)}</div>
        )}
        {/* You can render additional content here */}
      </section>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}
export default SecondPage
