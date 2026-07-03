// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./css/Menu.css";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./api/base";
import { useLocation, useNavigate, useParams } from "react-router";

export default function Menu() {
    const [formState, setFormState] = useState({
        name: ""
    });

    const navigate = useNavigate();

    const params = useParams();
    const id = params.id

    const fetchSingleMenu = async (id) => {
        const result = await axios.get(`${API_BASE_URL}/menu/${id}`)
        console.log(result);

        setFormState({ name: result.data.name })
    }


    useEffect(() => {
        if (params.id) {
            fetchSingleMenu(id)
        }
    },
        [params.id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (params.id) {
            const updateResult = await axios.patch(`${API_BASE_URL}/menu/${params.id}`, formState)
            if (updateResult.status == 200) {
                toast.success("Data has been updated");
                
                navigate("/ListMenu");
            }
        } else {
            const response = await axios.post(`${API_BASE_URL}/menu`, formState);


            if (response.status === 200) {
                toast.success("Menu item added successfully!");
                setFormState({ name: "" }); // Reset form after successful submission
                navigate("/ListMenu");
            }
        }


    }
    return (
        <form className="fs-form fs-layout__2-column" onSubmit={handleSubmit}>

            <h1>{id ? 'Edit' : 'Add'} menu</h1>
            <fieldset>
                <div className="fs-field">
                    <label className="fs-label" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="fs-input"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required />
                </div>
            </fieldset>
            <fieldset>


            </fieldset>

            <div class="fs-button-group">
                <button className="fs-button" type="submit">
                    {id ? 'Update' : 'Submit'}
                </button>
            </div>
        </form>
    );
}