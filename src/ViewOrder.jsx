import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/base";


export default function ViewOrder() {

    const [tableData, setTableData] = useState([]);

    const fetchOrderItems = async () => {

        try {

            const result = await axios.get(`${API_BASE_URL}/order-item`);

            if(result.status === 200){
                setTableData(result.data);
            }

        } catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        fetchOrderItems();
    },[])

return (
    <div className="order-container">

        <h2>Order Items</h2>

        {[...new Set(tableData.map(item => item.order_id))].map(orderId => {

            const orderItems = tableData.filter(
                item => item.order_id === orderId
            );

            const grandTotal = orderItems.reduce(
                (sum, item) => sum + item.total_price,
                0
            );

            return (
                <div
                    key={orderId}
                    style={{
                        marginBottom: "35px",
                        background: "#fff",
                        borderRadius: "12px",
                        padding: "20px",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
                    }}
                >
                    <h3
                        style={{
                            marginBottom: "15px",
                            color: "#1f2e22"
                        }}
                    >
                        Order ID : {orderId}
                    </h3>

                    <table
                        className="order-table"
                        style={{ width: "100%" }}
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Item ID</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orderItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.item_id}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹ {item.unit_price}</td>
                                    <td>₹ {item.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h4
                        style={{
                            textAlign: "right",
                            marginTop: "15px",
                            color: "#b67b00"
                        }}
                    >
                        Grand Total : ₹ {grandTotal}
                    </h4>
                </div>
            );

        })}

    </div>
);

}