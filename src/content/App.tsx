import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import browser from 'webextension-polyfill'

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const get = async () => {
    const obj = await browser.storage.sync.get('blacklist')
    console.log('obj', obj)
  }

  const setup = () => {}

  const observe = () => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
          if (addedNode instanceof HTMLElement) {
            if (addedNode.tagName === 'YTD-RICH-ITEM-RENDERER') {
              console.log('검색')
              console.log(addedNode)
            }
            if (addedNode.tagName === 'YTD-VIDEO-RENDERER') {
              console.log('홈, 인기 등')
              console.log(addedNode)
            }
          }
        }
      }
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    })
  }

  const block = () => {}

  useEffect(() => {
    get()
    observe()
    setup()
    // if (!list || !list.length) return
    // list.forEach((element) => {
    //   const div = element.querySelector(
    //     '#meta>ytd-video-meta-block>#metadata>#metadata-line'
    //   )
    //   const span = document.createElement('span')
    //   span.className = 'inline-metadata-item style-scope ytd-video-meta-block'
    //   console.log('div')
    //   console.log(div)
    // })
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
          className="fixed inset-0 bg-black/40 transition-opacity"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
        <span
          className="h-screen align-middle md:inline-block"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="my-8 inline-block w-full max-w-xl transform overflow-hidden rounded-lg text-left align-middle shadow-xl transition-all">
          <div className="bg-neutral-700 py-6 px-7 text-neutral-50">
            <div className="text-base">이 채널 차단하기</div>
            <div></div>
            <footer className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>취소</button>
              <button onClick={block}>차단</button>
            </footer>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
export default App
