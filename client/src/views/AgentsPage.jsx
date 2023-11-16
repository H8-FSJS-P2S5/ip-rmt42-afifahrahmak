import { useEffect, useState } from "react"
import AgentCard from "../components/AgentCard"
import axios from "axios"


function AgentsPage() {
    const [agents, setAgents] = useState([])

    useEffect(() => {
        axios ({
            method: "GET",
            url: "http://localhost:3000/agents",
            headers: {
                Authorization: localStorage.getItem("Authorization")
            }
        })
        .then((result) => {
            console.log(result)
            setAgents(result.data)
        })
        .catch(console.log)
    }, [])

    if(!agents.length) {
        console.log("EMPTY DATA")
    }

    return (
        <>
        <div className="page-bg">

            <div background='dark' className="cards-layout">
                {agents.map(agent => {
                    return <div className="single-card">
                    <AgentCard
                        key = {agent.id}
                        agent = {agent}
                        page= "agents"
                    />
                    </div>
                })}
            </div>

        </div>
        </>
    )
}

export default AgentsPage