import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { InlineReactionButtons } from 'sharethis-reactjs';

export default function Detail() {
    const { id } = useParams();
    const [data, setData] = useState({});
    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios({
                    url: `http://localhost:3000/recipe/${id}`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setData(data)

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

                console.log({ response })
            }
        }
        fetchData()
    }, [])


    return (
        <>
            <section id="detail-page" className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0"
                            src={data.image}
                            alt={data.name} /></div>
                        <div className="col-md-6">
                            <h2 className="display-5 fw-bolder">{data.name}</h2>
                            <div className="fs-5 mb-5">

                                {data.description.map((d, index) => (
                                <span>{++index. d}</span>
                                    ))}

                            </div>
                            <p className="lead">{data.steps}</p>
                        </div>
                    </div>
                </div>


                <div className="align-items-center ms-5 me-5">
                    <article>

                        <header class="mb-4">

                            <h1 class="fw-bolder mb-1">Welcome to Blog Post!</h1>

                        </header>

                        <section class="mb-5">
                            <p class="fs-5 mb-4">Science is an enterprise that should be cherished as an activity of the free human mind. Because it transforms who we are, how we live, and it gives us an understanding of our place in the universe.</p>
                            

                            <h2 class="fw-bolder mb-4 mt-5">I have odd cosmic thoughts every day</h2>
                            <p class="fs-5 mb-4">For me, the most fascinating interface is Twitter. I have odd cosmic thoughts every day and I realized I could hold them to myself or share them with people who might be interested.</p>
                            
                        </section>
                    </article>


                    <section class="mb-5">
                        <div class="card bg-light">
                            <div class="card-body">

                                <form class="mb-4"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>


                                <div class="d-flex mb-4">


                                    <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div class="ms-3">
                                        <div class="fw-bold">Commenter Name</div>
                                        If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.


                                        <div class="d-flex mt-4">
                                            <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div class="ms-3">
                                                <div class="fw-bold">Commenter Name</div>
                                                And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                                            </div>
                                        </div>


                                        <div class="d-flex mt-4">
                                            <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div class="ms-3">
                                                <div class="fw-bold">Commenter Name</div>
                                                When you put money directly to a problem, it makes a good headline.
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </section>
                </div>
            </section>


            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-8">


                    </div>
                </div>
            </div>


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
    )


}