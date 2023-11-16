import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { hideLoading, loading, swalFire, toaster } from "../helpers/notification";

export const BookCard = ({ book }) => {
    return (
        <div className="col-span-1 mx-auto">
        <div className="bg-white rounded-xl shadow-lg w-auto h-auto div">
            <Link to={`/`} style={{ textDecoration: 'none' }} className="w-10">
                <div className="flex justify-center static">
                    <div className="relative group">
                        <img
                            className="h-48 w-36 object-cover rounded-xl transition-opacity duration-300 ease-in-out group-hover:opacity-70"
                            src={book.imgUrl}
                            alt=""
                        />
                    </div>
                    {/* <div className="absolute bottom-0 left-0 p-4">
                        <div className="flex flex-col p-2">
                            <span className="text-white text-xl font-semibold">{book.title}</span>
                            <span className="text-white text-md text-slate-300 font-light">{book.author}</span>
                        </div>
                    </div> */}
                </div>
            </Link>
        </div>
        </div>
    );
}