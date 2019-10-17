import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { rhythm, scale } from "../utils/typography"
import Footer from './Footer';
import Title from './Title';
import DayNightSwitch from './DayNightSwitch';

const DARK_THEME_KEY = 'DARK_THEME';
const DARK_THEME_CLASS = 'dark';

function updateBody(isDarkExplicit = null) {
  const isDark = isDarkExplicit ===
    null
    ? localStorage.getItem(DARK_THEME_KEY)
    : isDarkExplicit;
    
  const bodClasses = document.body.classList;
  if (isDark && !bodClasses.contains(DARK_THEME_CLASS)) {
    bodClasses.add(DARK_THEME_CLASS);
  } else {
    bodClasses.remove(DARK_THEME_CLASS);
  }
}

function toggleDarkTheme(isDark) {
  try {
    localStorage.setItem(DARK_THEME_KEY, isDark);
    updateBody(isDark);
  } catch (error) {
    console.warn('Failed to store theme', error)
  }
}

function getStoredDarkTheme(){
  const val = localStorage.getItem(DARK_THEME_CLASS);
  const asBool = Boolean(val);
  console.log(asBool)
  return asBool;
}

function Layout(props) {
  const [darkModeOn, setDarkMode] = useState(getStoredDarkTheme());

  const toggleDarkMode = () => {
    setDarkMode(state => !state);
  }

  useEffect(() => {
    updateBody();
  }, [])

  useEffect(() => {
    toggleDarkTheme(darkModeOn)
  }, [darkModeOn])

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
