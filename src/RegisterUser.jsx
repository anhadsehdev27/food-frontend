import React, { useState } from "react";
import "./css/RegisterUser.css";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export default function RegisterUser({ onRegisterSuccess }) {

    const [formState, setFormState] = useState({
        full_name: "",
        email: "",
        mobile_no: "",
        password: "",
        
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                `${API_BASE_URL}/users`,
                formState
            );

            if (response.status === 200) {

                toast.success("Registration Successful");

                setFormState({
                    full_name: "",
                    email: "",
                    mobile_no: "",
                    password: "",
                    
                });

                if (onRegisterSuccess) {
                    onRegisterSuccess();
                }
            }

        } catch (error) {

            toast.error("Registration Failed");
        }
    };

    return (

        <form
            className="fs-form fs-layout__2-column"
            onSubmit={handleSubmit}
        >

            <fieldset>

                <div className="fs-field">

                    <label className="fs-label">
                        Full Name
                    </label>

                    <input
                        className="fs-input"
                        value={formState.full_name}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                full_name: e.target.value,
                            })
                        }
                        required
                    />

                </div>

                <div className="fs-field">

                    <label className="fs-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="fs-input"
                        value={formState.email}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                email: e.target.value,
                            })
                        }
                        required
                    />

                </div>

            </fieldset>

            <fieldset>

                <div className="fs-field">

                    <label className="fs-label">
                        Mobile Number
                    </label>

                    <input
                        className="fs-input"
                        value={formState.mobile_no}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                mobile_no: e.target.value,
                            })
                        }
                        required
                    />

                </div>

                <div className="fs-field">

                    <label className="fs-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="fs-input"
                        value={formState.password}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                password: e.target.value,
                            })
                        }
                        required
                    />

                </div>

            </fieldset>

            <div className="fs-button-group">

                <button
                    className="fs-button"
                    type="submit"
                >
                    Create Account
                </button>

            </div>

        </form>

    );
}