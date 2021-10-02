import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { listProductDetail } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = ({ match }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();
  const productDetail = useSelector(state => state.productDetail);
  const { product, error, loading } = productDetail;

  useEffect(() => {
    dispatch(listProductDetail(productId));
  }, [productId, dispatch]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={5}>
            <Row>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Row>

            <Row>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Price:</strong>
                      </Col>
                      <Col>
                        <p>$ {product.price}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Status:</strong>
                      </Col>
                      <Col>
                        <p>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out Of Stock'}
                        </p>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className="d-grid">
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={!product.countInStock > 0}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
