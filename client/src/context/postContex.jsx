import { createContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Navbar } from "../components/navbar";
import axios from "axios";

export const postContext = createContext()

export const PostContexProvide = ({chindren}) => {
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPages] = useState('')
    const [totalData, setTotalData] = useState('')
    const [currnetPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [user, setUser] = useState([])

    const [categoryList, setCategoryList] = useState([])

    const fetchPost = async () => {
        try {
            if (localStorage.getItem('token')) {
                const { data } = await axios({
                    method: 'GET',
                    url: `http://localhost:3000/posts?category=${filter}&sortBy=${sort}&search=${search}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setPosts(data.data)
                setUser(data.user)
                setTotalData(data.totalData)
                setTotalPages(data.totalPage)
            } else {
                const { data } = await axios({
                    method: 'GET',
                    url: `http://localhost:3000/pub/posts?category=${filter}&sortBy=${sort}&search=${search}`
                })
                setPosts(data.data)
                setTotalData(data.totalData)
                setTotalPages(data.totalPage)
            }
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

                setCategoryList(data)
            } catch (error) {
                console.log(error)
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
        fetchPost()
    }, [filter, sort, search])

    // if (loading) {
    //     return <Navbar />
    // }

    return (
        <postContext.Provider 
            value={{categoryList, setCategoryList, user, setUser,search, setSearch, sort, setSort ,filter, setFilter ,loading, setLoading, currnetPage, setCurrentPage, posts, setPosts, totalPages, setTotalPages, totalData, setTotalData }}
        >
            {chindren}
        </postContext.Provider>
        )
}