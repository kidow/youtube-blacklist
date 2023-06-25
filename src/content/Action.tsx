import { useState } from 'react'
import type { FC } from 'react'
import { createPortal } from 'react-dom'

import Switch from './components/Switch'
import Button from './components/Button'

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

const Action: FC<Props> = ({ channel, video }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)

  const block = async () => {}
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
                className="fixed inset-0 bg-black/50 transition-opacity"
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
                <div className="space-y-10 bg-neutral-900 py-6 px-7 text-neutral-50">
                  <div className="text-[16px] font-semibold">
                    이 동영상을 차단합니까?
                  </div>
                  <div className="space-y-4 rounded-lg border border-solid border-neutral-700 p-6">
                    <div className="line-clamp-2 text-[16px] font-medium text-[#f1f1f1]">
                      {video.title}
                    </div>
                    <div className="text-[14px] text-[#aaa]">
                      {channel.name}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className="cursor-pointer text-[14px] text-neutral-500 hover:text-neutral-400"
                      onClick={() => setChecked(!checked)}
                    >
                      채널 전체를 차단하기
                    </span>
                    <Switch
                      checked={checked}
                      onChange={(checked) => setChecked(checked)}
                    />
                  </div>
                  <footer className="flex justify-end gap-4">
                    <Button
                      text="취소"
                      onClick={() => setIsOpen(false)}
                      theme="outlined"
                    />
                    <Button text="차단" onClick={block} theme="contained" />
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

export default Action
