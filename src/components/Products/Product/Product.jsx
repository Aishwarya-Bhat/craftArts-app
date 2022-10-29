import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { BsCartPlusFill } from "react-icons/bs";
import "./productStyle.css";
import { MDBBadge, MDBIcon } from "mdb-react-ui-kit";

const Product = ({ product, onAddToCart }) => {
  return (
    <Card >
      <Card.Img
        style={{ height: window.innerWidth >= 450 ? "350px" : "auto" }}
        variant="top"
        src={product.image.url}
      />
      <div className="card-layout">
        <div className="cardHeading">
          <Card.Title className="card-heading-font">{product.name}</Card.Title>
          <Card.Title className="card-heading-font">{product.price.formatted_with_symbol}</Card.Title>
        </div>
        <div style={{paddingTop:"10px"}}>

        <Card.Text style={{textAlign: "left"}} dangerouslySetInnerHTML={{__html: product.description}} className="card-description-font"  />
        </div>
        <div className="card-button">
          <Button variant="light" style={{ backgroundColor: "white" }} onClick={() => onAddToCart(product.id, 1)}>
            <BsCartPlusFill />
          </Button>

        </div>
      </div>
    </Card>
  );
};

export default Product;
