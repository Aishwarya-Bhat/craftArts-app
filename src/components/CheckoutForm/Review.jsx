import React from 'react'
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

const pageStyles = {
  listStyles: { display: "flex", justifyContent: "space-between" },
  quantityStyle: { textAlign: "left" },
  totalStyle: { padding: " 12px 22px", textAlign: "left" },
};

const Review = ({ checkoutToken }) => {
    return (
        <div><h4>Order Summary </h4>
            <ListGroup variant="flush">
                {checkoutToken.line_items.map((product) => (
                    <ListGroup.Item style={pageStyles.listStyles}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{product.name}</div>
                            <div style={pageStyles.quantityStyle}>Quantity: {product.quantity}</div>
                        </div>
                        <div>{product.line_total.formatted_with_symbol}</div>
                    </ListGroup.Item>
                ))
                }
                <ListGroup.Item style={pageStyles.totalStyle}>
                <div  className="fw-bold">Total</div>
                            <div>{checkoutToken.total.formatted_with_symbol} </div>
                </ListGroup.Item>
            </ListGroup></div>
    )
}

export default Review