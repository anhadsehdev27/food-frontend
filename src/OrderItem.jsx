import React, { useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./api/base";

export default function OrderItem() {

    const { state } = useLocation();
    

    const [cart, setCart] = useState(state?.cart || []);
    console.log(cart);
    const [selectedUser] = useState(state?.selectedUser || "");
    const [selectedRestaurant] = useState(
    state?.selectedRestaurant || ""
);

    const increaseQty = (id) => {

        setCart(
            cart.map((item) =>
                item.item_id === id
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                          total_price:
                              (item.quantity + 1) * item.unit_price,
                      }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {

        const updated = cart
            .map((item) =>
                item.item_id === id
                    ? {
                          ...item,
                          quantity: item.quantity - 1,
                          total_price:
                              (item.quantity - 1) * item.unit_price,
                      }
                    : item
            )
            .filter((item) => item.quantity > 0);

        setCart(updated);
    };

    const grandTotal = cart.reduce(
        (sum, item) => sum + item.total_price,
        0
    );

    const placeOrder = async () => {

        if (!selectedUser) {
            toast.error("Please select a user");
            return;
        }

        if (cart.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        try {

            const orderResponse = await axios.post(
                `${API_BASE_URL}/orders`,
                {
                    order_no: `ORD${Date.now()}`,
                    users_id: Number(selectedUser),
                    restaurant_id: Number(selectedRestaurant),
                    order_status: "Pending",
                    remarks: ""
                }
            );

            const orderId = orderResponse.data.id;

            for (const item of cart) {

                await axios.post(
                    `${API_BASE_URL}/order-item`,
                    {
                        order_id: orderId,
                        restaurant_menu_id: item.restaurant_menu_id,
                        item_id: item.item_id,
                        quantity: item.quantity,
                        unit_price: item.unit_price,
                        total_price: item.total_price
                    }
                );

            }

            toast.success("Order Placed Successfully");

            setCart([]);

        } catch (error) {

            console.log(error);

            toast.error("Unable to place order");

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Your Order</h2>

            {cart.length === 0 ? (

                <h3>Your cart is empty.</h3>

            ) : (

                <>
                    <table
                        border="1"
                        width="100%"
                        cellPadding="10"
                    >

                        <thead>

                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {cart.map((item) => (

                                <tr key={item.item_id}>

                                    <td>{item.item_name}</td>

                                    <td>{item.quantity}</td>

                                    <td>₹ {item.unit_price}</td>

                                    <td>₹ {item.total_price}</td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                decreaseQty(item.item_id)
                                            }
                                        >
                                            -
                                        </button>

                                        &nbsp;&nbsp;

                                        <button
                                            onClick={() =>
                                                increaseQty(item.item_id)
                                            }
                                        >
                                            +
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <br />

                    <h2>
                        Grand Total : ₹ {grandTotal}
                    </h2>

                    <button
                        onClick={placeOrder}
                        style={{
                            padding: "10px 25px",
                            background: "green",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Place Order
                    </button>

                </>

            )}

        </div>

    );

}