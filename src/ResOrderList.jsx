import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./api/base";
import "./css/ResOrderList.css";

export default function ResOrderList() {

    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("");

    const [orders, setOrders] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (selectedRestaurant !== "") {
            fetchRestaurantOrders();
        }
    }, [selectedRestaurant]);

    const fetchRestaurants = async () => {

        try {

            const result = await axios.get(
                `${API_BASE_URL}/restaurant`
            );

            if (result.status === 200) {
                setRestaurants(result.data);
            }

        } catch (error) {

            console.log(error);
            toast.error("Unable to fetch restaurants");

        }

    };

    const fetchRestaurantOrders = async () => {

        try {

           const [
    restaurantMenuRes,
    ordersRes,
    orderItemRes,
    itemRes,
    userRes
] = await Promise.all([
    axios.get(`${API_BASE_URL}/restaurant-menu`),
    axios.get(`${API_BASE_URL}/orders`),
    axios.get(`${API_BASE_URL}/order-item`),
    axios.get(`${API_BASE_URL}/item`),
    axios.get(`${API_BASE_URL}/list/users`)
]);

const restaurantMenus = restaurantMenuRes.data;
const allOrders = ordersRes.data;
const orderItems = orderItemRes.data;
const items = itemRes.data;
const users = userRes.data;
console.log("restaurantMenus", restaurantMenus);
console.log("orders", allOrders);
console.log("orderItems", orderItems);
console.log("items", items);
console.log("users", users);

            
console.log("Selected Restaurant:", selectedRestaurant);

const ownerMenus = restaurantMenus.filter(
    menu =>
        Number(menu.restaurant_id) ===
        Number(selectedRestaurant)
);

console.log("Owner Menus:", ownerMenus);

const ownerMenuIds = ownerMenus.map(
    menu => menu.id
);

console.log("Owner Menu IDs:", ownerMenuIds);

const ownerOrderItems = orderItems.filter(
    item =>
        ownerMenuIds.includes(Number(item.restaurant_menu_id))
);

console.log("Owner Order Items:", ownerOrderItems);

            const finalOrders = ownerOrderItems.map(orderItem => {

               const order = allOrders.find(
    o => Number(o.id) === Number(orderItem.order_id)
);

if (!order) return null;

               const item = items.find(
    i => Number(i.id) === Number(orderItem.item_id)
);

                const user = users.find(
    u => Number(u.id) === Number(order?.users_id)
);

                return {

                    orderId: order.id,

                    orderNo: order.order_no,

                    customer: user
                        ? user.full_name
                        : "Unknown",

                    itemName: item
                        ? item.item_name
                        : "Unknown",

                    quantity: orderItem.quantity,

                    unitPrice: orderItem.unit_price,

                    totalPrice: orderItem.total_price,

                    status: order.order_status,

                    orderDate: order.order_datetime,

                    veg: item?.is_veg,

                    

                };

            });

            setOrders(finalOrders.filter(Boolean));

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to fetch orders");

        }

    };

    const filteredOrders = orders.filter(order =>

        order.orderNo
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        order.customer
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
                Restaurant Orders
            </h2>

            <div className="filters">

                <select
                    value={selectedRestaurant}
                    onChange={(e) =>
                        setSelectedRestaurant(e.target.value)
                    }
                >

                    <option value="">
                        Select Restaurant
                    </option>

                    {restaurants.map((restaurant) => (

                        <option
                            key={restaurant.id}
                            value={restaurant.id}
                        >
                            {restaurant.restaurant_name}
                        </option>

                    ))}

                </select>

                <input
                    type="text"
                    placeholder="Search Order / Customer / Item"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

        </div>

        {
            selectedRestaurant === "" ?

                (

                    <div className="empty">

                        Please select a restaurant.

                    </div>

                )

                :

                (

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>Order No</th>

                                    <th>Customer</th>

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

                                    filteredOrders.length === 0 ?

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

                                                        {order.customer}

                                                    </td>

                                                    <td>

                                                        {order.itemName}

                                                    </td>

                                                    <td>

                                                        {

                                                            order.veg ?

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