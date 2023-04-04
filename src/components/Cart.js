import React from 'react'

const Cart = ({user, active, setActive}) => {
  return (
    <>
        <div className={`cart-container bg-white shadow ${active ? 'cart-active' : ''}`}>
            <div className='cart-title-container d-flex justify-content-between align-items-center'>

            <h5 className='section-title'>Cart</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>setActive(!active)}></button>
            </div>

            {/* Order list */}
            <div className='cart-order-list'>
                <p>List of items here</p>
            </div>

            {/* Order total amount */}
            <div>
                <h5>Subtotal: $999</h5>
            </div>
            <button className='btn btn-secondary text-uppercase'>Checkout</button>
        </div>
    </>
  )
}

export default Cart