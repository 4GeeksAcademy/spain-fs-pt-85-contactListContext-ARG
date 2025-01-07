import React from "react";
import { Routes, Route } from "react-router-dom";
import injectContext from "./store/appContext";
import ContactList from "./views/ContactList.jsx";
import AddContact from "./views/AddContact.jsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
    );
};

export default injectContext(App);