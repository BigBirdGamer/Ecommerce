import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

function Homepage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest</h1>
      {loading ? (
        <h1> LOADING ...</h1>
      ) : error ? (
        <h1> ERROR ... {error}</h1>
      ) : (
        <Row>
          {products.map((para, key) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={key}>
                <Product para={para} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default Homepage;
