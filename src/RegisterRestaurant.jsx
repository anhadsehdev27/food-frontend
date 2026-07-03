import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./css/RegisterRestaurant.css"; // Optional CSS file

const API_BASE_URL = "http://localhost:8000";

export default function RegisterRestaurant() {
    const [formState, setFormState] = useState({
        restaurant_name: "",
        owner_name: "",
        email: "",
        mobile_no: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        gst_number: "",
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_BASE_URL}/restaurant`,
                formState
            );

            if (response.status === 200 || response.status === 201) {
                toast.success("Restaurant registered successfully!");

                setFormState({
                    restaurant_name: "",
                    owner_name: "",
                    email: "",
                    mobile_no: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    gst_number: "",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to register restaurant.");
        }
    };

    return (
        <form className="fs-form" onSubmit={handleSubmit}>

            <div className="fs-field">
                <label>Restaurant Name</label>
                <input
                    type="text"
                    name="restaurant_name"
                    value={formState.restaurant_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>Owner Name</label>
                <input
                    type="text"
                    name="owner_name"
                    value={formState.owner_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>Mobile Number</label>
                <input
                    type="text"
                    name="mobile_no"
                    value={formState.mobile_no}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>Address</label>
                <textarea
                    name="address"
                    value={formState.address}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    value={formState.city}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>State</label>
                <input
                    type="text"
                    name="state"
                    value={formState.state}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>Pincode</label>
                <input
                    type="text"
                    name="pincode"
                    value={formState.pincode}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="fs-field">
                <label>GST Number</label>
                <input
                    type="text"
                    name="gst_number"
                    value={formState.gst_number}
                    onChange={handleChange}
                    required
                />
            </div>

            <button type="submit" className="fs-button">
                Register Restaurant
            </button>
        </form>
    );
}