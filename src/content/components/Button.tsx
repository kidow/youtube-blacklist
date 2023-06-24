import { useState } from 'react'
import type { FC } from 'react'
import { createPortal } from 'react-dom'

export interface Props {
  channel: {
    name: string
    href: string
  }
  video: {
    title: string
    href: string
  }
}

const Button: FC<Props> = ({ channel, video }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        차단
      </span>
      {isOpen &&
        createPortal(
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
                    <button onClick={() => {}}>차단</button>
                  </footer>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Button
