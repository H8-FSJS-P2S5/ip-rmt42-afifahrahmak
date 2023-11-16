// import axios from "axios";
import axios from "../../helpers/axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import 'animate.css';
// import Swal from "sweetalert2";
import { BookCard } from "../../components/BookCard";
import { SideBar } from "../../components/Sidebar";
import { SearchBar } from "../../components/SearchBar";
import { hideLoading, swalFire } from "../../helpers/notification";

export const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [searchKey, setSearchKey] = useState();
    // const [page, setPage] = useState(1);
    // const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const changeSearchKey = (value) => {
        setSearchKey(value);
    }

    const fetchBooks = async () => {

        setLoading(true);
        let q = ''

        if (searchKey !== '' && typeof searchKey !== 'undefined') {
            q = `q=${searchKey}&&`;
        };

        try {
            const { data } = await axios({
                url: `/books?${q}`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });

            setBooks(data.books);
            setLoading(false);
        } catch (error) {
            let msg = null;
            if (error.status !== 400) msg = error.response.data.message;
            else msg = error.response.data.message[0];
            swalFire('Failed', msg, 'error');
        } finally {
            hideLoading();
        }
    }


    useEffect(() => {
        fetchBooks();

    }, [searchKey]);

    if (loading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center" style={{ marginTop: '15%' }}>
                <h1 className="animate__animated animate__bounce animate__infinite mb-96 mt-0 text-6xl">Loading ...</h1>
            </div>
        );
    }


    return (
        <section id="home">
            <section className="product_section">
                <div className="flex flex-row">
                    {/* <div className="w-1/6"> */}
                        {/* <FilterMenu filterBy={filter} sortBy={sort} changeFilter={changeFilter} changeSorting={changeSorting} /> */}
                        <SideBar />
                    {/* </div> */}
                    <div className="w-5/6">
                        <section className="welcoming_text">
                            <div className="text-center mt-8">
                                <h1>
                                    <Link to="#" className=" text-decoration-none">
                                        <span className=" font-bold text-4xl  text-indigo-700">Welcome to AA Restaurant!</span>
                                    </Link>
                                </h1>
                            </div>
                            <SearchBar changeSearchKey={changeSearchKey} />

                        </section>
                        <div className="grid grid-cols-8 gap-4 justify-center mr-4 ml-4" id="books-display" style={{ paddingTop: '26px' }}>
                            {
                                books.length > 0 ? (
                                    books.map((el, index) => (
                                        <BookCard key={index} book={el} />
                                    ))
                                ) : (
                                    <h1 className="col-span-8 text-center">Buku tidak dapat ditemukan</h1>
                                )
                            }
                        </div>
                        <div className="flex flex-row flex-wrap justify-center pagination_section mb-4 gap-2">
                            {/* Pagination content goes here */}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}