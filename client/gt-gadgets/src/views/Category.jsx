import React from 'react'
import TableCategory from '../components/TableCategory'
import Navbar from '../components/sidebar'


export default function Category() {
  return (
    <>
    <Navbar></Navbar>
    <div
    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 className="gadgetListTitle">Find Device By Category</h1>

    </div>

    
    <div class="row row-cols-1 row-cols-md-2 g-4">
    <table className="table" id="post-list-table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" width="50px">#</th>
                  <th scope="col" width="180px">Name</th>

                </tr>
              </thead>
              <tbody id="Post">
                <TableCategory></TableCategory>
              </tbody>
            </table>

</div>
    
    </>

  )
}
