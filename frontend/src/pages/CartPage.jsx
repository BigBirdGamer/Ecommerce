import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartPage() {
  const navigate = useNavigate()
  let { id, qty } = useParams();
  const productId = id;
  qty = Number(qty.split("=")[1]);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handleClickRemove = (id) => {
    dispatch(removeFromCart(id))
  };

  const handleClickCheckOut= (id) => {
    navigate('/login?redirect=shipping')
  };
  return (
    <Row>
    <Col md={8}>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <h1>
          Your cart is empty <Link to='/'>Go Back</Link>
        </h1>
      ) : (
        <ListGroup variant='flush'>
          {cartItems.map((para) => (
            <ListGroup.Item key={para.product}>
              <Row>
                <Col md={2}>
                  <Image src={para.image} alt={para.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${para.product}`}>{para.name}</Link>
                </Col>
                <Col md={2}>${para.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={para.qty}
                    onChange={(event) =>
                      dispatch(
                        addToCart(para.product, Number(event.target.value))
                      )
                    }
                  >
                    {[...Array(para.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => handleClickRemove(para.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
    <Col md={4}>
      <Card>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h2>
            $
            {cartItems
              .reduce((acc, item) => acc + item.qty * item.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type='button'
              className='btn-block'
              disabled={cartItems.length === 0}
              onClick={handleClickCheckOut}
            >
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  </Row>
  );
}

export default CartPage;


