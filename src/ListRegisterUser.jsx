import { useEffect, useState } from "react"
import { API_BASE_URL } from "./api/base"
import axios from "axios"

export default function ListRegisterUser() {
    const [tableData, setTableData] = useState([]);
    
    
    const fetchUserData = async () => {
       const data =   await axios.get(`${API_BASE_URL}/list/users`)
        if(data.status == 200) {
            setTableData(data.data);
        }
    }

    useEffect(() => {
        console.log("I am inside the use effect ===========")
        fetchUserData();
    }, [])

    return (
        <div>
            <h2>Registered Users</h2>
            <table border="1" bordercolor="black">
                <tr><th>ID</th>
                <th>Full name</th>
                <th>Mobile</th>
                <th>email </th>
                <th>password</th>
                </tr>

                {tableData.length > 0 ? tableData.map( item => (
                    <>
                                    <tr>

                    <td>{item.id}</td>
                    <td>{item.full_name}</td>
                    <td>{item.mobile_no}</td>
                    <td>{item.email}</td>
                    <td>{item.password_hash}</td>
                                    </tr>

                    </>
                )) : 'No data found'}
                
                
            </table>
        </div>
    )
}