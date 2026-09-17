import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Order.css";
import { API_BASE_URL } from "./api/base";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function Orders() {

    const navigate = useNavigate();

    const [restaurantMenus, setRestaurantMenus] = useState([]);
    const [items, setItems] = useState([]);
    const [users, setUsers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    const [selectedUser, setSelectedUser] = useState("");
    const [selectedRestaurant, setSelectedRestaurant] = useState("");

    const [cart, setCart] = useState([]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {

        fetchUsers();
        fetchRestaurants();
        fetchRestaurantMenu();
        fetchItems();

    }, []);

    const fetchUsers = async () => {

        try {

            const result = await axios.get(
                `${API_BASE_URL}/list/users`
            );

            if (result.status === 200) {
                setUsers(result.data);
            }

        } catch (error) {

            console.log(error);
            toast.error("Unable to fetch users");

        }

    };

    const fetchRestaurants = async () => {

        try {

            const result = await axios.get(
                `${API_BASE_URL}/restaurant`
            );

            if (result.status === 200) {

                setRestaurants(result.data);

            }

        } catch (error) {

            console.log(error);
            toast.error("Unable to fetch restaurants");

        }

    };

    const fetchRestaurantMenu = async () => {

        try {

            const result = await axios.get(
                `${API_BASE_URL}/restaurant-menu`
            );

            if (result.status === 200) {

                setRestaurantMenus(result.data);

            }

        } catch (error) {

            console.log(error);
            toast.error("Unable to fetch restaurant menu");

        }

    };

    const fetchItems = async () => {

        try {

            const result = await axios.get(
                `${API_BASE_URL}/item`
            );

            if (result.status === 200) {

                setItems(result.data);

            }

        } catch (error) {

            console.log(error);
            toast.error("Unable to fetch items");

        }

    };
    

    const filteredItems = restaurantMenus

        .filter(menu =>

            Number(menu.restaurant_id) ===
            Number(selectedRestaurant)

            &&

            menu.is_available

        )

        .map(menu => {

            const item = items.find(
                i => Number(i.id) === Number(menu.item_id)
            );

            return {

                restaurant_menu_id: menu.id,

                restaurant_id: menu.restaurant_id,

                item_id: menu.item_id,

                item_name: item?.item_name,

                is_veg: item?.is_veg,

                price: menu.price,

                menu_id: menu.menu_id

            };

        })

        .filter(item => {

            const searchMatch =
                item.item_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const vegMatch =

                filter === "All"

                ||

                (filter === "Veg" && item.is_veg)

                ||

                (filter === "Non Veg" && !item.is_veg);

            return searchMatch && vegMatch;

        });

    const addToCart = (item) => {

        const existing = cart.find(
            c => c.restaurant_menu_id === item.restaurant_menu_id
        );

        if (existing) {

            const updated = cart.map(c =>

                c.restaurant_menu_id === item.restaurant_menu_id

                    ? {

                        ...c,

                        quantity: c.quantity + 1,

                        total_price:
                            (c.quantity + 1) * c.unit_price

                    }

                    : c

            );

            setCart(updated);

        }

        else {

            setCart([

                ...cart,

                {

                    restaurant_menu_id: item.restaurant_menu_id,

                    item_id: item.item_id,

                    item_name: item.item_name,

                    quantity: 1,

                    unit_price: item.price,

                    total_price: item.price

                }

            ]);

        }

    };
        const goToCart = () => {

        if (!selectedUser) {
            toast.error("Please select a user");
            return;
        }

        if (!selectedRestaurant) {
            toast.error("Please select a restaurant");
            return;
        }

        if (cart.length === 0) {
            toast.error("Please add at least one item");
            return;
        }

        navigate("/OrderItem", {
            state: {
                cart,
                selectedUser,
                selectedRestaurant
            }
        });

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Select User</h2>

            <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                style={{
                    width: "250px",
                    padding: "10px",
                    marginBottom: "20px"
                }}
            >
                <option value="">Select User</option>

                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.full_name}
                    </option>
                ))}

            </select>

            <br /><br />

            <h2>Select Restaurant</h2>

            <select
                value={selectedRestaurant}
                onChange={(e) => {
                    setSelectedRestaurant(e.target.value);
                    setCart([]);
                }}
                style={{
                    width: "250px",
                    padding: "10px",
                    marginBottom: "20px"
                }}
            >
                <option value="">Select Restaurant</option>

                {restaurants.map((restaurant) => (

                    <option
                        key={restaurant.id}
                        value={restaurant.id}
                    >
                        {restaurant.restaurant_name}
                    </option>

                ))}

            </select>

            <h2>Food Menu</h2>

            <input
                type="text"
                placeholder="Search Item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "250px",
                    padding: "8px",
                    marginRight: "15px"
                }}
            />

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{
                    padding: "8px"
                }}
            >
                <option>All</option>
                <option>Veg</option>
                <option>Non Veg</option>
            </select>

            <br /><br />

            <table
                border="1"
                width="100%"
                cellPadding="10"
            >

                <thead>

                    <tr>

                        <th>Restaurant Menu ID</th>

                        <th>Item</th>

                        <th>Price</th>

                        <th>Type</th>

                        <th>Add</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredItems.length === 0 ? (

                        <tr>

                            <td colSpan="5" align="center">

                                No Items Found

                            </td>

                        </tr>

                    ) : (

                        filteredItems.map((item) => (

                            <tr
                                key={item.restaurant_menu_id}
                            >

                                <td>
                                    {item.restaurant_menu_id}
                                </td>

                                <td>
                                    {item.item_name}
                                </td>

                                <td>
                                    ₹ {item.price}
                                </td>

                                <td>
                                    {item.is_veg
                                        ? "Veg"
                                        : "Non Veg"}
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            addToCart(item)
                                        }
                                    >
                                        Add To Order
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

            <br />

            <h3>

                Items in Cart : {cart.length}

            </h3>

            <button
                onClick={goToCart}
                style={{
                    padding: "12px 25px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px"
                }}
            >
                Go To Cart
            </button>

        </div>

    );

}