import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import Sidebar from "../components/Sidebar";
import { Card } from "../components/Card";
import Navbar from "../components/Navbar";


export default function Home() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const token = localStorage.getItem("access_token");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: result } = await axios({
                    url: "https://cyto-h8.pramresto.site/recipes",
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        search,
                        filter,
                        page
                    }
                })

                let { results, totalPage, total } = result
                setTotalPage(totalPage)
                setData(results)
                console.log(results)

            }
            catch ({ response }) {
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
        }
        fetchData()
    }, [search, filter, page])


    const PageNumber = () => {
        let result = []
        for (let number = 1; number <= totalPage; number++) {
            result.push(
                <Pagination.Item onClick={() => setPage(number)} key={number} active={number === page}>
                    {number}
                </Pagination.Item>
            )
        }
        return result
    }

    return (
        <>
            <Navbar />
            <header className="py-5 bg-light border-bottom mb-4">
                <div className="container">
                    <div className="text-center my-5">
                        <h1 className="fw-bolder">Welcome to CYTO!</h1>
                        <p className="lead mb-0">Whether you are an experienced home cook or a beginner
                            looking to explore the culinary world, this website is designed to cater to your every need.
                        </p>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row">

                    <div className="col-lg-8">
                        <div className="row">
                            <div className="container mx-auto mt-4" >
                                <div className="card mb-4 flex">
                                    {data.map((d) => (
                                        <Card key={d.id} recipe={d} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="pagination justify-content-center my-4">
                            <Pagination size="lg" className="mt-4">
                                <Pagination.First onClick={() => setPage(1)} />
                                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                                <PageNumber />

                                <Pagination.Next onClick={() => setPage(page < totalPage ? page + 1 : totalPage)} />
                                <Pagination.Last onClick={() => setPage(totalPage)} />
                            </Pagination>
                        </div>

                    </div>

                    <div className="col-lg-4">

                        <Sidebar
                            search={search} setSearch={setSearch}
                            filter={filter} setFilter={setFilter}
                        />

                    </div>

                </div>
            </div>
        </>
    )

}