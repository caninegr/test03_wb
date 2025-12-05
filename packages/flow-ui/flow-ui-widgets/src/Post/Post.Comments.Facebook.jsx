import React, { useEffect } from 'react'
import { Box, Divider } from 'theme-ui'

const APP_ID = process.env.GATSBY_FACEBOOK_APP_ID

const PostCommentsFacebook = ({ siteUrl, slug }) => {
  useEffect(() => {
    // Load Facebook SDK
    if (!window.FB) {
      const script = document.createElement('script')
      script.async = true
      script.defer = true
      script.crossOrigin = 'anonymous'
      script.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0&appId=${APP_ID}&autoLogAppEvents=1`
      document.body.appendChild(script)
    } else {
      // If FB SDK already loaded, just parse
      window.FB.XFBML.parse()
    }
  }, [])

  return (
    <Box>
      <div id='fb-root'></div>
      <Divider />
      <div
        className='fb-comments'
        data-href={`${siteUrl}${slug}`}
        data-width='100%'
        data-numposts='5'
      ></div>
    </Box>
  )
}

export default PostCommentsFacebook
