import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function DetailsPage() {
    const [musicKit, setMusicKit] = useState({})
    const params = useParams()
    const musicKitId = params.id
    
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:3000/musicKits/${musicKitId}`,
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((result) => {
            setMusicKit(result.data)
        })
        .catch(console.log)

    }, [])

    if (!Object.keys(musicKit).length) {
        return <span>Empty Data</span>;
    }

    return (
        <>
            <div className="nuke-bg" style={{display: "flex", "flexDirection": "column"}}>
                <div className="flex-row" style={{paddingTop: "5%", marginLeft: "5%"}}>
                    <img src={musicKit.imageUrl} alt="albumImage" style={{width: 450}}/>
                    <div style={{width: "80%", marginRight: "5%"}}>
                        <h1 className="white">{musicKit.name}</h1>
                            <hr className="white"/>
                        <h5 className="white">{musicKit.description}</h5>
                            <br />
                        <h3 className="white">Price : Rp{musicKit.price}</h3>
                            <br />
                    </div>
                </div> 

                <div>
                    <Table hover style={{marginLeft: "8%", width:"60%", background: "transparent"}}>
                        <thead>
                            <tr style={{background: "rgba(0,0,0,0.70)"}}>
                                <th scope="col" style={{background: "rgba(255,255,255,0.5)", color: "white"}}>Category</th>
                                <th scope="col" style={{width: "50%", background: "rgba(255,255,255,0.5)", color: "white"}}>Audio Sample</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white"}}>Main Menu</td>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white", textAlign: "center"}}>
                                    <audio controls src={musicKit.mainMenu}></audio>
                                </td>     
                            </tr>
                            <tr>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white"}}>MVP Anthem</td>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white", textAlign: "center"}}>
                                    <audio controls src={musicKit.mvpAnthem}></audio>
                                </td>     
                            </tr>
                            <tr>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white"}}>Bomb Planted</td>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white", textAlign: "center"}}>
                                    <audio controls src={musicKit.bomb10Second}></audio>
                                </td>     
                            </tr>
                            <tr>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white"}}>Choose team</td>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white", textAlign: "center"}}>
                                    <audio controls src={musicKit.chooseTeam}></audio>
                                </td>     
                            </tr>
                            <tr>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white"}}>Lost Round</td>
                                <td style={{background: "rgba(0,0,0,0.1)", color: "white", textAlign: "center"}}>
                                    <audio controls src={musicKit.lostRound}></audio>
                                </td>     
                            </tr>
                        </tbody>
                    </Table>
                </div>

            </div>

            
        </>
    )
}

export default DetailsPage