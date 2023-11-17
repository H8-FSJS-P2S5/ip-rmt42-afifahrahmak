import { useEffect, useState } from "react"
import axios from "axios"
import { Navbar } from "../components/navbar"
import { Card } from "../components/card"

export const GameList = () => {
    const [game, setGame] = useState([])
    const [loading, setLoading] = useState(true)
    const [currnetPage, setCurrentPage] = useState(1)
    const perPage = 12

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
            const { data } = await axios.request(options)
            setGame(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGame()
    }, [])

    if (loading) {
        return (
            <>
                <Navbar />
                <h2 color="white">Loading</h2>
            </>
        )
    }

    const totalPage = Math.ceil(game.length / perPage)
    const totalPageLimit = 5
    const startPage = Math.max(1, currnetPage - Math.floor(totalPageLimit / 2))
    const endPage = Math.min(totalPage, startPage + totalPageLimit - 1)
    const paginationLimit = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
    const start = (currnetPage - 1) * perPage
    const last = start + perPage
    const currentList = game.slice(start, last)

    return (
        <>
            <Navbar />
            <div className="mt-3 mx-5 row h-100">
                <div className="d-flex" style={{ gap: "30px" }}>
                    <div className="col-md-3">
                        <div className="container">
                            <div className="py-3 px-2">
                                <select className="form-select form-select-sm" aria-label="Default select example">
                                    <option selected>Select Platform</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="container">
                            <div>
                                <h5 className="pt-3 text-light" style={{ textAlign: 'center' }}>Free for Play</h5>
                            </div>
                            <div>
                                <select name="" id="">Sort By</select>
                            </div>
                            <hr className="my-4 border-2" style={{ margin: "0 40px", color: "yellow" }} />
                            <div className="pb-3" style={{ margin: "0 50px 20px", display: "flex", flexWrap: "wrap" }}>
                                {currentList.map(el => <Card game={el} key={el.id} />)}
                            </div>
                            <div className="pb-3">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <a onClick={() => setCurrentPage(currnetPage - 1)} className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        {paginationLimit.map((page) => (
                                            <li key={page} className={page === currnetPage ? "page-item active" : ""}>
                                                <a onClick={() => setCurrentPage(page)} className="page-link">{page}</a>
                                            </li>
                                        ))}
                                        <li className="page-item">
                                            <a onClick={() => setCurrentPage(currnetPage + 1)} className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}