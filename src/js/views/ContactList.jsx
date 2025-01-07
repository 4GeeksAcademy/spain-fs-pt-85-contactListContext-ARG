import React, { useEffect, useContext } from "react";
import Navbar from "../component/Navbar.jsx";
import ContactCard from "../component/ContactCard.jsx";
import { Context } from "../store/appContext";

const ContactList = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.fetchContacts();
    }, []);
    console.log(store.contacts);
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                    store.contacts.map(contact => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <p>No contacts found</p> // Mensaje de estado vacío
                )}
            </div>
        </div>
    );
};

export default ContactList;