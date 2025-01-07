const getState = ({ getStore, getActions, setStore }) => {
  return {
      store: {
          contacts: []
      },
      actions: {
            fetchContacts: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Alvaro/contacts");
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
              await fetch("https://playground.4geeks.com/contact/agendas/Alvaro/contacts", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(contact)
              });
              getActions().fetchContacts();
          },
          deleteContact: async id => {
              await fetch(`https://playground.4geeks.com/contact/agendas/Alvaro/contacts/${id}`, {
                  method: "DELETE"
              });
              getActions().fetchContacts();
          }
      }
  };
};

export default getState;