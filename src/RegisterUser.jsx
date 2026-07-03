// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React, { useState } from  "react";
import { useForm, ValidationError } from "@formspree/react";
import "./css/RegisterUser.css";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Replace with your actual API base URL
export default function RegisterUser() {
    const [formState, setFormState] = useState({
        full_name: '',
        email: '',
        mobile_no: '',
        password_hash: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await axios.post(`${API_BASE_URL}/users`, formState);
        if(response.status === 200) {
             toast.success("Menu item added successfully!");
             setFormState({  full_name: '',
        email: '',
        mobile_no: '',
        password_hash: ''});
        }

    }
    return (
        <form className="fs-form fs-layout__2-column" onSubmit={handleSubmit}>
            <fieldset>
                <div className="fs-field">
                    <label className="fs-label" htmlFor="full-name">
                        Full-Name
                    </label>
                    <input
                        className="fs-input"
                        id="full-name"
                        name="full_name"
                        value={formState.full_name}
                        onChange={(e) => setFormState({ ...formState, full_name: e.target.value })}
                        required
                    />
                </div>
                <div className="fs-field">
                    <label className="fs-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="fs-input"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required />
                </div>
            </fieldset>
            <fieldset>

                <div className="fs-field">
                    <label className="fs-label" htmlFor="number">
                        Contact Number
                    </label>
                    <input
                        className="fs-input"
                        id="number"
                        name="mobile_no"
                        placeholder="(000) 000-0000"
                        value={formState.mobile_no}
                        onChange={(e) => setFormState({ ...formState, mobile_no: e.target.value })}
                        required
                    />
                </div>

                <div className="fs-field">
                    <label className="fs-label" htmlFor="number">
                        Password
                    </label>
                    <input
                        type="password"
                        className="fs-input"
                        id="number"
                        name="password_hash"
                        placeholder="#######"
                        value={formState.password_hash}
                        onChange={(e) => setFormState({ ...formState, password_hash: e.target.value })}
                        required
                    />
                </div>
            </fieldset>

            <div class="fs-button-group">
                <button className="fs-button" type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
}