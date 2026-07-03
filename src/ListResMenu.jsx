import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/base";

export default function ListResMenu() {

    const [tableData, setTableData] = useState([]);

    const fetchRestaurantMenu = async () => {
        try {

            const response = await axios.get(`${API_BASE_URL}/restaurant-menu`);

            if (response.status === 200) {
                setTableData(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRestaurantMenu();
    }, []);

    return (
        <div>

            <h2>Registered Restaurant Menu</h2>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Restaurant ID</th>
                        <th>Item ID</th>
                        <th>Menu ID</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Available</th>
                        <th>Created At</th>
                    </tr>

                </thead>

                <tbody>

                    {tableData.length > 0 ? (

                        tableData.map((menu) => (

                            <tr key={menu.id}>

                                <td>{menu.id}</td>
                                <td>{menu.restaurant_id}</td>
                                <td>{menu.item_id}</td>
                                <td>{menu.menu_id}</td>
                                <td>{menu.description}</td>
                                <td>{menu.price}</td>
                                <td>{menu.discount}</td>
                                <td>{menu.is_available ? "Yes" : "No"}</td>
                                <td>{menu.created_at}</td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan="9" style={{ textAlign: "center" }}>
                                No Restaurant Menu Found
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}