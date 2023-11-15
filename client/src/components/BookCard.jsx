import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { hideLoading, loading, swalFire, toaster } from "../helpers/notification";

export const BookCard = ({ auuthor }) => {

    return (
        <div className="bg-white rounded-xl shadow-lg w-72 relative">
            <Link to={`/`} style={{ textDecoration: 'none' }} className="w-10">
                <div className="grid grid-cols-1 static">
                    <div className="relative group">
                        <img
                            className="w-full h-full object-cover rounded-tl rounded-xl transition-opacity duration-300 ease-in-out group-hover:opacity-70"
                            src='https://plus.unsplash.com/premium_photo-1688645554172-d3aef5f837ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGltYWxheWF8ZW58MHx8MHx8fDA%3D'
                            alt=""
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                        <div className="flex flex-col p-2">
                            <span className="text-white text-xl font-semibold">Halo Dunia</span>
                            <span className="text-white text-md text-slate-400 font-light">Author</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}