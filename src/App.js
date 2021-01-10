import React, { useEffect } from 'react'
import './App.css'

import { useSelector, useDispatch } from 'react-redux'
import { joined, setUsers as setUsersDispatch, newMessage } from './redux/actions/connect'

import socket from './socket'
import axios from 'axios'

import { JoinBlock, Chat } from './components'

// node scripts/start.js // node index.js
// "proxy": "http://localhost:9999",

function App() {
    const dispatch = useDispatch()
    const joinedUser = useSelector(({ connection }) => connection.joined)

    const onLogin = async obj => {
        dispatch(joined(obj))

        await socket.emit('ROOM:JOIN', obj)

        const { data } = await axios.get(`/rooms/${obj.roomId}`)
        setUsers(data.users)
    }

    const setUsers = users => {
        dispatch(setUsersDispatch(users))
    }

    const addMessage = message => {
        dispatch(newMessage(message))
    }

    useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers)
        socket.on('ROOM:NEW_MESSAGE', addMessage)
    }, [])

    return (
        <div className="wrapper">
            {!joinedUser ? <JoinBlock onLogin={onLogin} /> : <Chat onAddMessage={addMessage} />}
        </div>
    )
}

export default App
