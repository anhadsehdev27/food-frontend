import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./api/base";


export default function RegisterResMenu() {

    const [restaurants, setRestaurants] = useState([]);
    const [items, setItems] = useState([]);
    const [menus, setMenus] = useState([]);

    const [formState, setFormState] = useState({
        restaurant_id: "",
        item_id: "",
        menu_id: "",
        description: "",
        price: "",
        discount: "",
        is_available: true
    });

    useEffect(() => {
        fetchRestaurants();
        fetchItems();
        fetchMenus();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/restaurant`);
            if (response.status === 200) {
                setRestaurants(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/item`);
            if (response.status === 200) {
                setItems(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMenus = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/menu`);
            if (response.status === 200) {
                setMenus(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormState({
            ...formState,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const payload = {
                restaurant_id: Number(formState.restaurant_id),
                item_id: Number(formState.item_id),
                menu_id: Number(formState.menu_id),
                description: formState.description,
                price: Number(formState.price),
                discount:
                    formState.discount === ""
                        ? null
                        : Number(formState.discount),
                is_available: formState.is_available,
            };

            const response = await axios.post(
                `${API_BASE_URL}/restaurant-menu`,
                payload
            );

            if (response.status === 200 || response.status === 201) {

                toast.success("Restaurant Menu Registered Successfully");

                setFormState({
                    restaurant_id: "",
                    item_id: "",
                    menu_id: "",
                    description: "",
                    price: "",
                    discount: "",
                    is_available: true
                });
            }

        } catch (error) {
            console.log(error);

            if (error.response) {
                console.log(error.response.data);
            }

            toast.error("Failed to Register Restaurant Menu");
        }
    };

    return (
        <form className="fs-form" onSubmit={handleSubmit}>

            <div className="fs-field">
                <label>Restaurant</label>

                <select
                    name="restaurant_id"
                    value={formState.restaurant_id}
                    onChange={handleChange}
                    required
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
            </div>

            <div className="fs-field">
                <label>Menu</label>

                <select
                    name="menu_id"
                    value={formState.menu_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Menu</option>

                    {menus.map((menu) => (
                        <option
                            key={menu.id}
                            value={menu.id}
                        >
                            {menu.name}
                        </option>
                    ))}
                </select>
            </div>



            <div className="fs-field">
                <label>Item</label>

                <select
                    name="item_id"
                    value={formState.item_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Item</option>

                    {items.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.item_name}
                        </option>
                    ))}
                </select>
            </div>

           
            <div className="fs-field">
                <label>Description</label>

                <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                />
            </div>

            <div className="fs-field">
                <label>Price</label>

                <input
                    type="number"
                    step="1"
                    name="price"
                    value={formState.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>Discount</label>

                <input
                    type="number"
                    step="1"
                    name="discount"
                    value={formState.discount}
                    onChange={handleChange}
                />
            </div>

            <div className="fs-field">
                <label>
                    <input
                        type="checkbox"
                        name="is_available"
                        checked={formState.is_available}
                        onChange={handleChange}
                    />
                    Available
                </label>
            </div>

            <button type="submit" className="fs-button">
                Register Restaurant Menu
            </button>

        </form>
    );
}