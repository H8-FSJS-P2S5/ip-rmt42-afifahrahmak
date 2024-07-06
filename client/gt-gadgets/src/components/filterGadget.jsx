import React, { useState } from 'react';
import axios from 'axios';
import Card from './card';

const FilterButton = () => {
 const [filteredGadgets, setFilteredGadgets] = useState([]);

 const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pub/gadgets');
      console.log(response.data)
      setFilteredGadgets(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
 };

 const handleFilteredGadgets = () => {
    return filteredGadgets.map(gadget => {
      if (gadget.Spec.weight !== undefined && gadget.Spec.weight < 210) {
        return   <Card key={gadget.id} gadget={gadget}></Card> ;
      } else {
        return <div key={gadget.id}>Weight undefined or more than 250 for {gadget.name}</div>;
      }
    });
 };

 return (
    <div>
      <button onClick={handleClick} className="btn btn-primary">
        Filter by Weight less than 250
      </button>
      {handleFilteredGadgets()}
    </div>
 );
};


export default FilterButton;