const axios = require('axios')
const {Game} = require('../models')

class GameController{
    static async createGame(req, res, next) {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            headers: {
              'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
              'X-RapidAPI-Host': process.env.X_RapidAPI_Host
            }
          };

        try {
            const games = await axios.request(options);
            
            
            const created = games.data.map( async el => {
                return await Game.create(el)
            })

            res.status(201).json(created)
        } catch (error) {
            console.log(error)
        }
    }

    static async games(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = GameController