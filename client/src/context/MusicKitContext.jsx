import { createContext, useContext, useState } from "react";

const MusicKitContext = createContext()

export const MusicKitProvider = ({children}) => {
    const [musicKits, setMusicKits] = useState([])

    return (
        <MusicKitContext.Provider value={{musicKits, setMusicKits}}>
            {children}
        </MusicKitContext.Provider>
    )
}

export const useMusicKitContext = () => {
    return useContext(MusicKitContext)
}