import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {PayPalButton} from 'react-paypal-button-v2';
import { Row, 
         Col,
         ListGroup, 
         Image, 
         Card, 
         ProgressBar, 
         Alert,
         Button} from "react-bootstrap";
import { Link } from "react-router-dom";

import { getOrderDetails, 
         payOrder, 
         deliveredOrder, 
         packedOrder, 
         shippedOrder } from "../actions/orderActions";

import Loader from "../components/Loader";
import { ORDER_PAY_RESET,
         ORDER_PACKED_RESET,
         ORDER_SHIPPED_RESET,
         ORDER_DELIVERED_RESET,
} from "../constants/orderCostants";

const OrderScreen = ({ match, history }) => {

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  ////////////////Getting the action data from store & destructuring the required value///////////////
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderPacked = useSelector((state) => state.orderPacked);
  const { loading: loadingPacked, success: successPacked } = orderPacked;

  const orderShipped = useSelector((state) => state.orderShipped);
  const { loading: loadingShipped, success: successShipped } = orderShipped;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success: successDelivered } = orderDelivered;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  ///////////////Calculation of Order Summary//////////////
  if (!loading && !error) {
    order.itemPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  /////////////////Paypal Scripts////////////////////////
  const addPayPalScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = "https://www.paypal.com/sdk/js?client-id=AfmiaM1x-HpRGg3FAlYvEp4g5FNSS7-aNmjlCpizYE15reSn9lr891jAxU3UvDIWILQltOnLcquDUTMm"
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

/////////////State function////////////////////
  useEffect(() => {

    if(!userInfo){
      history.push('/login')
    }

    if (!order ||
       successPay || 
       order._id !== Number(orderId) || 
       successPacked || 
       successShipped || 
       successDelivered) 
       {
        dispatch({type: ORDER_PAY_RESET})
        dispatch({type: ORDER_PACKED_RESET})
        dispatch({type: ORDER_SHIPPED_RESET})
        dispatch({type: ORDER_DELIVERED_RESET})
        dispatch(getOrderDetails(orderId));

    }else if(!order.isPaid) {

      if(!window.paypal){
        addPayPalScript()
 
      }else{
        setSdkReady(true)
      }
    }
  }, [
       dispatch, 
       history,
       userInfo,
       order,
       orderId, 
       successPay,
       successDelivered,
       successPacked,
       successShipped,
      ]);


  /////////////Handlers for the buttons//////////////////
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const packedHandler = () => {
    dispatch(packedOrder(order))
  }

  const shippedHandler = () => {
    dispatch(shippedOrder(order))
  }

  const deliveredHandler = () => {
    dispatch(deliveredOrder(order))
  }


  return loading ? (
    <Loader />
  ) : error ? (
      <Alert variant='danger'>{error}</Alert>
  ) : (
    <div>
      <h1>Order ID: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p><strong>Name: </strong>{order.user.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},{" "}
                {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>

              {/* ProgressBar */}
              {order.isDelivered ? (
                <ProgressBar variant="success" now={100} />
              ): order.isShipped ? (
                <ProgressBar variant="success" now={50} />
              ) : order.isPacked ? (
                <ProgressBar variant="success" now={25} />
              ) : (
                <ProgressBar variant="success" now={0} />
              )}
              

              {/* Track Order */}
              {order.isDelivered ? (
                  <Alert variant='light'>
                    <strong>Status: </strong>
                    Delivered Successfuly {order.deliveredAt.substring(0,10)}
                  </Alert>

              ) : (order.isShipped) ? (
                <Alert variant='secondary'>
                  <strong>Status: </strong>
                  Order Shipped {order.shippedAt.substring(0,10)}
                </Alert>

              ):(order.isPacked) ? (
                <Alert variant='secondary'>
                  <strong>Status: </strong>
                  Order Packed {order.packedAt.substring(0,10)}
                </Alert>

              ):
              ( 
                <Alert variant='secondary'>
                  <strong>Status: </strong>
                  Ordered
                </Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                  <Alert variant='light'>Paid on {order.paidAt}</Alert>
              ) : (
                <Alert variant='secondary'>Not Paid</Alert>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>ORDER ITEMS</h2>
              {order.orderItems.length === 0 ? (
                <Alert variant="info">Order Is Empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                  <Col>₹{order.itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              
              {/* Adding Pay Button if its not paid */}
              {order.paymentMethod === 'PayPal' ?
              !order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader/>
                  ): (
                    <PayPalButton amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              ):(<p></p>)}
            </ListGroup>
            
            {loadingPacked && <Loader/>}
            {userInfo && userInfo.isAdmin && !order.isPacked && (
              <ListGroup.Item>
                <Button 
                  type='button'
                  className='btn btn-block'
                  onClick={packedHandler}>
                  Marked As Packed
                </Button>
              </ListGroup.Item>
            )}

            {loadingShipped && <Loader/>}
            {userInfo && userInfo.isAdmin && order.isPacked && !order.isShipped && (
              <ListGroup.Item>
                <Button 
                  type='button'
                  className='btn btn-block'
                  onClick={shippedHandler}>
                  Marked As Shipped
                </Button>
              </ListGroup.Item>
            )}

            {loadingDelivered && <Loader/>}
            {userInfo && userInfo.isAdmin && order.isPacked && order.isShipped && !order.isDelivered && (
              <ListGroup.Item>
                <Button 
                  type='button'
                  className='btn btn-block'
                  onClick={deliveredHandler}>
                  Marked As Delivered
                </Button>
              </ListGroup.Item>
            )}

          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
