import { useEffect, useState } from "react"
import { API_BASE_URL } from "./api/base"
import "./css/listMenu.css";
import axios from "axios"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ListMenu() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const data = await axios.get(`${API_BASE_URL}/menu`)
        if (data.status == 200) {
            setTableData(data.data);
        }
    }

    useEffect(() => {
        console.log("I am inside the use effect ===========")
        fetchUserData();
    }, [])

    const handleDelete = async  (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    
    if (isConfirmed) {
      // Proceed with deletion logic
       const result = await axios.delete(`${API_BASE_URL}/menu/${id}`)
        if(result.status == 200){
            toast.info("Data has been deleted successfully")
            navigate("/ListMenu")
        }
    } } 
    return (
        <div>
            <h2>Registered Menu</h2>
            <table border="1" bordercolor="black" width={"100%"}>
                <tr><th>ID</th>
                    <th>Name</th>
<th style={{ textAlign: "center" }}>Actions</th>
                </tr>

                {tableData.length > 0 ? tableData.map(item => (
                    <>
                        <tr>

                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <button className="btn btn-edit" value={item.id} onClick={() => navigate(`/Menu/${item.id}`)}>Edit</button>
                                <button className="btn btn-delete" value={item.id} onClick={() => handleDelete(item.id)}>Delete</button>

                            </td>
                        </tr>

                    </>
                )) : 'No data found'}


            </table>
        </div>
    )
}