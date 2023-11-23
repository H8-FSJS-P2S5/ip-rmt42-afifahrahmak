import { useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function AddPost() {
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token")
    const [formData, setData] = useState({
        username: "",
        imgUrl: "",
        description: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...formData, [name]: value }); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({ 
                url: "https://cyto-h8.pramresto.site/comment/add",
                method: "post",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data:
                {
                    username: formData.username,
                    imgUrl: formData.imgUrl,
                    description: formData.description,
                }
            })
            
            toast.success('Successfully Add a NEW Post', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            navigate("/posts");

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

            // console.log(error)
        }
    }

    return (
        <>
            <Form
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </>
    )
}

