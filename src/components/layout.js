import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { rhythm, scale } from "../utils/typography"
import Footer from './Footer';
import Title from './Title';
import DayNightSwitch from './DayNightSwitch';

function Layout(props) {
  const [darkModeOn, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(state => !state);
  }

  const { location, title, children } = props;
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    // home page
    header = (
      <h1
        style={{
          ...scale(0.8),
          marginBottom: 0, //rhythm(1.5),
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
          marginBottom: 0,
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
        <header className="header" >
          <div>
            {header}
          </div>
          <DayNightSwitch checked={darkModeOn} onChange={toggleDarkMode} />
        </header>
        <main>{children}</main>
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Layout
