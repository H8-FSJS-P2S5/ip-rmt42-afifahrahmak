import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MusicKitCard from "../components/MusicKitCard"

function InventoryPage() {
    const [inventories, setInventories] = useState([])
    const [page, setPage] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:3000/inventories",
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((result) => {
            setInventories(result.data)
        })
        .catch(console.log)
    }, [])

    const handleDeleteItem = (inventoryId) => {
        setInventories((prevInventories) =>
          prevInventories.filter((inventory) => inventory.id !== inventoryId)
        );
      };

    return (
        <>
            <div className="overpass-bg">
                    <div className="flex-wrap" style={{justifyContent: "center", paddingTop: "3%"}}>
                        {inventories.map(inventory => {
                                return <MusicKitCard
                                    key = {inventory.MusicKit.id}
                                    musicKit = {inventory.MusicKit}
                                    inventory = {inventory}
                                    page = {"inventory"}
                                    onDelete={() => handleDeleteItem(inventory.id)}
                                />
                                
                            })}
                    </div>
            </div>
        </>
    )
}

export default InventoryPage