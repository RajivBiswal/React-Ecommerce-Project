import { useEffect } from "react";
import { Button, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listMyOrders } from "../actions/orderActions";

const MyOrdersScreen = () => {
  const dispatch = useDispatch();

  const orderMyOrders = useSelector((state) => state.orderMyOrders);
  const {
    loading: loadingMyOrders,
    error: errorMyOrders,
    orders,
  } = orderMyOrders;

  useEffect(() => {
      dispatch(listMyOrders())

  },[dispatch])


  return (
    <Col md={9}>
      <h2>MY ORDERS</h2>
      {loadingMyOrders ? (
        <Loader />
      ) : errorMyOrders ? (
        <Message variant="danger">{errorMyOrders}</Message>
      ) : (
        <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>

                <td>{order.createdAt.substring(0, 10)}</td>

                <td>₹ {order.totalPrice}</td>

                <td>
                  {order.isPaid ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className="btn-sm">Track Your Order</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Col>
  );
};

export default MyOrdersScreen;
