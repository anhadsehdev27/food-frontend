import { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={ ` w-20 sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isOpen ? '✕' : '☰'}
            </button>

            <div className="sidebar-menu">
                <h3>Dashboard</h3>
                <ul>
                    <li>
                        <Link to="/home"> Home</Link>
                    </li>
                    <li>
                        <Link to="/user"> Register Users</Link>
                    </li>
                    <li>
                        <Link to="/list/users">List Registered Users</Link>
                    </li>
                    <li>

                        <Link to="/Menu"> Menu</Link>
                    </li>
                    <li>

                        <Link to="/ListMenu">Show Menu</Link>
                    </li>
                    <li>

                        <Link to="/Item"> Item</Link>
                    </li>
                    <li>

                        <Link to="/ListItem">Show Item</Link>
                    </li>
                    <li>
                        <Link to="/Restaurant"> Register Restaurants</Link>
                    </li>
                    <li>
                        <Link to="/ListRestaurant">List Registered Restaurants</Link>
                    </li>
                    <li>
                        <Link to="/RegisterResMenu">Register Restaurant Menu</Link>
                    </li>
                    <li>
                        <Link to="/ListResMenu">Show Restaurant Menu</Link>
                    </li>

                </ul>
            </div>
        </div>
    );
}
