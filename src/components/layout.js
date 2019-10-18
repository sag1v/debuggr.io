import React, { useState, useEffect } from "react";
import Helmet from 'react-helmet';
import { navigate } from 'gatsby-link'
import "@fortawesome/fontawesome-free/css/all.css";
import { rhythm, scale } from "../utils/typography"
import Footer from './Footer';
import Title from './Title';
import DayNightSwitch from './DayNightSwitch';
import '../utils/global.css';

// needs to be in sync with global.css vars
const darkBg = '#323232';
const lightBg = '#fff';

function Layout(props) {
  const [darkModeOn, setDarkMode] = useState(false);

  const toggleDarkMode = ({ target }) => {
    window.__setPreferredTheme(
      target.checked ? 'dark' : 'light'
    )
    setDarkMode(target.checked);
  }

  useEffect(() => {
    setDarkMode(window.__theme === 'dark');
    window.__onThemeChange = () => {
      setDarkMode(window.__theme === 'dark');
    };
  }, [])


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
      <Helmet
        meta={[
          {
            name: 'theme-color',
            content: darkModeOn ? darkBg : lightBg,
          },
        ]}
      />
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
        <Form />
      </div>
    </React.Fragment>
  )
}

export default Layout



function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

function Form() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <div>
      <h1>Subscribe</h1>
      <form
        name="subscribe"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="subscribe" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your name:
            <br />
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your email:
            <br />
            <input type="email" name="email" onChange={handleChange} />
          </label>
        </p>
        <p>
          <button type="submit">Subscribe</button>
        </p>
      </form>
    </div>
  )
}