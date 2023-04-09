import React from 'react'

const Cart = ({user, active, setActive}) => {
  const fakeData = {
    name: "plain",
    price: "250",
    size: "M",
    variant: "white",
    quantity: 2
  }

  return (
    <>
        <div className={`container-md cart-container bg-white shadow ${active ? 'cart-active' : ''}`}>
            <button type="button" className="btn-close float-end" aria-label="Close" onClick={()=>setActive(!active)}></button>
            <div className='cart-title-container d-flex justify-content-between align-items-center mt-5'>

            <h5 className='section-title'>Cart</h5>
            <button className="btn btn-outline-secondary">Edit
            </button>
            </div>

            {/* Order list */}
            <div className='cart-order-list'>
              
              <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Size</th>
                <th scope="col">Var</th>
                <th scope="col">Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{fakeData.name}</th>
                <td>{fakeData.size}</td>
                <td>{fakeData.variant}</td>
                <td>{fakeData.quantity}</td>
              </tr>
              <tr>
                <th scope="row">{fakeData.name}</th>
                <td>{fakeData.size}</td>
                <td>{fakeData.variant}</td>
                <td>{fakeData.quantity}</td>
              </tr>
            </tbody>
          </table>
              
                {/* <p>List of items here from user_id with status cart</p> */}

                
            </div>

            <div className="row">
              <div className="col-md-12">

              </div>
            </div>




            

            {/* Order total amount */}
            <div>
                <h5>Subtotal: $999</h5>
            </div>
            <button className='btn btn-secondary text-uppercase'>Proceed to Checkout</button>
        </div>
    </>
  )
}

export default Cart