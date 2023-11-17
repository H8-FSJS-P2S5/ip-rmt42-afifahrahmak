import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Posts() {

    const [data, setData] = useState([]);
    const token = localStorage.getItem("access_token")


    const fetchData = async () => {
        try {
            const { data } = await axios.get("https://cyto-h8.pramresto.site/comment/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

            setData(data)

        } catch ({ response }) {

            toast.error(response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            //   console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://resto-server-h8.pramresto.site/cuisines/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            console.log(id)
            fetchData()

            toast.success('Successfully DELETE Post', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        } catch ({ response }) {

            toast.error(response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.log({ response })
        }
    };

    return (
        <>
            <Navbar />

            <div>
                {data.map((d) => (
                    <div key={d.id} class="container px-4 px-lg-5">
                        <div class="row gx-4 gx-lg-5 align-items-center my-5">
                            <div class="col-lg-7"><img class="img-fluid rounded mb-4 mb-lg-0" src={d.imgUrl} alt="..." /></div>
                            <div class="col-lg-5">
                                <h3 class="font-weight-light">Posted by: {d.username}</h3>
                                <p>{d.description}</p>
                                <li className="m-3">
                                    <Link to={`/post/edit/${d.id}`}>
                                        <span className="table-edit">
                                            <button id="edit-image-button" type="button" className="btn btn-warning">
                                                Edit
                                            </button>
                                        </span>
                                    </Link><br />
                                </li>
                                <li className="m-3">
                                    <span className="table-remove"><button onClick={() => handleDelete(d.id)} id="remove-button" type="button"
                                        className="btn btn-danger flex-shrink-0">
                                        Delete
                                    </button></span>
                                </li>
                            </div>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}