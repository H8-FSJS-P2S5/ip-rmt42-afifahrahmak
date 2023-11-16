import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { hideLoading, loading, swalFire, toaster } from "../helpers/notification";
import { useDataContext } from "../context";

export const BookCard = ({ book, status, bookOptions, history }) => {
    const { setExBookIdContext } = useDataContext();

    const handleLinkClick = () => {
        const dataToSend = book.id;
        setExBookIdContext(dataToSend);
    };

    const handleOptionBooks = (e) => {
        e.preventDefault();
        console.log(history.id);
        bookOptions(history.id);

    };
    useEffect(() => {
        console.log(book);
    }, [])
    return (
        <div className="col-span-1 mx-auto">
            <div className="relative bg-white rounded-xl shadow-lg w-auto h-auto div">
                <Link
                    to={status !== 'mybooks' ? '/game' : ''}
                    style={{ textDecoration: 'none' }}
                    className="w-10"
                    onClick={status !== 'mybooks' ? handleLinkClick : (e) => handleOptionBooks(e)}
                >
                    <div className="flex justify-center">
                        <div className="relative group">
                            <img
                                className="h-48 w-36 object-cover rounded-xl transition-opacity duration-300 ease-in-out group-hover:opacity-70"
                                src={book.imgUrl}
                                alt=""
                            />
                        </div>

                    </div>
                </Link>
            </div>
        </div>

    );
}