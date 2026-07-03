import { useEffect, useState } from "react";
import { API_BASE_URL } from "./api/base";
import "./css/listItem.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ListItem() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();

    const fetchItemData = async () => {
        try {
            const result = await axios.get(`${API_BASE_URL}/item`);

            if (result.status === 200) {
                setTableData(result.data);
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to fetch items");
        }
    };

    useEffect(() => {
        fetchItemData();
    }, []);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (isConfirmed) {
            try {
                const result = await axios.delete(`${API_BASE_URL}/item/${id}`);

                if (result.status === 200) {
                    toast.success("Item deleted successfully");
                    fetchItemData(); // Refresh table
                }
            } catch (error) {
                console.log(error);
                toast.error("Delete failed");
            }
        }
    };

    return (
        <div>
            <h2>Registered Items</h2>

            <table border="1" borderColor="black" width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th>Menu ID</th>
                        <th>Veg / Non-Veg</th>
                        <th>Status</th>
                        <th style={{ textAlign: "center" }}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.length > 0 ? (
                        tableData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.item_name}</td>
                                <td>{item.menu_id}</td>
                                <td>{item.is_veg}</td>
                                <td>
                                    {item.status === 1 ? "Active" : "Inactive"}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-edit"
                                        onClick={() =>
                                            navigate(`/item/${item.id}`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-delete"
                                        onClick={() =>
                                            handleDelete(item.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}