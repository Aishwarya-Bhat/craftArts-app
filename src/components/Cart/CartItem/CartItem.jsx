import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {RiDeleteBin3Fill} from  'react-icons/ri'

const CartItem = ({ cartEachItem, onUpdateCartQty, onRemoveFromCart, windowSize }) => {
    // console.log("cart each items are:", cartEachItem);
    return (
        // <div>{cartEachItem.name}</div>
        <Card style={{ height: windowSize.innerWidth <= 1200 && windowSize.innerWidth >=550 ? "450px" : "auto" }}>
            <Card.Img
                style={{ height: windowSize.innerWidth >= 450 ? "350px" : "auto" }}
                variant="top"
                src={cartEachItem.image.url}
            />
            <div className="card-layout">
                <div className="cardHeading">
                    <Card.Title className="card-heading-font">{cartEachItem.name}</Card.Title>
                    <Card.Title className="card-heading-font">{cartEachItem.line_total.formatted_with_symbol}</Card.Title>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop:"15px"}}>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <Button  variant="outline-info" size="sm" onClick={() => onUpdateCartQty(cartEachItem.id, cartEachItem.quantity - 1)}>-</Button>
                        <div style={{fontSize:"18px", paddingRight:'10px', paddingLeft:'10px'}}>{cartEachItem.quantity}</div>
                        <Button variant="outline-info" size="sm" onClick={() => onUpdateCartQty(cartEachItem.id, cartEachItem.quantity + 1)}>+</Button>

                    </div>
                    <div>
                        <Button variant="danger" size="sm" onClick={() => onRemoveFromCart(cartEachItem.id)}><RiDeleteBin3Fill /></Button>

                    </div>

                </div>
            </div>
        </Card>
    )
}

export default CartItem