import React from "react"
import { graphql } from "gatsby"
// import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    //const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" />
        <h1>4<span role="img" aria-label="Face With Rolling Eyes">🙄</span>4 - Not Found</h1>
        <p>This post doesn&#39;t exist... Yet.</p>
        {/* <h3>These are the latest stories </h3> */}
        {/* {
          posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article key={node.fields.slug} style={{
                marginBottom: rhythm(1 / 4),
              }}>
                <header>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                  <span>
                    {` - `}
                    <small>
                      {node.frontmatter.date}
                    </small>
                  </span>
                </header>
              </article>
            )
          })
        } */}
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
