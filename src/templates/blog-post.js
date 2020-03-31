import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import ReadingTime from "../components/ReadingTime";
import ShareButton from '../components/ShareButton';
import Title from '../components/Title';
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import Subscribe from "../components/Subscribe";
import Comments from '../components/Comments';
const sharePlatforms = ['twitter', 'facebook', 'linkedIn', 'reddit', 'hackernews', 'clipboard'] // clipboard should be last!

const ShareSection = ({ path, postName }) => (
  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
    <div>
      Share this article
  </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {sharePlatforms.map(platform => (
        <div key={platform} style={{ marginRight: '25px' }}>
          <ShareButton platform={platform} path={path} postName={postName} />
        </div>
      ))}
    </div>
  </div>
)

class BlogPostTemplate extends React.Component {
  render() {
    const { pageContext, location, data } = this.props;
    const post = data.markdownRemark
    const { frontmatter } = post;

    const { title, featuredImage } = frontmatter;

    const siteTitle = data.site.siteMetadata.siteName
    const { previous, next, slug } = pageContext
    const featuredImgFluid = featuredImage && featuredImage.childImageSharp.fluid;
    const imageSrc = featuredImage && featuredImage.childImageSharp.fluid.src;

    const disqusConfig = {
      shortname: process.env.GATSBY_DISQUS_NAME,
      config: {
        identifier: slug,
        title,
      },
    }

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title={frontmatter.title}
          description={frontmatter.description || post.excerpt}
          image={imageSrc}
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
          <ShareSection path={`${location.pathname}${location.search}`} postName={frontmatter.title} />
          <footer>
            <h3>
              <Title>{siteTitle}</Title>
            </h3>
            <Bio />
          </footer>
        </article>
        <div>
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
                  <div>
                    <div>← Previous article</div>
                    <Link to={previous.fields.slug} rel="prev">
                      {previous.frontmatter.title}
                    </Link>
                  </div>
                )}
              </li>
              <li>
                {next && (
                  <div>
                    <div>Next article →</div>
                    <Link to={next.fields.slug} rel="next">
                      {next.frontmatter.title}
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <Subscribe />
          <Comments {...disqusConfig} />
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteName
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
