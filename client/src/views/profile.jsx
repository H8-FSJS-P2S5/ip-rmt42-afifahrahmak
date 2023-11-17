import axios from "axios"
import { Navbar } from "../components/navbar"
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Table } from "../components/table"


export const Profile = () => {
    const { username } = useParams()
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [listCategories, setListCategories] = useState([])

    const fetchProfile = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `http://localhost:3000/profile/${username}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setProfile(data)
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
        } finally {
            setLoading(false)
        }
    }

    const handlePost = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios({
                method: 'POST',
                url: 'http://localhost:3000/post/add',
                data: {
                    title,
                    description,
                    CategoryId: +category,
                    status
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            fetchProfile()
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

    useEffect(() => {
        const fetchCategoy = async () => {
            try {
                const { data } = await axios({
                    method: 'GET',
                    url: `http://localhost:3000/categories`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                setListCategories(data)
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
        fetchCategoy()
        fetchProfile()
    }, [])

    if (loading) {
        return (
            <>
                <Navbar />
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="mt-2 mx-5 row h-100">
                <div className="d-flex" style={{ gap: "30px" }}>
                    <div className="col-md-3">
                        <div className="container">
                            <div className="d-flex">
                                <img className="img-thumbnail mt-3 ms-3" src={`${profile.imgUrl}`} alt="profil-image" />
                                <div className="mt-4">
                                    <h6 className="ms-4 mt-2 fst-italic text-secondary" >@{profile.displayName}</h6>
                                    <p className={profile.status === 'Immortal' ? "text-warning ms-4" : "text-secondary ms-4"}>{profile.status}</p>
                                </div>
                            </div>
                            <div style={{ color: 'white' }} className="mt-3 ms-4">
                                <h4><span className="me-2" style={{ fontSize: "15px" }}>Display Name:   </span>{profile.firstName}</h4>
                                <p><span className="me-3">Contact Info: </span> {profile.User.email}</p>
                                <p className="mt-5 pb-3">Post: {profile.User.Posts.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="container">
                            <div className="pt-3">
                                <form onSubmit={handlePost}>
                                    <button type="submit" className="text-light pointer ms-4 me-3 mb-3" style={{ backgroundColor: 'transparent', border: "none" }}><img width="17" height="17" src="https://img.icons8.com/pastel-glyph/64/FFFFFF/pencil--v2.png" alt="pencil--v2" /> post</button>
                                    <div className="input-group input-group-sm mb-3 mx-3 pe-4">
                                        <span className="input-group-text" style={{ backgroundColor: "black", border: "none" }} id="basic-addon1"><select onChange={(e) => setCategory(e.target.value)} class="form-select" aria-label="Default select example">
                                            <option selected disabled>Select Category</option>
                                            {listCategories.map(el => <option value={`${el.id}`}>{el.name}</option>)}
                                        </select></span>
                                        <input onChange={(e) => setTitle(e.target.value)} style={{ borderRadius: "10px", backgroundColor: "grey" }} type="text" className="form-control me-2" placeholder="Title" aria-label="Username" aria-describedby="basic-addon1" />
                                        <input onChange={(e) => setDescription(e.target.value)} style={{ borderRadius: "10px", backgroundColor: "grey" }} type="text" className="form-control" placeholder="Text Something..." aria-label="Username" aria-describedby="basic-addon1" />
                                        <span className="input-group-text" style={{ backgroundColor: "black", border: "none" }} id="basic-addon1"><select onChange={(e) => setStatus(e.target.value)} class="form-select" aria-label="Default select example">
                                            <option selected disabled>Select Status</option>
                                            <option value="Free">Free</option>
                                            <option value="Immortal">Immortal</option>
                                        </select></span>
                                    </div>
                                </form>
                            </div>
                            <hr className="my-4 border-2" style={{ margin: "0 40px", color: "yellow" }} />
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="text-light pt-3 ms-3 d-flex align-items-center">Post</h4>
                            </div>
                            <div className="pb-4 ps-2 pe-2">
                                <div className="list-group">
                                    {profile.User.Posts.slice(0, 5).map(el => <Table post={el} key={el.id} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}