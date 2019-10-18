import React from 'react';
import FontAwesome from 'react-fontawesome';
import { rhythm } from '../utils/typography';

const socialLinks = [
  { name: 'twitter', url: 'https://mobile.twitter.com/sag1v' },
  { name: 'github', url: 'https://github.com/sag1v' },
  { name: 'stack-overflow', url: 'https://stackoverflow.com/users/3148807/sagiv-b-g' },
  { name: 'medium', url: 'https://medium.com/@sagiv.bengiat' },
  { name: 'dev', url: 'https://dev.to/sag1v' },
  { name: 'rss-square', url: '/rss.xml', notSocial: true }
]

const SocialLink = ({ url, name, notSocial }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: 'none', boxShadow: 'none', marginRight: '30px' }}
  >
    <FontAwesome
      name={name}
      size="2x"
      className={notSocial ? "" : "fab"}
    />
  </a>
);

function Footer() {
  return (
    <footer
      style={{
        marginTop: rhythm(2.5),
        paddingTop: rhythm(1),
      }}
    >
      {socialLinks.map(social => <SocialLink key={social.name} {...social} />)}
    </footer>
  );
}

export default Footer;