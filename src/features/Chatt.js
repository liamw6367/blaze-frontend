import React, { useState, useRef, useEffect } from 'react'
import '../scss/chatt.scss'
import { ReactComponent as ChatLogo } from '../assets/images/x(26).svg'
import { ReactComponent as ChatAvatar } from '../assets/images/chat_avatar.svg'
import { ReactComponent as SendLogo } from '../assets/images/send.svg'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import TextField from '@material-ui/core/TextField'
import io from 'socket.io-client'
import moment from 'moment'

const Chatt = () => {
  const [showChat, setShowChat] = useState(false)
  const [supportMsg, setSupportMsg] = useState()
  const clickRef = useRef()
  let token = localStorage.getItem('token')

  let user_id
  let role
  let username
  let customer_id
  if (token) {
    const user = jwtDecode(token)
    user_id = user.id
    role = user.user_role.name
    username = user.username
    customer_id = user.id
  }

  const [state, setState] = useState({
    message: '',
    from_id: user_id,
    to_id: 2,
  })
  const [chat, setChat] = useState([])
  const socketRef = useRef()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/chat/get-messages`, {
        params: { from_id: user_id, role },
      })
      .then((res) => setChat(res.data))
  }, [])

  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_API_URL)
    socketRef.current.on('getMessages', (data) => {
      console.log(data, '111')
      setChat(data)
    })
    socketRef.current.on('userConnected', (data) => {
      console.log(data)
    })
    return () => socketRef.current.disconnect()
  }, [chat])
  const onMessageSubmit = (e) => {
    const { from_id, message, to_id } = state
    console.log(state)
    socketRef.current.emit('sendMessage', { from_id, message, to_id })
    e.preventDefault()
    setState({ message: '', from_id: user_id, to_id: to_id })
  }
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const renderChat = () => {
    // console.log(chat,'chat')
    if (!chat.length) {
      const date = new Date()
      let time = date.getTime()
      return (
        <div className={`message-item `}>
          <div>
            <ChatAvatar />
            <p className="Chat-time">{moment(time).format('hh:mm')}</p>
          </div>
          <div className={`Chat-message to`}>
            <span>Hi. How can I help you ?</span>
          </div>
          {/*<ChatAvatar className={ownMessage ? 'hidden': ''}/>*/}
        </div>
      )
    } else {
      return chat.map(({ from_id, to_id, message, created_at }, index) => {
        let ownMessage = +from_id === user_id
        console.log(from_id, user_id)

        return (
          <div
            key={index}
            className={`message-item ${!ownMessage ? '' : 'message-item--own'}`}
          >
            <div>
              <ChatAvatar />
              <p className="Chat-time">{moment(created_at).format('hh:mm')}</p>
            </div>
            <div className={`Chat-message ${ownMessage ? 'own' : 'to'}`}>
              <span></span>
            </div>
            {/*<ChatAvatar className={ownMessage ? 'hidden': ''}/>*/}
          </div>
        )
      })
    }
  }

  function chatH() {
    setShowChat(!showChat)
    if (!showChat && username && customer_id) {
      socketRef.current.emit('newUser', { username, customer_id })
      console.log(true)
    }
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
            <p className="Chat-support__name">Support name</p>
            <div className="chatCloseBtn" onClick={closeBtn}>
              <ChatLogo className="close" />
            </div>
          </div>
          <div className="Chat-container">{renderChat()}</div>
          <form onSubmit={onMessageSubmit}>
            {/*<h1>Messenger</h1>*/}
            <div className="name-field">
              <textarea
                className="Chat-input"
                name="message"
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    onMessageSubmit(event)
                  }
                }}
                onChange={(e) => onTextChange(e)}
                value={state.message}
                placeholder={'Message'}
              ></textarea>
              <button className="Chat-input__submit">
                <SendLogo />
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        <button className="btn" onClick={(e) => chatH(e)}></button>
      </div>
    </div>
  )
}

export default Chatt
