import { useNavigate, useParams } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import axios from "axios"


export const DetailPost = () => {
    const { postId } = useParams()
    const [post, setPost] = useState([])
    const [comment, setComment] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchPost = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `http://localhost:3000/post/${postId}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPost(data)
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

    const handleComment = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios({
                method: 'POST',
                url: `http://localhost:3000/post/${postId}/comment`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    comment
                }
            })

            fetchPost()
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
        if(!localStorage.getItem('token')) {
            navigate('/login')
        }
        fetchPost()
    }, [])


    if (loading) {
        return (
            <>
                <Navbar />
                <h2>Loading....</h2>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row h-100">
                    <div>
                        <div className="card border-secondary mt-3 mb-3" style={{ maxWidth: "100rem", borderRadius: "10px" }}>
                            <div className="card-header" style={{ fontSize: "20px" }}>
                                <img className="image-profile" src={`${post.User.Profile.imgUrl}`} alt="profile image" />
                                {post.User.Profile.displayName}
                            </div>
                            <hr className="mt-3 border-2" style={{ margin: "0 40px", color: "white" }} />
                            <div className="card-body text-secondary">
                                <h5 className="card-title text-light">{post.title}</h5>
                                <p className="card-text">{post.description}</p>
                            </div>
                        </div>
                        <div>
                            <p className="ms-3" style={{ color: 'white' }}>Comments :</p>
                            {post.Comments.map(el => (
                                <div key={el.id} className="card border-secondary ms-5 mt-3 mb-3" style={{ maxWidth: "100rem", borderRadius: "10px" }}>
                                    <div className="card-header" style={{ fontSize: "15px" }}>
                                        <img className="image-profile-comment" src={`${el.User.Profile.imgUrl}`} alt="profile image" />
                                        {el.User.Profile.displayName}
                                    </div>
                                    <hr className="mt-1 border-2" style={{ margin: "0 40px", color: "white" }} />
                                    <div className="card-body text-secondary">
                                        <p className="card-text">{el.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleComment}>
                            <div className="input-group mt-4 mb-3 ps-5 pe-2">
                                <input onChange={(e) => setComment(e.target.value)} type="text" className="form-control" placeholder="Leave a comment..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <input className="btn btn-warning" type="submit" value={"send"} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}