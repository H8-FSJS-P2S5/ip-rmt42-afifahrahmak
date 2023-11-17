import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { toast } from 'react-toastify';
import axios from "axios";

export default function EditPost() {

    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token")
    const [formData, setData] = useState({
        username: "",
        imgUrl: "",
        description: ""
    })


    const fetchData = async () => {
        try {
            const { data } = await axios({
                url: `https://cyto-h8.pramresto.site/comment/${id}`,   //wait
                method: "get",
                headers: {
                    Authorization: `Bearer ${token}`
                },
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

            // console.log(error)
        }
    }


    useEffect(() => {
        fetchData()
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...formData, [name]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios({ 
                url: `https://cyto-h8.pramresto.site/comment/edit/${id}`,
                method: "put",
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
            fetchData(data);
            toast.success('Successfully EDIT a Post', {
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

            console.log(error)
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