/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Author = ({ children, url }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href={url}
  >
    {children}
  </a>
);

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          motto
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social, motto } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        // marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Personal blog by <Author url={`https://mobile.twitter.com/${social.twitter}`}>{author}</Author>.
        <span style={{ display: 'block' }}>
          {motto}.
        </span>
      </p>
    </div>
  )
}

export default Bio
