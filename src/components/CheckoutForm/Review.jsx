import React from 'react'
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';



const Review = ({ checkoutToken }) => {
    console.log("CheckoutToken details:", checkoutToken);
    return (
        <div><h4>Order Summary </h4>
            <ListGroup variant="flush">
                {checkoutToken.line_items.map((product) => (
                    <ListGroup.Item style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{product.name}</div>
                            <div style={{textAlign: "left"}}>Quantity: {product.quantity}</div>
                        </div>
                        <div>{product.line_total.formatted_with_symbol}</div>
                    </ListGroup.Item>
                ))
                }
                <ListGroup.Item style={{padding:" 12px 22px", textAlign:"left"}}>
                <div  className="fw-bold">Total</div>
                            <div>{checkoutToken.total.formatted_with_symbol} </div>
                </ListGroup.Item>
            </ListGroup></div>
    )
}

export default Review