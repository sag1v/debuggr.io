import React, { useEffect, useState, useCallback } from "react"
import { DiscussionEmbed } from "disqus-react"

function Comments(props) {
    const [flipState, forceUpdate] = useState(false);
    const transitionEnd = useCallback((ev) => {
      const { target, propertyName } = ev;
      if (target === document.body && propertyName === 'background-color') {
        forceUpdate(o => !o);
      }
    }, [])
  
    useEffect(() => {
      document.body.addEventListener('transitionend', transitionEnd)
      return () => document.body.removeEventListener('transitionend', transitionEnd)
    }, [transitionEnd])
  
    return (
        <div>
            <h3>Share your thoughts 💬</h3>
            <DiscussionEmbed {...props} fakeProp={flipState} />
        </div>
    )
  }


  export default Comments;