import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { API_BASE_URL } from "./api/base";
import { toast } from "react-toastify";
import "./css/Payment.css";
export default function Payment() {

    const location = useLocation();

    const [payment, setPayment] = useState({
        order_id: location.state?.order_id || "",
        amount: location.state?.amount || "",
        payment_method: "",
        transaction_id: "",
        payment_status: "PENDING",
        gateway_response: "",
        created_at: "",
        paid_at: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(`${API_BASE_URL}/payment`, payment);

            if (response.status === 200 || response.status === 201) {
                toast.success("Payment Successful");

                setPayment({
                    order_id: "",
                    amount: "",
                    payment_method: "",
                    transaction_id: "",
                    payment_status: "PENDING",
                    gateway_response: "",
                    created_at: "",
                    paid_at: ""
                });
            }

        } catch (error) {
            console.log(error);
            toast.error("Payment Failed");
        }
    };

    return (

<div className="payment-page" style={{ padding: "30px" }}>
            <h2>Payment</h2>

<form className="payment-form" onSubmit={handleSubmit}>
                <div>
                    <label>Order ID</label><br />
                    <input
                        value={payment.order_id}
                        onChange={(e) =>
                            setPayment({ ...payment, order_id: e.target.value })
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Amount</label><br />
                    <input
                        value={payment.amount}
                        onChange={(e) =>
                            setPayment({ ...payment, amount: e.target.value })
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Payment Method</label><br />
                    <select
                        value={payment.payment_method}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                payment_method: e.target.value
                            })
                        }
                    >
                        <option value="">Select</option>
                        <option value="UPI">UPI</option>
                        <option value="CARD">CARD</option>
                        <option value="NET BANKING">NET BANKING</option>
                        <option value="COD">COD</option>
                    </select>
                </div>

                <br />

                <div>
                    <label>Transaction ID</label><br />
                    <input
                        value={payment.transaction_id}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                transaction_id: e.target.value
                            })
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Payment Status</label><br />
                    <select
                        value={payment.payment_status}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                payment_status: e.target.value
                            })
                        }
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="SUCCESS">SUCCESS</option>
                        <option value="FAILED">FAILED</option>
                    </select>
                </div>

                <br />

                <div>
                    <label>Gateway Response</label><br />
                    <textarea
                        value={payment.gateway_response}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                gateway_response: e.target.value
                            })
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Created At</label><br />
                    <input
                        type="datetime-local"
                        value={payment.created_at}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                created_at: e.target.value
                            })
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Paid At</label><br />
                    <input
                        type="datetime-local"
                        value={payment.paid_at}
                        onChange={(e) =>
                            setPayment({
                                ...payment,
                                paid_at: e.target.value
                            })
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Make Payment
                </button>

            </form>

        </div>

    );
}