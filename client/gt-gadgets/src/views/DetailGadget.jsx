import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useParams } from "react-router-dom";
import { CardDetail } from "../components/CardDetail";



export const DetailGadgetPage = () => {
    const [gadget, setGadget] = useState({
        "id": 0,
        "name": "-",
        "description": "-",
        "imgUrl": "-",
        "rating": 0,
        "categoryId": '-',
        "Spec": {
            "id": 0,
            "weight": 0,
            "display": "-",
            "os": "-",
            "chipset": "-",
            "memory": "-",
            "camera": "-",
            "battery": "",
            "network": ""
        },
        "Category": {
            "name": '-'
        }
    });
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const fetchGadget = async () => {
        setLoading(true);
        try {
            const result = await axios.get('http://localhost:3000/pub/gadget/' + id);
            setGadget(result.data)
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    useEffect(() => {
        fetchGadget();
    }, []);

    if (loading) {
        return <div className="vw-100 vh-100 d-flex justify-content-center align-item-center" style={{ marginTop: '15%' }}>
            <h1 className="animate__animated animate__bounce animate__infinite">Loading ...</h1>
        </div>
    }

    return (
        <section id="public-detail" >

            <section className="d-flex align-items-center vh-100">
                <div className="container-fluid vh-50">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <CardDetail gadget={gadget} key={gadget.id} />
                        </div>
                    </div>
                </div>
            </section>
            <Outlet />
        </section>
    );
}