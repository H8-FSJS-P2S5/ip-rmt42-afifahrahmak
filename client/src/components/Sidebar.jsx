import { useContext } from "react"
import { RecipeContext } from "../context/RecipeContext"

export default function Sidebar() {

    const { search, setSearch, filter, setFilter } = useContext(RecipeContext)

    return (
        <>
            <div className="card mb-4">
                <div className="card-header">Search</div>
                <div className="card-body">

                    <div className="input-group">
                        <input id="search-name" name="search" type="text" value={search}
                            className="form-control" placeholder="Search by Name"
                            onChange={(e) => setSearch(e.target.value)} />
                    </div>

                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header">Ingredients</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">


                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.defaultValue)} type="checkbox"
                                    defaultValue={"Butter"} id="Butter" />
                                <label className="form-check-label" htmlFor="Butter">
                                    Butter
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) =>{console.log(e.target.defaultValue); setFilter(e.target.defaultValue)}} type="checkbox"
                                    defaultValue={"Almond Milk"} id="AlmondMilk" />
                                <label className="form-check-label" htmlFor="AlmondMilk">
                                    Almond Milk
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.defaultValue)} type="checkbox"
                                    defaultValue={"Olive Oil"} id="OliveOil" />
                                <label className="form-check-label" htmlFor="Olive Oil">
                                    Olive Oil
                                </label>
                            </div>


                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.defaultValue)} type="checkbox"
                                    defaultValue={"Peanut Butter"} id="PeanutButter" />
                                <label className="form-check-label" htmlFor="PeanutButter">
                                    Peanut Butter
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.defaultValue)} type="checkbox"
                                    defaultValue={"Chicken"} id="Chicken" />
                                <label className="form-check-label" htmlFor="Chicken">
                                    Chicken
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.defaultValue)} type="checkbox"
                                    defaultValue={"Egg"} id="Egg" />
                                <label className="form-check-label" htmlFor="Egg">
                                    Egg
                                </label>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}