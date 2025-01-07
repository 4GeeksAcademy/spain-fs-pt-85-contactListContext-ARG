import React, { useContext } from "react";
import { Context } from "../store/appContext";

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);

    return (
        <div className="card d-flex flex-row align-items-center p-3">
            <img src="https://via.placeholder.com/150" className="rounded-circle" alt="Profile" />
            <div className="ms-3 ps-5 flex-grow-1">
                <h5>{contact.name}</h5>
                <p><i class="fa-solid fa-location-dot"></i> {contact.address}</p>
                <p><i className="fas fa-phone"></i> {contact.phone}</p>
                <p><i className="fas fa-envelope"></i> {contact.email}</p>
            </div>
            <div className="position-absolute top-0 end-0 pt-3 pe-5">
                <button className="btn me-2"><i className="fas fa-pen"></i></button>
                <button className="btn" onClick={() => actions.deleteContact(contact.id)}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default ContactCard;