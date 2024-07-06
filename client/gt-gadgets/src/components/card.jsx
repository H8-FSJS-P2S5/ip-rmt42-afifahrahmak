import { Link } from "react-router-dom";

import React from 'react'

export default function Card({ gadget }) {
  return (
    <Link to={`/gadget/${gadget.id}`} style={{ textDecoration: 'none' }}>
    <div class="col">
    <div className="card">
        <img src={gadget.imgUrl}
            className="card-img-top" alt="pic"></img>
        <div className="card-body">
            <h4 className="centered-text">{gadget.name}</h4>
            <p className="centered-text">{gadget.Category?.name}</p>
        </div>
    </div>
    </div>
    </Link>
  )
}
