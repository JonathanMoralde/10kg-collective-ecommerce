import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

const Orders = ({adminUser}) => {
  const [orderList, setOrderList] = useState()

  // get all the orders from backend
  useEffect(()=>{
    const url = "https:/localhost/10kg-collective/displayModule/display.php"

    const response = axios.get(url)

    setOrderList(response.data)

  },[])


  return <>
      <div className="container-fluid container-fix my-5">
        <h3 className="section-title mb-3">All Orders</h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Variation</th>
              <th scope="col">Size</th>
              <th scope="col">Date Ordered</th>
              <th scope="col">Order Status</th>
              <th scope="col">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>


 
  </>;
};

export default Orders;
