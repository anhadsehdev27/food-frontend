import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/base";

export default function ListRestaurant() {
    const [tableData, setTableData] = useState([]);

    const fetchRestaurantData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/restaurant`);

            if (response.status === 200) {
                setTableData(response.data);
            }
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    useEffect(() => {
        fetchRestaurantData();
    }, []);

    return (
        <div>
            <h2>Registered Restaurants</h2>

            <table border="1" borderColor="black">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Restaurant Name</th>
                        <th>Owner Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pincode</th>
                        <th>GST Number</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.length > 0 ? (
                        tableData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.restaurant_name}</td>
                                <td>{item.owner_name}</td>
                                <td>{item.email}</td>
                                <td>{item.mobile_no}</td>
                                <td>{item.address}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{item.pincode}</td>
                                <td>{item.gst_number}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" style={{ textAlign: "center" }}>
                                No restaurants found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}