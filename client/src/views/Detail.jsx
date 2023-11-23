import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { InlineReactionButtons } from 'sharethis-reactjs';
import { Spinner } from 'react-bootstrap';
import Navbar from "../components/Navbar";

export default function Detail() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios({
                    url: `https://cyto-h8.pramresto.site/recipe/${id}`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setData(data)
                setLoading(false);
                console.log(data)
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
                setLoading(false);
                console.log({ response })
            }
        }
        fetchData()
    }, [])


    return (
        <>
        <Navbar />
            {loading ? (
                // <p>Loading...</p>
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}>
                    <Spinner animation="border" role="status"
                        style={{ width: '5rem', height: '5rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    <section id="detail-page" className="py-5">
                        <div className="container px-4 px-lg-5 my-5">
                            <div className="row gx-4 gx-lg-5 align-items-center">
                                <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0"
                                    src={data.image}
                                    alt={data.name} /></div>
                                <div className="col-md-6">
                                    <h2 className="display-5 fw-bolder">{data.name}</h2>
                                    <div>
                                        <div className="fs-5 mb-5 mt-3">
                                            <span>Preparation Time: {data.prepareTime}</span><br></br>
                                            <span>Cooking Time: {data.cookTime}</span>
                                        </div>
                                        <p className="lead">{data.description}</p>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="align-items-center ms-5 me-5">
                            <article>
                                <section className="mb-5">
                                    <h3 className="fw-bolder mb-1">Ingredients:</h3><br></br>
                                    {data.ingredients.map((i, index) => (
                                        <p key={index} className="lead">{++index}. {i}</p>
                                    ))}
                                </section>

                                <section className="mb-5">
                                    <h3 className="fw-bolder mb-4 mt-5">Steps:</h3>
                                    {data.steps.map((i, index) => (
                                        <p key={index} className="lead">{++index}. {i}</p>
                                    ))}
                                </section>

                            </article>

                        </div>
                    </section>


                    <InlineReactionButtons
                        config={{
                            alignment: 'center',  // alignment of buttons (left, center, right)
                            enabled: true,        // show/hide buttons (true, false)
                            language: 'en',       // which language to use (see LANGUAGES)
                            min_count: 0,         // hide react counts less than min_count (INTEGER)
                            padding: 12,          // padding within buttons (INTEGER)
                            reactions: [          // which reactions to include (see REACTIONS)
                                'slight_smile',
                                'heart_eyes',
                                'laughing',
                                'astonished',
                                'sob',
                                'rage'
                            ],
                            size: 48,             // the size of each button (INTEGER)
                            spacing: 8,           // the spacing between buttons (INTEGER)


                            // OPTIONAL PARAMETERS

                            url: `http://localhost:3000/recipe/${id}` // (defaults to current url)
                        }}
                    />
                    <br></br>
                </>
            )}

        </>
    )


}