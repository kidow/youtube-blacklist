import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PopUp from './Popup'

function init() {
  const appContainer = document.querySelector('#popup-container')
  if (!appContainer) {
    throw new Error('Can not find #popup-container')
  }
  const root = createRoot(appContainer)
  root.render(<PopUp />)
}

init()
