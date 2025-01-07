import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const AddContact = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [contact, setContact] = useState({ name: "", email: "", phone: "", address: "" });

    const handleChange = e => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await actions.addContact(contact);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="container mt-4">
                <h1>Add a new contact</h1>
                <form onSubmit={handleSubmit}>
                    {["full name", "email", "phone", "address"].map(field => (
                        <div key={field} className="mb-3">
                            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={field}
                                name={field}
                                value={contact[field]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary col-12">Save</button>
                </form>
            </div>
            <Link to="/" className="btn btn-link">or get back to contacts</Link>
        </div>
    );
};

export default AddContact;