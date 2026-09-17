import { useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const roleId = user?.role_id;

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_name");

        navigate("/");
    };

    const userName = localStorage.getItem("user_name") || "User";

    return (
        <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? "✕" : "☰"}
            </button>

            {/* User Profile */}
            <div className="sidebar-profile">
                <FaUserCircle className="profile-icon" />
                <h4>{userName}</h4>
            </div>

            <div className="sidebar-menu">
                <h3>Dashboard</h3>

                <ul>

                    <li><Link to="/home">Home</Link></li>

                    {/* ================= ADMIN ================= */}

                    {roleId === 1 && (
                        <>
                            <li><Link to="/user">Register Users</Link></li>

                            <li><Link to="/list/users">List Registered Users</Link></li>

                            <li><Link to="/Restaurant">Register Restaurants</Link></li>

                            <li><Link to="/ListRestaurant">List Registered Restaurants</Link></li>
                        </>
                    )}

                    {/* ============ ADMIN + RESTAURANT OWNER ============ */}

                    {(roleId === 1 || roleId === 3) && (
                        <>
                            <li><Link to="/Menu">Menu</Link></li>

                            <li><Link to="/ListMenu">Show Menu</Link></li>

                            <li><Link to="/Item">Item</Link></li>

                            <li><Link to="/ListItem">Show Item</Link></li>

                            <li><Link to="/RegisterResMenu">Register Restaurant Menu</Link></li>

                            <li><Link to="/ListResMenu">Show Restaurant Menu</Link></li>
                        </>
                    )}

                    {/* ================= CUSTOMER ================= */}

                    {roleId === 2 && (
                        <>
                            <li><Link to="/Orders">Order Food</Link></li>

                            <li><Link to="/OrderItem">Cart</Link></li>

                            <li><Link to="/Payment">Payment</Link></li>

                            <li><Link to="/UserOrderList">Users Orders</Link></li>
                        </>
                    )}

                    {/* ============ RESTAURANT OWNER ============ */}

                    {roleId === 3 && (
                        <li><Link to="/ResOrderList">Restaurant Orders</Link></li>
                    )}

                    <li>
                        <button
                            className="fs-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    );
}