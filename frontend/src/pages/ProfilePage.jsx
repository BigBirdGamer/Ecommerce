import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";
import { listMyOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch register
    if (password !== confirmPassword) {
      setMessage(" Passwords do not match ");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setConfirmation("Profile Updated Successfully");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
        {/* Error if Password not the same */}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {/* Message if profile update Success */}
        {confirmation && (
          <ErrorMessage variant="success">{confirmation}</ErrorMessage>
        )}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

        {loading && <LoadingMessage />}
        <Form onSubmit={handleSubmit}>
          {/*  Name */}
          <Form.Group controlId="name">
            <Form.Label> Name </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name "
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* Email */}
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* PASSWORD */}
          <Form.Group controlId="password">
            <Form.Label>New Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password "
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* Confirm Password */}
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password "
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="button">
            Update
          </Button>
        </Form>
      </Col>
      {/* ORDERS */}
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <LoadingMessage />
        ) : errorOrders ? (
          <ErrorMessage variant="danger">{errorOrders}</ErrorMessage>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>

                    <td>
                      {order.isDeilvered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fa-solid fa-xmark"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>

                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button variant="light" className="btn-sm">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
