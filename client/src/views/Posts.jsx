import { useEffect, useState } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';


export default function Post() {

    const [data, setData] = useState([]);
    const token = localStorage.getItem("access_token")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/comment/",
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

        fetchData()

    }, [])


    return (
        <div>
            <div class="container px-4 px-lg-5">

                <div class="row gx-4 gx-lg-5 align-items-center my-5">
                    <div class="col-lg-7"><img class="img-fluid rounded mb-4 mb-lg-0" src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg" alt="..." /></div>
                    <div class="col-lg-5">
                        <h1 class="font-weight-light">Business Name or Tagline</h1>
                        <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
                        <a class="btn btn-primary" href="#!">Call to Action!</a>
                    </div>
                </div>
                
            </div>
        </div >
    )
}