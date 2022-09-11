import React, { useEffect } from "react";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import ErrorMessage from "../components/ErrorMessage";
import LoadingMessage from "../components/LoadingMessage";

const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest and Greatest</h1>
      {loading ? (
        // Loading Screen if internet slow
        <LoadingMessage />
      ) : error ? (
        // Custom Error Messages
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <Row>
          {products.map((product, key) => (
            <Col sm={12} md={6} lg={4} xl={3} key={key}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
