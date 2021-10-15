import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import { Edit, Check, Cancel } from "@mui/icons-material";

import { connect } from "react-redux";
import moment from "moment";

import { orderActions } from "../../store/actions/orders";

const Order = ({ order, editOrder }) => {
  const [edit, toggleEdit] = useState(false);
  const [status, setStatus] = useState(
    order.orderStatus.toLowerCase() === "order placed"
      ? "Order Placed"
      : order.orderStatus
  );
  const [paid, setPaid] = useState(order.paid);

  const [bgColor, setBgColor] = useState("#FCC4C9");

  useEffect(() => {
    setBgColor(statusBg(status));
  }, [status]);

  const submit = () => {
    if (edit) {
      editOrder(order._id, paid, status, order);
    }
  };

  return (
    <div>
      <Mui.Card elevation={4}>
        <Mui.CardHeader
          title={order.buyFrom}
          subheader={moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          action={
            <>
              {edit && (
                <Mui.IconButton
                  aria-label="settings"
                  onClick={() => {
                    setStatus(
                      order.orderStatus.toLowerCase() === "order placed"
                        ? "Order Placed"
                        : order.orderStatus
                    );
                    setPaid(order.paid);
                    toggleEdit((prev) => !prev);
                  }}
                >
                  <Cancel fontSize="small" />
                </Mui.IconButton>
              )}
              <Mui.IconButton
                aria-label="settings"
                onClick={() => {
                  submit();
                  toggleEdit((prev) => !prev);
                }}
              >
                {edit ? <Check fontSize="small" /> : <Edit fontSize="small" />}
              </Mui.IconButton>
            </>
          }
          sx={{ paddingBottom: 0 }}
        />
        <Mui.CardContent>
          {order.orderItems.map((item) => (
            <OrderItem key={item._id} item={item} />
          ))}
          <Mui.Divider />
          <div style={styles.item.container}>
            <Mui.Typography sx={{ fontSize: "0.8rem" }}>
              Order Status
            </Mui.Typography>
            {edit ? (
              <ChipSelect
                values={orderStatuses}
                value={status}
                setValue={setStatus}
              />
            ) : (
              <Mui.Chip label={status} sx={{ bgcolor: bgColor }} size="small" />
            )}
          </div>
          <div style={styles.item.container}>
            <Mui.Typography sx={{ fontSize: "0.8rem" }}>
              Payment Status
            </Mui.Typography>
            {edit ? (
              <ChipSelect
                values={paidStatuses}
                value={paid}
                setValue={setPaid}
              />
            ) : (
              <Mui.Chip
                label={paid ? "Paid" : "Pending"}
                sx={{ bgcolor: paid ? "#A2EEAE" : "#FCC4C9" }}
                size="small"
              />
            )}
          </div>
          <div style={styles.item.container}>
            <Mui.Typography sx={{ fontSize: "0.8rem" }}>
              Payment Method
            </Mui.Typography>
            <Mui.Typography sx={{ fontSize: "0.8rem" }}>
              {order.paymentMethod}
            </Mui.Typography>
          </div>
          <div style={styles.item.container}>
            <Mui.Typography sx={{ fontSize: "0.8rem" }}>
              Delivery Charge
            </Mui.Typography>
            <Mui.Typography sx={{ fontSize: "0.8rem" }}>
              &#8377;{order.deliveryCharge}
            </Mui.Typography>
          </div>
          <div style={styles.item.container}>
            <Mui.Typography sx={{ fontSize: "0.8rem" }}>
              Total Amount
            </Mui.Typography>
            <Mui.Typography sx={{ fontSize: "0.8rem" }}>
              &#8377;{order.totalAmount} (Tax &#8377;{order.taxAmount})
            </Mui.Typography>
          </div>
          <Mui.Divider />
          <Mui.Typography sx={{ fontSize: "1.2rem" }}>
            {order.shippingAddress.fullName}
          </Mui.Typography>
          <Mui.Typography
            sx={{ fontSize: "0.8rem", fontWeight: "bold" }}
            color="text.secondary"
          >
            {"+91 " + order.shippingAddress.phone}
          </Mui.Typography>
          <Mui.Typography sx={{ fontSize: "0.8rem" }}>
            {order.shippingAddress.address}
          </Mui.Typography>
          <Mui.Typography sx={{ fontSize: "0.8rem" }} color="text.secondary">
            {`${order.shippingAddress.city} - ${order.shippingAddress.pincode}, ${order.shippingAddress.state}.`}
          </Mui.Typography>
        </Mui.CardContent>
      </Mui.Card>
    </div>
  );
};

const ChipSelect = ({ values, value, setValue }) => {
  return (
    <Mui.FormControl margin="dense" sx={{ padding: 0, margin: 0 }} size="small">
      <Mui.Select
        labelId="label"
        autoWidth
        sx={{
          margin: 0,
          padding: 0,
          height: "1.5rem",
          borderRadius: "2rem",
          fontSize: "0.68rem",
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {values.map((menu) => (
          <Mui.MenuItem key={menu.value} value={menu.value}>
            {menu.title}
          </Mui.MenuItem>
        ))}
      </Mui.Select>
    </Mui.FormControl>
  );
};

const OrderItem = ({ item }) => {
  return (
    <div style={styles.item.container}>
      <div>{item.name}</div>
      <Mui.Chip label={`Quantity ${item.quantity}`} size="small" />
    </div>
  );
};

const styles = {
  item: {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "0.6rem 0",
    },
  },
};

const orderStatuses = [
  { title: "Order Placed", value: "Order Placed" },
  { title: "Confirmed", value: "Confirmed" },
  { title: "Packed", value: "Packed" },
  { title: "Out For Delivery", value: "Out For Delivery" },
  { title: "Delivered", value: "Delivered" },
];

const paidStatuses = [
  { title: "Pending", value: false },
  { title: "Paid", value: true },
];

const statusBg = (status) => {
  switch (status.toLowerCase()) {
    case "order placed":
      return "#FCC4C9";

    case "packed":
      return "#FBBC58";

    case "confirmed":
      return "#FBBC58";

    case "out for delivery":
      return "#A2EEAE";

    case "delivered":
      return "#A2EEAE";

    case "canceled":
      return "#eeeeee";

    default:
      return "#FCC4C9";
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateOrder: (orderId, paid, orderStatus, ifNeeded) =>
      dispatch(orderActions.update(orderId, paid, orderStatus, ifNeeded)),
  };
};

export default connect(null, mapDispatchToProps)(Order);
