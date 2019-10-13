import React from "react"
import "@fortawesome/fontawesome-free/css/all.css";
import { rhythm, scale } from "../utils/typography"
import Footer from './Footer';
import Title from './Title';


class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.3),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Title>{title}</Title>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Title>{title}</Title>
        </h3>
      )
    }
    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
          <Footer />
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
