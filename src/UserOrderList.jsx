import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./api/base";
import "./css/ResOrderList.css";

export default function UserOrderList() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser !== "") {
            fetchUserOrders();
        }
    }, [selectedUser]);

    const fetchUsers = async () => {

        try {

            const result = await axios.get(
                `${API_BASE_URL}/list/users`
            );

            if (result.status === 200) {
                setUsers(result.data);
            }

        } catch (error) {

            console.log(error);
            toast.error("Unable to fetch users");

        }

    };

    const fetchUserOrders = async () => {

        try {

            const [
                ordersRes,
                orderItemRes,
                restaurantMenuRes,
                restaurantRes,
                itemRes
            ] = await Promise.all([

                axios.get(`${API_BASE_URL}/orders`),
                axios.get(`${API_BASE_URL}/order-item`),
                axios.get(`${API_BASE_URL}/restaurant-menu`),
                axios.get(`${API_BASE_URL}/restaurant`),
                axios.get(`${API_BASE_URL}/item`)

            ]);

            const allOrders = ordersRes.data;
            const orderItems = orderItemRes.data;
            const restaurantMenus = restaurantMenuRes.data;
            const restaurants = restaurantRes.data;
            const items = itemRes.data;

            console.log("Orders", allOrders);
            console.log("Order Items", orderItems);
            console.log("Restaurant Menus", restaurantMenus);
            console.log("Restaurants", restaurants);
            console.log("Items", items);

            // Orders placed by selected user
            const userOrders = allOrders.filter(
                order =>
                    Number(order.users_id) ===
                    Number(selectedUser)
            );

            console.log("User Orders", userOrders);

            const orderIds = userOrders.map(
                order => order.id
            );

            console.log("Order IDs", orderIds);

            const userOrderItems = orderItems.filter(
                orderItem =>
                    orderIds.includes(
                        Number(orderItem.order_id)
                    )
            );

            console.log("User Order Items", userOrderItems);

            const finalOrders = userOrderItems.map(orderItem => {

                const order = userOrders.find(
                    o =>
                        Number(o.id) ===
                        Number(orderItem.order_id)
                );

                if (!order) return null;

                const item = items.find(
                    i =>
                        Number(i.id) ===
                        Number(orderItem.item_id)
                );

                const restaurantMenu = restaurantMenus.find(
                    rm =>
                        Number(rm.id) ===
                        Number(orderItem.restaurant_menu_id)
                );

                const restaurant = restaurants.find(
                    r =>
                        Number(r.id) ===
                        Number(restaurantMenu?.restaurant_id)
                );

                return {

                    orderId: order.id,

                    orderNo: order.order_no,

                    restaurant:
                        restaurant
                            ? restaurant.restaurant_name
                            : "Unknown",

                    itemName:
                        item
                            ? item.item_name
                            : "Unknown",

                    quantity: orderItem.quantity,

                    unitPrice: orderItem.unit_price,

                    totalPrice: orderItem.total_price,

                    status: order.order_status,

                    orderDate: order.order_datetime,

                    veg: item?.is_veg

                };

            });

            setOrders(finalOrders.filter(Boolean));

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to fetch user orders");

        }

    };

    const filteredOrders = orders.filter(order =>

        order.orderNo
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        order.restaurant
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        order.itemName
            .toLowerCase()
            .includes(search.toLowerCase())

    );

       return (

        <div className="restaurant-orders-page">

            <div className="top-section">

                <h2>
                    User Orders
                </h2>

                <div className="filters">

                    <select
                        value={selectedUser}
                        onChange={(e) =>
                            setSelectedUser(e.target.value)
                        }
                    >

                        <option value="">
                            Select User
                        </option>

                        {users.map((user) => (

                            <option
                                key={user.id}
                                value={user.id}
                            >
                                {user.full_name}
                            </option>

                        ))}

                    </select>

                    <input
                        type="text"
                        placeholder="Search Order / Restaurant / Item"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

            </div>

            {

                selectedUser === ""

                    ?

                    (

                        <div className="empty">

                            Please select a user.

                        </div>

                    )

                    :

                    (

                        <div className="table-container">

                            <table>

                                <thead>

                                    <tr>

                                        <th>Order No</th>

                                        <th>Restaurant</th>

                                        <th>Food Item</th>

                                        <th>Type</th>

                                        <th>Qty</th>

                                        <th>Unit Price</th>

                                        <th>Total</th>

                                        <th>Status</th>

                                        <th>Date</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        filteredOrders.length === 0

                                            ?

                                            (

                                                <tr>

                                                    <td
                                                        colSpan="9"
                                                        className="no-data"
                                                    >

                                                        No Orders Found

                                                    </td>

                                                </tr>

                                            )

                                            :

                                            (

                                                filteredOrders.map((order, index) => (

                                                    <tr key={index}>

                                                        <td>

                                                            {order.orderNo}

                                                        </td>

                                                        <td>

                                                            {order.restaurant}

                                                        </td>

                                                        <td>

                                                            {order.itemName}

                                                        </td>

                                                        <td>

                                                            {

                                                                order.veg

                                                                    ?

                                                                    <span className="veg">

                                                                        Veg

                                                                    </span>

                                                                    :

                                                                    <span className="nonveg">

                                                                        Non Veg

                                                                    </span>

                                                            }

                                                        </td>

                                                        <td>

                                                            {order.quantity}

                                                        </td>

                                                        <td>

                                                            ₹ {order.unitPrice}

                                                        </td>

                                                        <td>

                                                            ₹ {order.totalPrice}

                                                        </td>

                                                        <td>

                                                            <span
                                                                className={`status ${order.status.toLowerCase()}`}
                                                            >

                                                                {order.status}

                                                            </span>

                                                        </td>

                                                        <td>

                                                            {

                                                                new Date(
                                                                    order.orderDate
                                                                ).toLocaleString()

                                                            }

                                                        </td>

                                                    </tr>

                                                ))

                                            )

                                    }

                                </tbody>

                            </table>

                        </div>

                    )

            }

        </div>

    );

}