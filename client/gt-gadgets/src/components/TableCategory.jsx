import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react'
export default function TableCategory() {
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const { data } = await axios.get(
          "http://localhost:3000/categories"
        );
  
        setCategoryList(data)
      }
  
      fetchData()
    }, [])
  
  return (
    <>
    
    {categoryList.map((category) => {
        return (
          <tr key={category.id}>
            <th scope='row'>{category.id}</th>

            <td>{category.name}</td>

          </tr>
        )
      })}
    </>
  )
}
