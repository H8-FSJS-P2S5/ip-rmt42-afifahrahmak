import { Link } from "react-router-dom"

export const Card = ({ recipe }) => {

    return (
        <div key={recipe.id} className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src={recipe.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <Link to={`/recipe/${recipe.id}`}>
                        <button type="button" className="btn mr-2"><i className="fas fa-link"></i>
                            Read More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )

  
}