import { useEffect, useState } from "react"
import BundleCard from "../components/BundleCards"
import axios from "axios"


function BundlesPage() {
    const [bundles, setBundles] = useState([])

    useEffect(() => {
        axios ({
            method: "GET",
            url: "http://localhost:3000/bundles",
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((result) => {
            console.log(result)
            setBundles(result.data)
        })
        .catch(console.log)
    }, [])

    if(!bundles.length) {
        console.log("EMPTY DATA")
    }

    return (
        <>
        <div className="page-bg">
            <div className="cards-layout">
                {bundles.map(bundle => {
                    return <div className="single-card">
                    <BundleCard
                        key = {bundle.id}
                        bundle = {bundle}
                        page= "budnles"
                    />
                    </div>
                })}
            </div>


        </div>
        </>
    )
}

export default BundlesPage