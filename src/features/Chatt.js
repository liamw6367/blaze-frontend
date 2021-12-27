import React, { useState, useRef, useEffect } from 'react'
import '../scss/chatt.scss'
import { ReactComponent as ChatLogo } from '../assets/images/x(26).svg'
const Chatt = () => {
  const [showChat, setShowChat] = useState(false)
  const clickRef = useRef()

  function chatH() {
    setShowChat(!showChat)
  }

  function closeBtn() {
    setShowChat(false)
  }

  const handleClickOutside = (event) => {
    if (clickRef.current && !clickRef.current.contains(event.target)) {
      setShowChat(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
  })

  return (
    <div ref={clickRef} className="chatWrapper">
      {showChat && (
        <div className="chatContent">
          <div className="chatHeader">
            <div className="chatCloseBtn" onClick={closeBtn}>
              <ChatLogo className="close" />
            </div>
          </div>
        </div>
      )}
      <div>
        <button className="btn" onClick={(e) => chatH(e)}></button>
      </div>
    </div>
  )
}

export default Chatt
