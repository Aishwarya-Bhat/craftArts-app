import React from "react";
import { Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import Product from "./Product/Product";
import './style.css'

// const arts = [
//   {
//     id: 1,
//     name: "Mandala",
//     description: " Kind of doodles",
//     price: "$25",
//     image:
//       "https://brightercraft.com/wp-content/uploads/2019/08/Photo-11-08-2019-1-16-43-pm.jpg",
//   },
//   {
//     id: 2,
//     name: "Paintings",
//     description: "Beautiful paintings",
//     price: "$20",
//     image:
//       "https://webdesigndev.com/wp-content/uploads/2021/09/banner-image-3.jpg.webp",
//   },
//   {
//     id: 3,
//     name: "Painted Doodles",
//     description: "Coloured Painted Doodles",
//     price: "$30",
//     image:
//       "https://brightercraft.com/wp-content/uploads/2019/08/Photo-11-08-2019-1-16-43-pm.jpg",
//   },
//   {
//     id: 4,
//     name: "Sketches doodles",
//     description: "Sketches doodles",
//     price: "$20",
//     image:
//       "https://webdesigndev.com/wp-content/uploads/2021/09/banner-image-3.jpg.webp",
//   },
//   {
//     id: 5,
//     name: "Paintings Mandala",
//     description: "Beautiful paintings",
//     price: "$20",
//     image:
//       "https://brightercraft.com/wp-content/uploads/2019/08/Photo-11-08-2019-1-16-43-pm.jpg",
//   },
// ];

const Products = ({arts,onAddToCart}) => {
  return (
    <Container className="main-content" spacing={4}>
      <div>
        <Row lg={4} md={2} xs={1} sm={2} className="g-4">
          {arts.map((art) => {
            return (
              <Col key={art.id}>
                <Product product={art} onAddToCart={onAddToCart}/>
              </Col>
            );
          })}
        </Row>
      </div>
    </Container>
   
    
  );
};

export default Products;
