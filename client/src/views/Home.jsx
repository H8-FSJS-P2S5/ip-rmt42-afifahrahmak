import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import Sidebar from "../components/Sidebar";
import { Card } from "../components/Card";


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
                    url: "http://localhost:3000/recipes",
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

            }
            catch (error) {
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
            <div className="container mx-auto mt-4">

                <div id="sidebar" className="col-md-3 sidebar">
                    <Sidebar
                        search={search} setSearch={setSearch}
                        filter={filter} setFilter={setFilter}
                    /><br></br>
                </div>

                <div className="row">
                    {data.map((d) => (
                        <Card key={d.id} recipe={d} />
                    ))}
                </div>

                <div>
                    <Pagination size="sm" className="mt-4">
                        <Pagination.First onClick={() => setPage(1)} />
                        <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                        <PageNumber />

                        <Pagination.Next onClick={() => setPage(page < totalPage ? page + 1 : totalPage)} />
                        <Pagination.Last onClick={() => setPage(totalPage)} />
                    </Pagination>

                </div>

            </div>
        </>
    )

}