import { useEffect, useState } from "react"
import { Navbar } from "../components/navbar"
import Swal from 'sweetalert2'
import axios from "axios"
import { Table } from "../components/table"
import { Link } from "react-router-dom"


export const Discusion = () => {
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

    if (loading) {
        return <Navbar />
    }

    const totalPage = Math.ceil(totalData / 10)
    const totalPageLimit = 5
    const startPage = Math.max(1, currnetPage - Math.floor(totalPageLimit / 2))
    const endPage = Math.min(totalPage, startPage + totalPageLimit - 1)
    const paginationLimit = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
    const start = (currnetPage - 1) * 10
    const last = start + 10
    const currentList = posts.slice(start, last)


    return (
        <>
            <Navbar />
            <div className="mt-3 mx-5 row h-100">
                <div className="d-flex" style={{ gap: "30px" }}>
                    <div className="col-md-3">
                        <div className="container">
                            <div className="py-3 px-2">
                                <select onChange={(e) => setFilter(e.target.value)} className="form-select form-select-sm" aria-label="Default select example">
                                    <option selected disabled>Select Category</option>
                                    {categoryList.map(el => <option value={`${el.id}`}>{el.name}</option>)}
                                </select>
                            </div>
                            <div className="mt-3 pb-4">
                                <input style={{height: "2rem", backgroundColor:"grey"}} value={search} onChange={(e) => setSearch(e.target.value)} id="search" className="form-control form-control-sm" type="search" placeholder="Search" aria-label="Search"></input>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="container">
                            <div>
                                <h5 className="pt-3 text-light" style={{ textAlign: 'center' }}>Discusion</h5>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <select className="d-flex align-items-center ms-2" style={{ color: "grey", backgroundColor: "transparent", borderRadius: "2px" }} onChange={(e) => setSort(e.target.value)}>
                                    <option selected disabled>Sort By</option>
                                    <option value="title">Title</option>
                                    <option value="createdAt">Date</option>
                                </select>
                                <Link to={`/profile/${user.username}`} className="btn btn-warning btn-sm me-2">Add Post</Link>
                            </div>
                            <hr className="my-4 border-2" style={{ margin: "0 40px", color: "yellow" }} />
                            <div className="pb-4 ps-2 pe-2">
                                <div className="list-group">
                                    {posts.map(el => <Table post={el} key={el.id} />)}
                                </div>
                            </div>
                            <div className="pb-3">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <a onClick={() => setCurrentPage(currnetPage - 1)} className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        {paginationLimit.map((page) => (
                                            <li key={page} className={page === currnetPage ? "page-item active" : ""}>
                                                <a onClick={() => setCurrentPage(page)} className="page-link">{page}</a>
                                            </li>
                                        ))}
                                        <li className="page-item">
                                            <a onClick={() => setCurrentPage(currnetPage + 1)} className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}