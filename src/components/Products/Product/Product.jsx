import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { BsCartPlusFill } from "react-icons/bs";
import "./productStyle.css";
import { MDBBadge, MDBIcon } from "mdb-react-ui-kit";

const Product = ({ product, onAddToCart, handleClickImg, windowSize }) => {
  // const [windowSize, setWindowSize] = useState(getWindowSize());
  

  // useEffect(() => {
  //   function handleWindowResize() {
  //     setWindowSize(getWindowSize());
  //   }

  //   window.addEventListener('resize', handleWindowResize);

  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // }, []);

  // function getWindowSize() {
  //   const {innerWidth, innerHeight} = window;
  //   return {innerWidth, innerHeight};
  // }
  
  return (
    <Card style={{ height: windowSize.innerWidth <= 1200 && windowSize.innerWidth >=550 ? "530px" : "auto" }}>
    {/* <Card> */}
      <Card.Img
        style={{ height: windowSize.innerWidth >= 550 ? "370px" : "auto" }}
        variant="top"
        src={product.image.url}
        onClick={() => handleClickImg(product.image.url)}
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
