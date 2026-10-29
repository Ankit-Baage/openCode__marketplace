import React, { useState } from "react";
import useGetOrdersList from "../../tanstack-query/ordersList/useGetOrdersList";
import classes from "./ordersPage.module.css";
import { SearchBar } from "../../components/ui/searchBarWithBackBtn/SearchBar";
import { Order } from "../../components/order/Order";
import { CartLoader } from "../../components/cart/cartLoader/CartLoader";
import { EmptyOrder } from "../../components/order/EmptyOrder";
import Cookies from "js-cookie";

const tabs = [
  { id: 1, title: "All" },
  { id: 2, title: "Complete" },
  { id: 3, title: "Pending" },
  { id: 4, title: "Cancelled" },
];

export const OrdersPage = () => {
  const [status, setStatus] = useState(null);
  const { data, isSuccess, isLoading } = useGetOrdersList(status);
  const placeholder = "Search...";

  const cookiesAtOrdersPage = Cookies.get("authToken");
  console.log(cookiesAtOrdersPage);
  console.log("cookiesAtOrdersPage ", cookiesAtOrdersPage);

  const orders = data?.data?.data ?? [];

  return (
    <div className={classes.box}>
      <div className={classes.box__intro}>
        <h1 className={classes.box__intro__title}>My Orders</h1>
      </div>

      <div className={classes.box__orders}>
        {isLoading ? (
          <CartLoader />
        ) : isSuccess && orders.length > 0 ? (
          orders.map((order) => <Order key={order.id} order={order} />)
        ) : (
          <EmptyOrder />
        )}
      </div>
    </div>
  );
};
