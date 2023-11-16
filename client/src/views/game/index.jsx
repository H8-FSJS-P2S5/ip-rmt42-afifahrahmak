// import axios from "axios";
import axios from "../../helpers/axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import 'animate.css';
import Swal from "sweetalert2";
import { BookCard } from "../../components/BookCard";
import { SideBar } from "../../components/Sidebar";
import { SearchBar } from "../../components/SearchBar";
import { hideLoading, swalFire } from "../../helpers/notification";
import { GameCard } from "../../components/GameCard";
import { useDataContext } from "../../context";

export const GamePage = () => {
    const navigate = useNavigate();
    const [questions, setBooks] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [loading, setLoading] = useState(false);
    const [historyId, setHistoryId] = useState('');
    const [bookId, setBookId] = useState('');
    const { exBookId } = useDataContext();

    const q = [
        'ini pertanyaan 1', 'ini pertanyaan 2', 'kalo ini p 3', 'ini p4 ygy', 'ini pertanyaan ke 5'
    ]
    const addAnswer = (val) => {
        let ans = [...answer];
        ans.push(val);
        setAnswer(ans);
    }

    const postAnswer = async () => {
        setLoading(true);
        try {
            const { data } = await axios({
                url: `/histories/${historyId}`,
                method: 'put',
                data: { answer: answer },
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });

            setLoading(false);
            setBooks([]);
            setAnswer([]);
            setCurrentIdx([]);
            setHistoryId([]);
            const existingBookId = bookId;
            let msg = 'Kamu berhasil mendapatkan hadiah buku!';
            if (existingBookId !== '' || existingBookId !== null) msg = `Kamu berhasil mendapatkan hadiah buku yang telah kamu pilih!`
            if (data.data >= 80) {
                hideLoading();
                Swal.fire({
                    title: "Congratulations!",
                    text: `${msg}`,
                    imageUrl: 'https://cdn-icons-png.flaticon.com/512/4471/4471307.png',
                    imageWidth: 260,
                    imageHeight: 200,
                    imageAlt: "Custom image"
                }).then(() => {
                    if (bookId) {

                        return Swal.fire({
                            title: "Diterima!",
                            text: "Hadiah berhasil diterima :)",
                            icon: "success",
                            showCancelButton: false,
                            allowEnterKey: false,
                            allowEscapeKey: false,
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                setLoading(false);
                                setBooks([]);
                                setAnswer([]);
                                setCurrentIdx([]);
                                setHistoryId([]);
                                navigate('/');
                            }
                        });

                    } else {
                        return Swal.fire({
                            title: "Deskripsikan buku yang kamu inginkan!",
                            input: "text",
                            inputAttributes: {
                                autocapitalize: "off"
                            },
                            showCancelButton: false,
                            confirmButtonText: "Kirim",
                            showLoaderOnConfirm: true,
                            preConfirm: async (input) => {
                                try {
                                    const { data } = await axios({
                                        url: `/books`,
                                        method: 'post',
                                        data: { desc: input },
                                        headers: {
                                            Authorization: `Bearer ` + localStorage.getItem('access_token')
                                        }
                                    });
                                    setBookId(data.data.id);
                                    const bookId = data.data.id;
                                    Swal.fire({
                                        title: "Apakah Anda akan menerima hadiahnya?",
                                        text: `Buku Anda dapat ditemukan, buku berjudul ${data.data.title}`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Ya",
                                        cancelButtonText: "Tidak",
                                        reverseButtons: true
                                    }).then(async (result) => {
                                        if (result.isConfirmed) {
                                            try {
                                                await axios({
                                                    url: `/histories/${historyId}/books/${bookId}`,
                                                    method: 'patch',
                                                    headers: {
                                                        Authorization: `Bearer ` + localStorage.getItem('access_token')
                                                    }
                                                });

                                                Swal.fire({
                                                    title: "Diterima!",
                                                    text: "Hadiah berhasil diterima :)",
                                                    icon: "success",
                                                    showCancelButton: false,
                                                    allowEnterKey: false,
                                                    allowEscapeKey: false,
                                                    allowOutsideClick: false
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        setLoading(false);
                                                        setBooks([]);
                                                        setAnswer([]);
                                                        setCurrentIdx([]);
                                                        setHistoryId([]);
                                                        navigate('/');
                                                    }
                                                });
                                            } catch (error) {
                                                console.log(error);
                                                Swal.fire({
                                                    title: "Cancelled",
                                                    text: "Anda sudah memiliki bukunya sebelumnya",
                                                    icon: "error"
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        setLoading(false);
                                                        setBooks([]);
                                                        setAnswer([]);
                                                        setCurrentIdx([]);
                                                        setHistoryId([]);
                                                        navigate('/');
                                                    }
                                                });
                                            }


                                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                                            // Correct placement of navigate function

                                            Swal.fire({
                                                title: "Cancelled",
                                                text: "Hadiah berhasil ditolak :(",
                                                icon: "error"
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    setLoading(false);
                                                    setBooks([]);
                                                    setAnswer([]);
                                                    setCurrentIdx([]);
                                                    setHistoryId([]);
                                                    navigate('/');
                                                }
                                            });
                                        }
                                    });


                                } catch (error) {
                                    Swal.showValidationMessage(`
                                            Request failed: 'Mohon maaf buku tidak dapat ditemukan :('
                                        `);
                                }
                            },
                            // allowOutsideClick: () => !Swal.isLoading()
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: "Try Again!",
                    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3220/3220630.png',
                    imageWidth: 260,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    text: `Mohon maaf, nilai Anda ${data.data} dan belum mencukupi nilai batas untuk mendapatkan hadiah :(`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false);
                        setBooks([]);
                        setAnswer([]);
                        setCurrentIdx([]);
                        setHistoryId([]);
                        navigate('/');
                    }
                });
            }

        } catch (error) {
            let msg = null;
            console.log(error)
            Swal.fire({
                title: "Cancelled",
                text: "Mohon maaf, kesalahan sistem",
                icon: "error"
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(false);
                    setBooks([]);
                    setAnswer([]);
                    setCurrentIdx([]);
                    setHistoryId([]);
                    navigate('/');
                }
            });
        } finally {
            hideLoading();
        }
    }

    const changeCurrentIdx = (val) => {
        setCurrentIdx(val);
    }

    const fetchQuestions = async () => {
        setLoading(true);

        try {

            const { data } = await axios({
                url: `/histories`,
                method: 'post',
                data: { bookId: exBookId },
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem('access_token')
                }
            });
            if (data.data.questions.length < 5) fetchQuestions();
            else {
                setBooks(data.data.questions);
                setHistoryId(data.data.historyId);
                setLoading(false);
            }
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
        if (answer.length === 5) postAnswer();
        console.log('ini di use effect ans')
    }, [answer]);

    useEffect(() => {
        console.log('ini di use effect biasa')
        if (exBookId && exBookId !== '') setBookId(exBookId);
        fetchQuestions();
    }, []);

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
                                        <span className=" font-bold text-4xl  text-indigo-700">Welcome to The Game!</span>
                                    </Link>
                                </h1>
                            </div>

                            {/* <div className="bg-orange-400" onClick={postAnswer}>
                                ini test
                            </div> */}
                        </section>
                        <div className="mx-16 items-center flex justify-center h-5/6">


                            <GameCard questions={questions} currentIdx={currentIdx} addAnswer={addAnswer} changeCurrentIdx={changeCurrentIdx} />


                        </div>

                    </div>
                </div>
            </section>
        </section>
    );
}