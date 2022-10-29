import React from "react";
import { Container, Alert, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

const Cart = ({ cart, handleUpdateQty,handleRemoveItem, handleEmptyCart }) => {
  const EmptyCart = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        flexDirection:'column'
      }}
    >
      <Alert variant="info">
        You don't have any items in your cart, start adding some!
      </Alert>
      <Link style={{textDecoration:"none"}} to="/"><Button variant="info">Start Shopping!!</Button></Link>
    </div>
  );
  const FilledCart = () => {
    return (
      // <div style={{padding:"30px 50px" }}>
      <div style={{paddingTop:"30px"}}>
        <Alert key="info" variant="info">
          Your cart items
        </Alert>
        <Container className="main-content" spacing={4}>
          <div>
            <Row lg={4} md={3} xs={1} sm={2} className="g-4">
              {cart.line_items.map((cartEachItem) => {
                return (
                  <Col key={cartEachItem.id}>
                    <CartItem cartEachItem={cartEachItem} onUpdateCartQty={handleUpdateQty} onRemoveFromCart={handleRemoveItem}/>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
        <div style={window.innerWidth >= 450 ? { display: "flex", justifyContent: "space-between", paddingTop:"40px", paddingBottom:"40px" } : {paddingTop:"40px", paddingBottom:"40px" }}>
          <div style={window.innerWidth >= 450 ? {fontSize: "25px", fontWeight:'bold'} : {fontSize: "18px", fontWeight:'bold', paddingBottom:"8px"}}>Subtotal: {cart.subtotal.formatted_with_symbol}</div>
          <div>
            <Button style={{ marginRight: "20px" }} variant="danger" onClick={handleEmptyCart}>
              Empty Cart
            </Button>
            <Link to="/checkout" style={{textDecoration:"none"}}><Button variant="info">Checkout</Button></Link>
          </div>
        </div>
      </div>
    );
  };

  // if (!cart.total_items) return "Loading.....";

  return (
    <Container>{!cart.total_items ? <EmptyCart /> : <FilledCart />}</Container>
    // <EmptyCart />
  );
};

export default Cart;
