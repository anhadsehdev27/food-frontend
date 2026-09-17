import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const API_BASE_URL = "http://localhost:8000";

export default function LoginUser() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            let user = null;

try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
    user = null;
}

            if (user) {
                if (user.role_id === 1) {
                    navigate("/home");
                } else if (user.role_id === 2) {
                    navigate("/home");
                } else if (user.role_id === 3) {
                    navigate("/home");
                }
            }
        }
    }, [token, navigate]);

    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                {
                    email: formState.email,
                    password: formState.password,
                }
            );

            localStorage.setItem("token", "loggedin");
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setFormState({
                email: "",
                password: "",
            });

            toast.success("Login Successful");

            const roleId = response.data.user.role_id;

            if (roleId === 1) {
                navigate("/home");
            } else if (roleId === 2) {
                navigate("/home");
            } else if (roleId === 3) {
                navigate("/home");
            } else {
                navigate("/");
            }
        } catch (error) {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="login-page">
            <form
                className="fs-form fs-layout__2-column"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <fieldset className="form-container">
                    <div>
                        <label className="fs-label">
                            Email
                        </label>

                        <input
                            className="fs-input"
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            autoComplete="off"
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

                    <br />

                    <div>
                        <label className="fs-label">
                            Password
                        </label>

                        <input
                            className="fs-input"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            autoComplete="new-password"
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

                    <div className="fs-button-group">
                        <button className="fs-button" type="submit">
                            Login
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}