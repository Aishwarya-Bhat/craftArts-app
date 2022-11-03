import React, { useState } from "react";
import { Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import ImageModal from "./ImageModal";
import Product from "./Product/Product";
import './style.css';

const Products = ({arts,onAddToCart, windowSize}) => {
  const [clickedImg, setClickedImg] = useState(null);

  const handleClickImg = (clickedImgUrl) => {
    setClickedImg(clickedImgUrl);
  }

  return (
    <Container className="main-content" spacing={4}>
      <div>
        <Row lg={4} md={2} xs={1} sm={2} className="g-4">
          {arts.map((art) => {
            return (
              <Col key={art.id}>
                <Product product={art} onAddToCart={onAddToCart} handleClickImg={handleClickImg} windowSize={windowSize}/>
              </Col>
            );
          })}
        </Row>
      </div>
      {clickedImg && <ImageModal clickedImg={clickedImg} setClickedImg={setClickedImg}/>}
    </Container>
   
    
  );
};

export default Products;
