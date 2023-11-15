import { useEffect, useState } from "react"
import { Navbar } from "../components/navbar"
import { Table } from "../components/table"
import axios from 'axios'

export const Home = () => {
    const [posts, setPosts] = useState([])

    const fetchPost = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: 'http://localhost:3000/posts'
            })

            let random = data.data.sort(() => Math.random() - 0.5)

            setPosts(random)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row h-100">
                    <div id="carouselExampleAutoplaying" className="carousel slide mx-3 mt-3" data-bs-ride="carousel">
                        <div className="d-flex">
                            <div className="col-md-4">
                                <h1 style={{ color: "#ffc100", fontWeight: "bold" }}>Let's go</h1>
                                <p style={{ color: "white" }}>Discus about anything...</p>
                            </div>
                            <div className="col-md-8 me-3">
                                <div className="carousel-inner mb-3 pe-3">
                                    <div className="carousel-item active">
                                        <img src="https://i.imgur.com/Zmxio2G.jpg" className="d-block w-100" alt="overwatch" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5 style={{ fontWeight: "bold" }}>Overwatch 2</h5>
                                            <p>Team up with friends regardless of platform and jump into the reimagined PvP experience.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://i.imgur.com/IGzvjRV.jpg" className="d-block w-100" alt="dota2" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5 style={{ fontWeight: "bold" }}>Dota 2</h5>
                                            <p>A Modern Multiplayer Masterpeace.</p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://i.imgur.com/E78rIt6.jpg" className="d-block w-100" alt="genshin" />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5 style={{ fontWeight: "bold" }}>Genshin Impact</h5>
                                            <p>Teach The Weeboo Save the World.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row h-100">
                    <h5 className="m-3" style={{ color: "white" }}>Random Topics</h5>
                </div>
                <div className="pb-4 ps-2 pe-2"> 
                    <div className="list-group">
                        {posts.slice(0, 5).map(el => <Table post={el} key={el.id}/>)}    
                    </div>
                </div>
            </div>

        </>
    )
}