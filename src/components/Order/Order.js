import React, { useState, useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";

import { EditOrder } from "../../store/actions/OrdersActions";

import classes from "./Order.module.css";
import { edit, cancel, done } from "../../svgs";

const initialState = {
  isPaid: "",
  orderStatus: "",
};

const OrderListItem = (props) => {
  const { order } = props;

  const [toggle, setToggle] = useState(false);
  const [orderdetail, setDetail] = useState({
    ...initialState,
    isPaid: order.isPaid,
    orderStatus:
      order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1),
  });

  const [bgColor, setBgColor] = useState("#FCC4C9");

  useEffect(() => {
    switch (order.orderStatus.toLowerCase()) {
      case "order placed":
        setBgColor("#FCC4C9");
        break;
      case "packed":
        setBgColor("#FBBC58");
        break;
      case "delivered":
        setBgColor("#A2EEAE");
        break;

      case "canceled":
        setBgColor("#eeeeee");
        break;

      default:
        setBgColor("#FCC4C9");
        break;
    }
  }, [order.orderStatus]);

  return (
    <div
      className={classes.OrderListItem}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className={classes.Header}>
        <div className={classes.DateTime}>
          <span>Order Placed on </span>
          <span>
            {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </div>
        {toggle ? (
          <>
            <div className={classes.actions}>
              <span onClick={() => setToggle(false)}>{cancel}</span>
              <span
                onClick={() => {
                  props.editOrder(
                    order._id,
                    orderdetail.isPaid,
                    orderdetail.orderStatus,
                    order
                  );
                  setToggle(false);
                }}
              >
                {done}
              </span>
            </div>
          </>
        ) : (
          <div className={classes.EditBtn} onClick={() => setToggle(true)}>
            {edit}
          </div>
        )}
      </div>
      <div className={classes.Field}>
        <div className={classes.Title}>Buy from</div>
        <div className={classes.Value}>
          {order.restaurantName || order.buyFrom}
        </div>
      </div>
      <div className={classes.Title}>Order Items</div>
      {order.orderItems.map((item) => (
        <div className={classes.Field} key={item._id}>
          {item.name}, Qty: {item.quantity}
        </div>
      ))}
      <div className={classes.Field}>
        <div className={classes.Title}>Tax Amount</div>
        <div className={classes.Value}>
          Rs.{order.taxAmount || order.taxPrice}
        </div>
      </div>
      <div className={classes.Field}>
        <div className={classes.Title}>Delivery Charge</div>
        <div className={classes.Value}>
          Rs.{order.deliveryCharge || order.deliveryPrice}
        </div>
      </div>
      <div className={classes.Field}>
        <div className={classes.Title}>Total Amount</div>
        <div className={classes.Value}>
          Rs.{order.totalAmount || order.totalPrice}
        </div>
      </div>
      <div className={classes.Field}>
        <div className={classes.Title}>Payment Method</div>
        <div className={classes.Value}>{order.paymentMethod}</div>
      </div>
      <div className={classes.Field}>
        <div className={classes.Title}>Order status</div>
        {toggle ? (
          <select
            defaultValue={orderdetail.orderStatus}
            onChange={(e) =>
              setDetail({ ...orderdetail, orderStatus: e.target.value })
            }
          >
            <option value="Order placed">Order placed</option>
            <option value="Packed">Packed</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
          </select>
        ) : (
          <div className={classes.Value}> {order.orderStatus}</div>
        )}
      </div>
      <div className={classes.Field}>
        <div className={classes.Title}>Payment Status</div>
        {toggle ? (
          <select
            value={orderdetail.isPaid}
            onChange={(e) =>
              setDetail({ ...orderdetail, isPaid: e.target.value })
            }
          >
            <option value={true}>Paid</option>
            <option value={false}>Not Paid</option>
          </select>
        ) : (
          <div className={classes.Value}>
            {order.isPaid ? "Paid" : "Not Paid"}
          </div>
        )}
      </div>
      <div className={classes.UserDetail}>
        <div className={classes.Field}>
          <div className={classes.Title}>Name</div>
          <div className={classes.Value}> {order.shippingAddress.fullName}</div>
        </div>
        <div className={classes.Field}>
          <div className={classes.Title}>Phone</div>
          <div className={classes.Value}> {order.shippingAddress.phone}</div>
        </div>
        <div className={classes.Field}>
          <div className={classes.Title}>Addresss</div>
          <div className={classes.Value}> {order.shippingAddress.address}</div>
        </div>
        <div className={classes.Field}>
          <div className={classes.Title}>City</div>
          <div className={classes.Value}>{order.shippingAddress.city}</div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    editOrder: (orderId, isPaid, orderStatus, order) =>
      dispatch(EditOrder(orderId, isPaid, orderStatus, order)),
  };
};

export default connect(null, mapDispatchToProps)(OrderListItem);
