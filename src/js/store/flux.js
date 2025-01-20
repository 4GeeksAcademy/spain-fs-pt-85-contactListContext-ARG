const getState = ({ getStore, getActions, setStore }) => {
    const agendaSlug = "Alvaro"; // Slug para la agenda

    return {
        store: {
            contacts: []
        },
        actions: {
            // Verificar si la agenda existe y crearla si no
            ensureAgendaExists: async () => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`);
                    if (response.status === 404) {
                        console.log(`Agenda "${agendaSlug}" no encontrada. Creando agenda...`);
                        const createResponse = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ slug: agendaSlug })
                        });

                        if (createResponse.ok) {
                            console.log(`Agenda "${agendaSlug}" creada con éxito.`);
                        } else {
                            console.error("Error al crear la agenda.");
                        }
                    } else if (response.ok) {
                        console.log(`Agenda "${agendaSlug}" encontrada.`);
                    } else {
                        console.error("Error al verificar la agenda.");
                    }
                } catch (error) {
                    console.error("Error al realizar la solicitud para verificar o crear la agenda:", error.message);
                }
            },

            fetchContacts: async () => {
                await getActions().ensureAgendaExists(); // Verificar que la agenda exista antes
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`);
                    const data = await response.json();

                    // Extrae el array de contactos
                    console.log("Datos recibidos de la API:", data);
                    const contacts = data.contacts || []; // Asegúrate de que sea un array, aunque esté vacío
                    setStore({ contacts }); // Guarda el array de contactos en el store
                } catch (error) {
                    console.error("Error al obtener contactos:", error.message);
                }
            },

            addContact: async contact => {
                await getActions().ensureAgendaExists(); // Verificar que la agenda exista antes
                try {
                    await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact)
                    });
                    getActions().fetchContacts(); // Refrescar los contactos
                } catch (error) {
                    console.error("Error al añadir el contacto:", error.message);
                }
            },

            deleteContact: async id => {
                await getActions().ensureAgendaExists(); // Verificar que la agenda exista antes
                try {
                    await fetch(`https://playground.4geeks.com/contact/agendas/${agendaSlug}/contacts/${id}`, {
                        method: "DELETE"
                    });
                    getActions().fetchContacts(); // Refrescar los contactos
                } catch (error) {
                    console.error("Error al eliminar el contacto:", error.message);
                }
            },

            editContact: async (id, updatedContact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Alvaro/contacts/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedContact)
                    });
            
                    if (response.ok) {
                        console.log("Contacto editado correctamente.");
                        getActions().fetchContacts(); // Actualizar la lista de contactos
                    } else {
                        console.error("Error al editar el contacto.");
                    }
                } catch (error) {
                    console.error("Error al realizar la solicitud para editar el contacto:", error.message);
                }
            }
        }
    };
};

export default getState;