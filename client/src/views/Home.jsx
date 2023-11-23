import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';
import Sidebar from "../components/Sidebar";
import { Card } from "../components/Card";
import Navbar from "../components/Navbar";
import { RecipeContext } from "../context/RecipeContext";


export default function Home() {
    const { data, totalPage, page, setPage } = useContext(RecipeContext)

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
                        <div className="row row-cols-2">
                            {data.map((d) => (
                                <div key={d.id} className="container mx-auto mt-4" >
                                    <div className="col-lg-6 mb-4">
                                        <Card recipe={d} />
                                    </div>
                                </div>
                            ))}
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

                        <Sidebar />

                    </div>

                </div>
            </div>
        </>
    )

}