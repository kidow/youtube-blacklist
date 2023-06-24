import React from 'react'
import browser from 'webextension-polyfill'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import Button from './components/Button'

// const pluginTagId = 'youtube-blacklist'
// const existingInstance = document.getElementById('youtube-blacklist')
// if (existingInstance) {
//   console.log('existing instance found, removing')
//   existingInstance.remove()
// }

// const app = document.createElement('div')
// app.id = pluginTagId

// const body = document.querySelector('body')
// if (body) {
//   body.append(app)
// }

// ReactDOM.createRoot(app).render(<App />)

async function main() {
  const data = await browser.storage.sync.get('blacklist')
  console.log('data', data)

  const list = document.querySelectorAll('ytd-rich-grid-media')
  for (const item of list) {
    const metadataLine = item.querySelector(
      '#dismissible>#details>#meta>ytd-video-meta-block>#metadata>#metadata-line'
    )
    const { href: channelHref, textContent: channelName } = item.querySelector(
      '#dismissible>#details>#meta>ytd-video-meta-block>#metadata>#byline-container>ytd-channel-name>#container>#text-container>yt-formatted-string>a'
    ) as HTMLAnchorElement
    const { href: videoHref, title: videoTitle } = item.querySelector(
      '#dismissible>#details>#meta>h3>#video-title-link'
    ) as HTMLAnchorElement
    const span = document.createElement('span')
    span.className = 'inline-metadata-item style-scope ytd-video-meta-block'
    metadataLine?.append(span)
    ReactDOM.createRoot(span).render(
      <Button
        channel={{ name: channelName || '', href: channelHref }}
        video={{ title: videoTitle, href: videoHref }}
      />
    )
  }
}

main()
