import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating"
import {Link} from "react-router-dom"

function Product({ para }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${para._id}`}>
        <Card.Img src={para.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${para._id}`}>
          <Card.Title as="div">
            <strong>{para.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
        <Rating value={para.rating} text={`${para.numReviews} reviews`}/>
        </Card.Text>
        <Card.Text as="h3">${para.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
