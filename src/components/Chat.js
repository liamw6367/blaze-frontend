import React, {useState, useEffect, useRef} from 'react'
import io from 'socket.io-client'
import TextField from "@material-ui/core/TextField";
import '../scss/chat.scss'
import axios from "axios";


const Chat = () => {
    // const socket = io.connect(process.env.REACT_APP_API_URL);
    const [state, setState] = useState({message: '', from_id:1, to_id: 5});
    const [chat, setChat] = useState([])
    const socketRef = useRef()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/chat/get-messages`)
            .then(res => setChat(res.data))
    },[])

    useEffect(
        () => {
                socketRef.current = io.connect(process.env.REACT_APP_API_URL)
                socketRef.current.on("getMessages", (data) => {
                    console.log(data, '111')
                    setChat(data)
                })
                return () => socketRef.current.disconnect()
        },
        [ chat ]
    )
    const onMessageSubmit = (e) => {
        const { from_id, message, to_id } = state
        socketRef.current.emit("sendMessage", { from_id, message, to_id })
        e.preventDefault()
        setState({ message: ""})
    }
    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const renderChat = () => {
        console.log(chat,'chat')
        return chat.map(({from_id,to_id,message}, index) => (
            <div key={index}>
                <h3>
                    {from_id}: <span>{message}</span>{to_id}
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

