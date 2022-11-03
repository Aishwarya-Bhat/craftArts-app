import React from "react";
import { Container, Alert, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

const Cart = ({
  cart,
  handleUpdateQty,
  handleRemoveItem,
  handleEmptyCart,
  windowSize,
}) => {
  const pageStyles = {
    emptyCartStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "90vh",
      flexDirection: "column",
    },
    linkButton: { textDecoration: "none" },
    filledCartStyle: {
      paddingTop: "30px",
    },
    cartFooterMaxWidth: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: "40px",
      paddingBottom: "40px",
    },
    cartFooterMinWidth: { paddingTop: "40px", paddingBottom: "40px" },
    cartTotalMaxWidth: { fontSize: "25px", fontWeight: "bold" },
    cartTotalMinWidth: {
      fontSize: "18px",
      fontWeight: "bold",
      paddingBottom: "8px",
    },
    emptyCartButton: { marginRight: "20px" },
  };

  const EmptyCart = () => (
    <div style={pageStyles.emptyCartStyle}>
      <Alert variant="info">
        You don't have any items in your cart, start adding some!
      </Alert>
      <Link style={pageStyles.linkButton} to="/">
        <Button variant="info">Start Shopping!!</Button>
      </Link>
    </div>
  );
  const FilledCart = () => {
    return (
      <div style={pageStyles.filledCartStyle}>
        <Alert key="info" variant="info">
          Your cart items
        </Alert>
        <Container className="main-content" spacing={4}>
          <div>
            <Row lg={4} md={2} xs={1} sm={2} className="g-4">
              {cart.line_items.map((cartEachItem) => {
                return (
                  <Col key={cartEachItem.id}>
                    <CartItem
                      cartEachItem={cartEachItem}
                      onUpdateCartQty={handleUpdateQty}
                      onRemoveFromCart={handleRemoveItem}
                      windowSize={windowSize}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </Container>
        <div
          style={
            windowSize.innerWidth >= 450
              ? pageStyles.cartFooterMaxWidth
              : pageStyles.cartFooterMinWidth
          }
        >
          <div
            style={
              windowSize.innerWidth >= 450
                ? pageStyles.cartTotalMaxWidth
                : pageStyles.cartTotalMinWidth
            }
          >
            Total: {cart.subtotal.formatted_with_symbol}
          </div>
          <div>
            <Button
              style={pageStyles.emptyCartButton}
              variant="danger"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Link to="/checkout" style={pageStyles.linkButton}>
              <Button variant="info">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // if (!cart.total_items) return "Loading.....";

  return (
    <Container>{!cart.total_items ? <EmptyCart /> : <FilledCart />}</Container>
  );
};

export default Cart;
