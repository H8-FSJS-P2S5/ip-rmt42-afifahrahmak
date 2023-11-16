export default function Sidebar({ search, setSearch, filter, setFilter }) {



    return (
        <>
            <div className="card mb-4">
                <div className="card-header">Search</div>
                <div className="card-body">

                    <div className="input-group">
                        <input id="search-name" name="search" type="text" value={search}

                            className="form-control" placeholder="Search by Name" />
                        <button onSubmit={(e) => setSearch(e.target.value)} className="btn btn-primary" id="button-search" type="submit">Go!</button>
                    </div>

                </div>
            </div>

            <div className="card mb-4">
                <div className="card-header">Ingredients</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">


                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.value)} type="checkbox" 
                                value="Butter" id="Butter" />
                                <label className="form-check-label" htmlFor="Butter">
                                Butter
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.value)} type="checkbox" 
                                value="Almond Milk" id="AlmondMilk" />
                                <label className="form-check-label" htmlFor="AlmondMilk">
                                Almond Milk
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.value)} type="checkbox" 
                                value="Olive Oil" id="OliveOil" />
                                <label className="form-check-label" htmlFor="Olive Oil">
                                Olive Oil
                                </label>
                            </div>


                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.value)} type="checkbox" 
                                value="Peanut Butter" id="PeanutButter" />
                                <label className="form-check-label" htmlFor="PeanutButter">
                                Peanut Butter
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.value)} type="checkbox" 
                                value="Chicken" id="Chicken" />
                                <label className="form-check-label" htmlFor="Chicken">
                                Chicken
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" onChange={(e) => setFilter(e.target.value)} type="checkbox" 
                                value="Egg" id="Egg" />
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