export const joined = obj => ({
    type: 'JOINED',
    payload: obj,
})

export const setUsers = users => ({
    type: 'SET_USERS',
    payload: users
})

export const newMessage = messages => ({
    type: 'NEW_MESSAGE',
    payload: messages
})