import React from 'react';
import { Link, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';
import ReadingTime from '../components/ReadingTime';
import Subscribe from '../components/Subscribe';

function Thumbnail(props) {
  return (
    <Img
      className="index-item-image"
      fluid={props.fluid}
    />
  );
}

function PreviewItem({ node }) {
  const title = node.frontmatter.title || node.fields.slug;
  const featuredImgFluid =
    node.frontmatter.featuredImage &&
    node.frontmatter.featuredImage.childImageSharp.fluid;

  return (
    <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
      <div className="index-list-container">
        <article
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: '15px',
          }}
        >
          <header>
            <h3
              className="index-item-title"
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              {title}
            </h3>
            <small>
              {node.frontmatter.date}
              {` - `}
              <ReadingTime minutes={node.timeToRead} />
            </small>
          </header>
          <section>
            <p
              style={{ margin: 0 }}
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </section>
        </article>
        {featuredImgFluid && <Thumbnail fluid={featuredImgFluid} />}
      </div>
    </Link>
  );
}

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.siteName;
    const posts = data.allMarkdownRemark.edges;
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={siteTitle} />
        <Bio />
        {posts.map(({ node }) => (
          <PreviewItem key={node.fields.slug} node={node} />
        ))}
        <Subscribe />
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        siteName
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 650) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
