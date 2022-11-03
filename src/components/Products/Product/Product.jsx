import React, {  } from "react";
import { Button, Card } from "react-bootstrap";
import { BsCartPlusFill } from "react-icons/bs";
import "./productStyle.css";

const Product = ({ product, onAddToCart, handleClickImg, windowSize }) => {
  const pageStyles = {
    cardStyle: {
      height:
        windowSize.innerWidth <= 1200 && windowSize.innerWidth >= 550
          ? "530px"
          : "auto",
    },
    cardImg: { height: windowSize.innerWidth >= 550 ? "370px" : "auto" },
    paddingStyle: { paddingTop: "10px" },
    cardDescription: { textAlign: "left" },
    cartIcon: { backgroundColor: "white" },
  };

  return (
    <Card style={pageStyles.cardStyle}>
      <Card.Img
        style={pageStyles.cardImg}
        variant="top"
        src={product.image.url}
        onClick={() => handleClickImg(product.image.url)}
      />
      <div className="card-layout">
        <div className="cardHeading">
          <Card.Title className="card-heading-font">{product.name}</Card.Title>
          <Card.Title className="card-heading-font">
            {product.price.formatted_with_symbol}
          </Card.Title>
        </div>
        <div style={pageStyles.paddingStyle}>
          <Card.Text
            style={pageStyles.cardDescription}
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="card-description-font"
          />
        </div>
        <div className="card-button">
          <Button
            variant="light"
            style={pageStyles.cartIcon}
            onClick={() => onAddToCart(product.id, 1)}
          >
            <BsCartPlusFill />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Product;
