import { useContext, useEffect, useState } from "react"
import { Navbar } from "../components/navbar"
import { Table } from "../components/table"
import { Link } from "react-router-dom"
import { homeContext } from "../context/homeContext"
import axios from "axios"


export const Home = () => {
    const {posts, setPosts, profile, setProfile, user, setUser} = useContext(homeContext) 
    const [updrade, setUpdrade] = useState(false)

    const handleOnUpgrade = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `http://localhost:3000/payment/${user.id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            window.snap.pay(data.transaction_token, {
                onSuccess: async function () {
                    /* You may add your own implementation here */
                    await axios({
                        method: 'PATCH',
                        url: `http://localhost:3000/${user.id}`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        data: {
                            orderId: data.orderId
                        }
                    })
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    Swal.fire({
                        text: "you closed the popup without finishing the payment",
                        icon: 'warning',
                        confirmButtonText: "Back",
                        confirmButtonColor: "red",
                        customClass: {
                            popup: 'custom-pop-up'
                        }
                    })
                }
            })

            setUpdrade(true)
        } catch (error) {
            Swal.fire({
                text: error.response.data.message,
                icon: 'warning',
                confirmButtonText: "Back",
                confirmButtonColor: "red",
                customClass: {
                    popup: 'custom-pop-up'
                }
            })
        }
    }
    

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row h-100">
                    <div id="carouselExampleAutoplaying" className="carousel slide mx-3 mt-3" data-bs-ride="carousel">
                        <div className="d-flex">
                            <div className="col-md-4" style={{ position: "relative" }}>
                                <div>
                                    <h1 style={{ color: "#ffc100", fontWeight: "bold" }}>Let's go</h1>
                                    <p style={{ color: "white" }}>Discus about anything...</p>
                                </div>
                                <div className={localStorage.getItem('token') ? "position-absolute bottom-0 start-0" : "d-none"}>
                                    <Link to={`/profile/${user.username}`} className="card mb-3" style={{ textDecoration: 'none' }}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={`${profile.imgUrl}`} style={{width: '20rem'}} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{profile.displayName}</h5>
                                                    <p className="card-text"><small style={{ fontSize: '13px' }} className="text-body-light">Status: {profile.status}</small></p>
                                                </div>
                                                <span className={profile.status === 'Free' ? '' : 'd-none'}><button onClick={handleOnUpgrade} className="ms-3 btn btn-sm btn-warning">Upgrade</button></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
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
                        {posts.slice(0, 5).map(el => <Table post={el} key={el.id} />)}
                    </div>
                </div>
            </div>

        </>
    )
}