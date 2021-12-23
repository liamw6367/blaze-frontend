import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'
import TextField from "@material-ui/core/TextField";
import '../scss/chat.scss'


const Chat = () => {
    // const socket = io.connect(process.env.REACT_APP_API_URL);
    const [state, setState] = useState({message: ''});
    const [chat, setChat] = useState([])
    const socketRef = useRef()

    useEffect(
        () => {
                socketRef.current = io.connect(process.env.REACT_APP_API_URL)
                socketRef.current.on("getMessage", ({ message }) => {
                    setChat([ ...chat, { message } ])
                })
                return () => socketRef.current.disconnect()
        },
        [ chat ]
    )
    const onMessageSubmit = (e) => {
        const { message } = state
        socketRef.current.emit("sendMessage", { message })
        e.preventDefault()
        setState({ message: ""})
    }
    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const renderChat = () => {
        return chat.map(({name, message}, index) => (
            <div key={index}>
                <h3>
                    {name}: <span>{message}</span>
                </h3>
            </div>
        ))
    }
    return (
        <div>
            <form onSubmit={onMessageSubmit}>
                <h1>Messanger</h1>
                <div className='name-field'>
                    <TextField name='message' onChange={e => onTextChange(e)} value={state.message} label={'Message'}/>
                </div>
                <button>Send Message</button>
            </form>
            <div>
                <h1>Chat Log</h1>
                {renderChat()}
            </div>
        </div>
    )
}
export default Chat

