import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
import { hideLoading, loading, swalFire, toaster } from "../helpers/notification";
import { GoogleLogin } from '@react-oauth/google';

export const GameCard = ({ questions, currentIdx, addAnswer, changeCurrentIdx }) => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();

        addAnswer(answer);
        changeCurrentIdx(currentIdx + 1);
        setAnswer('');

    }
    return (
        <div className="bg-white rounded-xl shadow-lg w-1/2 h-3/5">
            <div className="row">
                <div className="col-1/6">
                    <div className="justify-center text-center p-4">
                        <h1 className="text-3xl italic hover:not-italic font-semibold text-indigo-600 underline decoration-indigo-500/30">Let's Start!</h1>


                    </div>

                </div>
                <div className="col-5/6">
                    <form onSubmit={handleOnSubmit} className=" pb-0 pl-8 pr-8">
                        <div className="text-left ">
                            <div>
                                <span>
                                    Pertanyaan {currentIdx + 1} :
                                </span>
                                <div className="mt-2 text-md text-gray-500 italic">
                                    {questions[currentIdx]}
                                </div>
                            </div>
                            <div className="mt-8">

                                <label htmlFor="name" className="block text-md font-medium leading-6 text-sky-800 italic">Jawaban :</label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        id="name"
                                        className="block w-full rounded-md border-0 py-1.5 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-sky-50"
                                        placeholder="Jawabanmu di sini ..."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="justify-center flex items-center mt-6 mb-3">
                            {answer !== '' && <button type="submit" className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:bg-gradient-to-l from-sky-500 to-indigo-500 rounded-md w-1/2 h-8 flex items-center justify-center">
                                <span className="text-white">Next</span>
                            </button>}

                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}