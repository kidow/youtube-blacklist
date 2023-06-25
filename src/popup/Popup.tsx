import React, { useEffect, useState } from 'react'
import browser from 'webextension-polyfill'

const PopUp: React.FC = () => {
  const get = async () => {
    const storage = await browser.storage.sync.get('blacklist')
    console.log('storage', storage)
  }

  useEffect(() => {
    get()
  }, [])
  return (
    <div className="w-96 space-y-4 p-6">
      <div className="text-lg font-semibold">차단 목록</div>
      <div>
        <div>채널</div>
        <ul></ul>
      </div>
      <div>
        <div>비디오</div>
        <ul></ul>
      </div>
    </div>
  )
}

export default PopUp
