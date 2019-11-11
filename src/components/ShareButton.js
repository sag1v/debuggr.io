import React, { useRef, useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';

const NewTabLink = ({ children, style, ...rest }) => (
    <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ boxShadow: 'none', textDecoration: 'none', ...style }}
        {...rest}
    >
        {children}
    </a>
);

const TwitterButton = ({ url, postName }) => {
    const title = `${postName} \n by @sag1v`;
    // escape new line (new support by twitter?)
    const content = escape(`${title} \n ${url}`)

    return (
        <NewTabLink href={`https://twitter.com/intent/tweet?text=${content}`}>
            <FontAwesome name="twitter" className="fab" />
        </NewTabLink>
    )
}

const FacebookButton = ({ url, postName }) => {
    return (
        <NewTabLink
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup&ref=plugin&src=share_button`}
        >
            <FontAwesome name="facebook" className="fab" />
        </NewTabLink>
    )
}

const LinkedInButton = ({ url, postName }) => {
    return (
        <NewTabLink
            href={`https://www.linkedin.com/shareArticle?mini=true&title=${postName}&url=${url}`}
        >
            <FontAwesome name="linkedin" className="fab" />
        </NewTabLink>
    );
}

const RedditButton = ({ url, postName }) => {
    const title = escape(postName);
    return (
        <NewTabLink
            href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
        >
            <FontAwesome name="reddit-alien" className="fab" />
        </NewTabLink>
    );
}

const HackerNewsButton = ({ url, postName }) => {
    const title = escape(postName);
    return (
        <NewTabLink
            href={`https://news.ycombinator.com/submitlink?u=${url}&t=${title}`}
        >
            <FontAwesome name="hacker-news" className="fab" />
        </NewTabLink>
    );
}

const CopyUrlButton = ({ url }) => {
    const [isCopied, setIsCopied] = useState(false);
    const fakeElementRef = useRef(null);
    const timerIdRef = useRef(null);

    function copyToClipboard(e) {
        e.preventDefault()
        fakeElementRef.current.select();
        document.execCommand('copy');
        setIsCopied(true);
    }

    useEffect(() => {
        if (isCopied) {
            timerIdRef.current = setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        }

        return () => {
            timerIdRef.current && clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
        }
    }, [isCopied])

    return (
        <div onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
            <textarea
                readOnly
                ref={fakeElementRef}
                value={url}
                style={{ height: 0, width: 0, opacity: 0, overflow: 'hidden' }}
            />
            <NewTabLink href="#">
                <FontAwesome name="copy" />
            </NewTabLink>
            <div
                style={{
                    transition: 'all 500ms ease-in-out',
                    fontSize: '0.5em',
                    opacity: isCopied ? 100 : 0,
                    height: 0,
                }}
            >
                URL copied to clipboard
            </div>
        </div>
    );
}

function ShareButton({ platform, path, postName }) {
    const prodURL = `https://debuggr.io${path}`;
    let Component;
    switch (platform) {
        case 'twitter':
            Component = TwitterButton;
            break;
        case 'facebook':
            Component = FacebookButton;
            break;
        case 'linkedIn':
            Component = LinkedInButton;
            break;
        case 'reddit':
            Component = RedditButton;
            break;
        case 'clipboard':
            Component = CopyUrlButton;
            break;
        case 'hackernews':
            Component = HackerNewsButton;
            break;

        default:
            throw new Error(`Unsupported platform ${platform}`);
    }

    return <Component url={prodURL} postName={postName} />
}

export default ShareButton;