import { useEffect } from 'react'
import type { FC } from 'react'
import { createPortal } from 'react-dom'
import browser from 'webextension-polyfill'
import { useObjectState } from '../services'

import Switch from './components/Switch'
import Button from './components/Button'

interface State {
  isOpen: boolean
  checked: boolean
  channelName: string
  channelHref: string
  videoTitle: string
  videoHref: string
}

const App: FC = () => {
  const [
    { isOpen, channelName, channelHref, checked, videoHref, videoTitle },
    setState,
    _,
    resetState
  ] = useObjectState<State>({
    isOpen: false,
    checked: false,
    channelHref: '',
    channelName: '',
    videoHref: '',
    videoTitle: ''
  })

  const setup = async () => {
    const storage = await browser.storage.sync.get(['channels', 'videos'])
    const channels: IChannel[] = storage.channels || []
    const videos: IVideo[] = storage.videos || []

    const list = document.querySelectorAll('ytd-rich-grid-media')
    for (const item of list) {
      const metadataLine = item.querySelector(
        '#dismissible>#details>#meta>ytd-video-meta-block>#metadata>#metadata-line'
      )
      if (channels?.length > 0) {
        const channelHref = (
          item.querySelector(
            '#dismissible>#details>#avatar-link'
          ) as HTMLAnchorElement
        )?.href
        for (const channel of channels) {
          if (channel.href === channelHref) {
            item?.parentElement?.parentElement?.remove()
          }
        }
      } else if (videos?.length > 0) {
        const videoHref = (
          item.querySelector(
            '#dismissible>#details>#meta>h3>#video-title-link'
          ) as HTMLAnchorElement
        )?.href
        for (const video of videos) {
          if (video.href === videoHref) {
            item?.parentElement?.parentElement?.remove()
          }
        }
      }
      const span = generateButton()
      metadataLine?.append(span)
    }

    mutationObserve()
  }

  const generateButton = (): HTMLSpanElement => {
    const span = document.createElement('span')
    span.id = 'blacklist-button'
    span.className = 'inline-metadata-item style-scope ytd-video-meta-block'
    // @ts-ignore
    span.role = 'button'
    span.tabIndex = 0
    span.onclick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      const video =
        span.parentElement?.parentElement?.parentElement?.previousElementSibling?.querySelector(
          '#video-title-link'
        ) as HTMLAnchorElement
      const channel = span.parentElement?.parentElement?.parentElement
        ?.parentElement?.previousElementSibling as HTMLAnchorElement
      setState({
        isOpen: true,
        videoHref: video?.href || '',
        videoTitle: video?.textContent || '',
        channelHref: channel?.href || '',
        channelName: channel?.title || ''
      })
    }
    span.textContent = '차단'
    return span
  }

  const mutationObserve = () => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.target.nodeName === 'YTD-RICH-GRID-MEDIA') {
          const span = generateButton()
          const metadataLine = mutation.target
            // @ts-ignore
            .querySelector(
              '#dismissible>#details>#meta>ytd-video-meta-block>#metadata>#metadata-line'
            )
          if (metadataLine?.querySelector('#blacklist-button')) return
          metadataLine?.append(span)
        }
      }
    })
    observer.observe(
      document.querySelector('body>ytd-app>#content>ytd-page-manager')!,
      { subtree: true, childList: true }
    )
  }

  const block = async () => {
    const storage = await browser.storage.sync.get(['channels', 'videos'])
    console.log('storage', storage)
    const channels: IChannel[] = storage.channels || []
    const videos: IVideo[] = storage.videos || []
    if (checked) {
      await browser.storage.sync.set({
        channels: [...channels, { href: channelHref, name: channelName }]
      })
    } else {
      await browser.storage.sync.set({
        videos: [...videos, { href: videoHref, title: videoTitle }]
      })
    }
  }

  useEffect(() => {
    setup()
  }, [])
  if (!isOpen) return null
  return createPortal(
    <div
      className="fixed inset-0 z-[214856749] overflow-y-auto"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div className="flex min-h-screen items-center justify-center p-0 text-center md:block">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          aria-hidden="true"
          onClick={() => resetState()}
        />
        <span
          className="h-screen align-middle md:inline-block"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="my-8 inline-block w-full max-w-xl transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all">
          <header className="border-t-4 border-solid border-blue-500" />
          <div className="space-y-10 bg-neutral-900 px-7 py-6 text-neutral-50">
            <div className="text-[16px] font-semibold">
              이 동영상을 차단합니까?
            </div>
            <div className="space-y-4 rounded-lg border border-solid border-neutral-700 p-6">
              <div className="line-clamp-2 text-[16px] font-medium text-[#f1f1f1]">
                {videoTitle}
              </div>
              <div className="text-[14px] text-[#aaa]">{channelName}</div>
            </div>
            <div className="flex items-center justify-between">
              <span
                className="cursor-pointer text-[14px] text-neutral-500 hover:text-neutral-400"
                onClick={() => setState({ checked: !checked })}
              >
                채널 전체를 차단하기
              </span>
              <Switch
                checked={checked}
                onChange={(checked) => setState({ checked })}
              />
            </div>
            <footer className="flex justify-end gap-4">
              <Button
                text="취소"
                onClick={() => setState({ isOpen: false })}
                theme="outlined"
              />
              <Button text="차단" onClick={block} theme="contained" />
            </footer>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default App
