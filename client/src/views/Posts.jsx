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
        <>

  
        </>
    )
}