import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "../components/CheckoutStep";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckoutStep step1 step2  />
      <h1>Shipping</h1>
      <Form onSubmit={handleSubmit}>
        {/* ADDRESS */}
        <Form.Group controlId="address">
          <Form.Label> Address </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address "
            value={address}
            required
            onChange={(event) => setAddress(event.target.value)}
          ></Form.Control>
          {/* CITY */}
          <Form.Group controlId="city">
            <Form.Label> City </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city "
              value={city}
              required
              onChange={(event) => setCity(event.target.value)}
            ></Form.Control>
            {/* POSTAL_CODE */}
            <Form.Group controlId="postalCode">
              <Form.Label> Postal Code </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter postal code "
                value={postalCode}
                required
                onChange={(event) => setPostalCode(event.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* Country */}
            <Form.Group controlId="country">
              <Form.Label> Country </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country "
                value={country}
                required
                onChange={(event) => setCountry(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="button">
              Continue
            </Button>
          </Form.Group>
        </Form.Group>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
