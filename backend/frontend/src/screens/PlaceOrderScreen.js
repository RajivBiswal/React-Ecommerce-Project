import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    ProgressBar,
    Row,
    Col,
    ListGroup,
    Image,
    Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { createOrder } from "../actions/orderActions";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

import {ORDER_CREATE_RESET} from '../constants/orderCostants';


/////////////////////////////////////////////////////////////////////////////////////
const PlaceOrderScreen = ({ history }) => {

  const orderCreate = useSelector((state) => state.orderCreate); //calling the action
  const { order, error, success } = orderCreate; //destructuring action data

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //   Calculation of Order Summary
  cart.itemPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  cart.shippingPrice = (cart.itemPrice > 500 ? 0 : 40).toFixed(2);

  cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice)).toFixed(2);

///////////////////////////////////////////////////////////////////////////////////////
  if (!cart.paymentMethod) {
    history.push('/payment')
  }

  useEffect(() => {
        if(success){
          history.push(`/order/${order._id}`)
          dispatch({type: ORDER_CREATE_RESET})         
        }
  }, [success, history, dispatch, order])

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemPrice: cart.itemPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };


  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <ProgressBar variant="success" now={75} />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                <strong>Shipping: </strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                {cart.shippingAddress.state} - {cart.shippingAddress.pincode}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Cart Is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} × ₹{item.price} = ₹
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>ORDER SUMMARY</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>₹{cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item> 

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>

                <Button
                  type="button"
                  variant="primary"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
