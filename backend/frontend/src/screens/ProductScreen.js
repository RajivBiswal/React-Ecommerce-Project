import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";

import { listProductsDetails, createProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstant';

const ProductScreen = ({ match, history }) => {

  ////////////Creating state////////////////
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  //////////load reducer data from store & destructure the value///////////
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { loading:loadingReview, 
          error: errorReview, 
          success: successReview } = productCreateReview;

  /////////////////UseEffect for the state changes//////////////////
  useEffect(() => {

    if(successReview){
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductsDetails(match.params.id));
  }, [dispatch, match, successReview]);

  //////////////////Handler for the button onClick event//////////////
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`)
  }

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(
      match.params.id,
      {rating,
      comment
      }
    ))
  }


  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={`image of ${product.name}`} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </ListGroup.Item>

                  <ListGroup.Item>Price: ₹{product.price}/-</ListGroup.Item>

                  <ListGroup.Item>Descrition: {product.description}</ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>₹{product.price}/-</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col xs='auto' className='my-1'>
                            <Form.Control
                              as="select"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            >
                              {
                                [...Array(product.countInStock).keys()].map((x) => (
                                  <option value={x + 1} key={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        disabled={product.countInStock === 0}
                        type="button"
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            
            {/* Review on Page */}
            <Row>
              <Col md={6}>
                <h4>Reviews</h4>
                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                <ListGroup variant='flush'>
                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} color='#f8e825'/>
                          <p>{review.createdAt.substring(0,10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}

                      <ListGroup.Item>
                        <h4>Write A Review</h4>

                        {loadingReview && <Loader/>}
                        {successReview && <Message variant='success'>Review Submitted</Message>}
                        {errorReview && <Message variant='danger'>{errorReview}</Message>}

                        {userInfo ? (
                          <Form onSubmit={reviewSubmitHandler}>
                            <Form.Group controlId='rating'>

                              <Form.Label>Rating</Form.Label>

                              <Form.Control
                                as='select'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                              </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='comment'>
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                as='textarea'
                                row='5'
                                value= {comment}
                                onChange={(e) => setComment(e.target.value)}>

                              </Form.Control>
                            </Form.Group>

                            <Button
                              disabled={loadingReview}
                              type='submit'
                              variant='primary'
                            >
                              Submit
                            </Button>
                          </Form>
                        ): (
                          <Message variant='info'>Please <Link to='/login'>Login</Link> To Write A Review</Message>
                        )}

                      </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
