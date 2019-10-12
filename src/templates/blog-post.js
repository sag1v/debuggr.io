import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import ReadingTime from "../components/ReadingTime"
import ShareButton from '../components/ShareButton';
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const sharePlatforms = ['twitter', 'facebook', 'linkedIn', 'clipboard']

const ShareSection = ({ url, postName }) => (
  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
    <div>
      Share this article
  </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {sharePlatforms.map(platform => (
        <div key={platform} style={{ marginRight: '25px' }}>
          <ShareButton platform={platform} url={url} postName={postName} />
        </div>
      ))}
    </div>
  </div>
)

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { frontmatter } = post;

    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const featuredImgFluid = frontmatter.featuredImage && frontmatter.featuredImage.childImageSharp.fluid;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            {featuredImgFluid && <Img fluid={featuredImgFluid} />}
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              <span>
                {frontmatter.date}
              </span>
              {` - `}
              <ReadingTime minutes={post.timeToRead} />
            </p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <ShareSection url={this.props.location.href} postName={frontmatter.title} />
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
