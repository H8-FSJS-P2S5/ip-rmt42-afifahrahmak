import { useEffect, useState } from "react"
import MusicKitCard from "../components/MusicKitCard"
import axios from "axios"
import { useMusicKitContext } from "../context/MusicKitContext"


function HomePage () {
    const {musicKits, setMusicKits} = useMusicKitContext()
    
    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:3000/musicKits",
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((result) => {
            setMusicKits(result.data)
        })
        .catch(console.log)
    }, [])
    
    if(!musicKits.length) {
        return <span>Empty Data</span>
    }

    return (
        <>
            <div className="dust2-left-bg">
                <div className="flex-wrap" style={{justifyContent: "center", paddingTop: "3%"}}>
                    {musicKits.map(musicKit => {
                        return <MusicKitCard
                            key = {musicKit.id}
                            musicKit = {musicKit}
                            page = {"home"}
                        />                      
                    })}
                </div>
            </div>
        </>
    )
}

export default HomePage