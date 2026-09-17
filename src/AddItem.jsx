import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./api/base";
import { useNavigate, useParams } from "react-router";

export default function Item() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formState, setFormState] = useState({
        item_name: "",
        menu_id: "",
        is_veg: "true",
        status: true,
    });

    const fetchSingleItem = async () => {
        try {
            const result = await axios.get(`${API_BASE_URL}/item/${id}`);

            setFormState({
                item_name: result.data.item_name,
                menu_id: result.data.menu_id,
                is_veg: result.data.is_veg,
                status: result.data.status,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSingleItem();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id) {
                const result = await axios.put(
                    `${API_BASE_URL}/item/${id}`,
                    formState
                );

                if (result.status === 200) {
                    toast.success("Item updated successfully");
                    navigate("/ListItem");
                }
            } else {
                const result = await axios.post(
                    `${API_BASE_URL}/item`,
                    formState
                );


                if (result.status === 200 || result.status === 201) {
                    toast.success("Item added successfully");

                    setFormState({
                        item_name: "",
                        menu_id: "",
                        is_veg: "true",
                        status: true,
                    });

                    navigate("/ListItem");
                }
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        }
    };

    return (
        <form
            className="fs-form fs-layout__2-column"
            onSubmit={handleSubmit}
        >
            <h1>{id ? "Edit Item" : "Add Item"}</h1>

            <fieldset>
                <div className="fs-field">
                    <label className="fs-label">Item Name</label>
                    <input
                        className="fs-input"
                        type="text"
                        value={formState.item_name}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                item_name: e.target.value,
                            })
                        }
                        required
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="fs-field">
                    <label className="fs-label">Menu ID</label>
                    <input
                        className="fs-input"
                        type="number"
                        value={formState.menu_id}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                menu_id: Number(e.target.value),
                            })
                        }
                        required
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="fs-field">
                    <label className="fs-label">Veg / Non Veg</label>

                    <select
                        className="fs-input"
                        value={formState.is_veg}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                is_veg: e.target.value,
                            })
                        }
                    >
                        <option value="true">Veg</option>
                        <option value="false">Non Veg</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="fs-field">
                    <label className="fs-label">Status</label>

                    <select
                        className="fs-input"
                        value={formState.status}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                status: e.target.value === "true",
                            })
                        }
                    >
                        <option value={true}>Available</option>
                        <option value={false}>Unavailable</option>
                    </select>
                </div>
            </fieldset>

            <div className="fs-button-group">
                <button className="fs-button" type="submit">
                    {id ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    );
}