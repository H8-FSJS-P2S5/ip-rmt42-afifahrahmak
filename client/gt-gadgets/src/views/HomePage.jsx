import React from 'react'
import Card from '../components/card'
import Header from '../components/header'
import Navbar from '../components/sidebar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import FilterButton from '../components/filterGadget'


export default function HomePage() {
    const [gadgetList, setGadgetList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const { data } = await axios.get(
            "http://localhost:3000/pub/gadgets"
          );
    
          setGadgetList(data)
        }
    
        fetchData()
      }, [])

  return (
    <>
          <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="gadget-section"
      ></section>


      <Navbar></Navbar>

      <div
          className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 className="gadgetListTitle">GTGadget</h1>
        </div>

        
        
        <FilterButton></FilterButton>

        <div class="row row-cols-1 row-cols-md-2 g-4">

               
        {gadgetList.map((gadget) => { 
            return (  <Card key={gadget.id} gadget={gadget}></Card> )
        })}

        </div>
    </>
  )
}
