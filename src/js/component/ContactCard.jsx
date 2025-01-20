import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import ConfirmationModal from "./ConfirmationModal.jsx";
import EditContactModal from "./EditContactModal.jsx";

const ContactCard = ({ contact }) => {
    const { actions } = useContext(Context);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDelete = () => {
        actions.deleteContact(contact.id); // Ejecuta la acción para eliminar el contacto
        setShowDeleteModal(false);
    };

    const handleEdit = async (updatedContact) => {
        await actions.editContact(contact.id, updatedContact); // Llama a la acción para editar el contacto
        setShowEditModal(false);
    };

    return (
        <>
            <div className="card d-flex flex-row align-items-center p-3">
                <img src="https://via.placeholder.com/150" className="rounded-circle" alt="Profile" />
                <div className="ms-3 ps-5 flex-grow-1">
                    <h5>{contact.name}</h5>
                    <p><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
                    <p><i className="fas fa-phone"></i> {contact.phone}</p>
                    <p><i className="fas fa-envelope"></i> {contact.email}</p>
                </div>
                <div className="position-absolute top-0 end-0 pt-3 pe-5">
                    <button className="btn me-2" onClick={() => setShowEditModal(true)}>
                        <i className="fas fa-pen"></i>
                    </button>
                    <button className="btn" onClick={() => setShowDeleteModal(true)}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>

            {/* Modal de confirmación para eliminar */}
            <ConfirmationModal
                show={showDeleteModal}
                title="Confirm Delete"
                message={`Are you sure you want to delete ${contact.name}?`}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
            />

            {/* Modal de edición */}
            <EditContactModal
                show={showEditModal}
                contact={contact}
                onSave={handleEdit}
                onCancel={() => setShowEditModal(false)}
            />
        </>
    );
};

export default ContactCard;