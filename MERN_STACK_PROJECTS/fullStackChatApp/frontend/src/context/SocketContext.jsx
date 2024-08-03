import { useState, useEffect, useContext, createContext } from 'react'
import {useAuthContext} from './AuthContext'
import {io} from 'socket.io-client'

export const SocketContext = createContext()

export const useSocketContext = ()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children})=>{
    const [socket, setSocket] = useState(null)  
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser} = useAuthContext()

    useEffect(()=>{
        if(authUser){
            const socket = io('http://localhost:8080',{
                query: {
                    userId: authUser._id,
                }
            })

            setSocket(socket);

            // get onlineUsers from socket (backend)
            socket.on("getOnlineUsers",(onlineusers)=>{
                setOnlineUsers(onlineusers);
            })

            // cleanup
            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext
