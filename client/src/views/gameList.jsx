import { useState } from "react"
import axios from "axios"

export const GameList = () => {
    const [game, setGame] = useState([])

    const fetchGame = async () => {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_REACT_APP_X_RAPID_API_KEY,
              'X-RapidAPI-Host': import.meta.env.VITE_REACT_APP_X_RAPID_API_HOST
            }
          };

        try {
            const {data} = await axios.request(options)
            setGame(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        
        </>
    )
}