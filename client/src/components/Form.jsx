import { Link } from "react-router-dom";


export default function Form({ formData, onChange, onSubmit }) {

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Write Your Post!</p>

                                        <form onSubmit={onSubmit} className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="imgUrl">IMAGE</label>
                                                    <input onChange={onChange} type="text" id="imgUrl" 
                                                    name="imgUrl" className="form-control" defaultValue={formData.imgUrl}/>
                                                </div>
                                            </div>
                                            
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="username">Username</label>
                                                    <input onChange={onChange} type="text" id="username" 
                                                    name="username" className="form-control" defaultValue={formData.username}/>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="description">Description</label>
                                                    <textarea onChange={onChange} id="description" name="description" 
                                                    className="form-control" defaultValue={formData.description}></textarea>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                <Link to={"/posts"}>
                                                    <button type="button" className="btn btn-primary btn-lg ms-5">Cancel</button>
                                                </Link>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://sg.sodexo.com/files/live/sites/com-sg/files/Images/inspired%20thinking/food%20across%20cultures.png"
                                            className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

