const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacts: [],
			users: null
		},
		actions: {
			fetchData: async () => {
				try {
					const response = await fetch(
						"https://playground.4geeks.com/apis/fake/contact/agenda/juanpintoselso"
					);
					let data = await response.json();
					setStore({ contacts: data });
				} catch (error) {
					console.log(error);
				}
			},
			addContact: async contact => {
				try {
					const newContact = { ...contact, agenda_slug: "juanpintoselso" };
					console.log(newContact);
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/", {
						method: "POST",
						body: JSON.stringify(newContact),
						headers: { "Content-Type": "application/json" }
					});
					if (response.ok) {
						const addedContact = await response.json();
						const updatedContacts = [...getStore().contacts, addedContact];
						setStore({ contacts: updatedContacts });
						this.fetchData();
					} else {
						const errorResponse = await response.json();
						console.error("Error al agregar contacto:", errorResponse);
					}
				} catch (error) {
					console.error(error);
				}
			},
			deleteContact: async contactId => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
						method: "DELETE"
					});
					if (!response.ok) {
						const data = await response.json();
						console.error("Error al borrar el contacto:", data);
					}
				} catch (error) {
					console.error("Hubo un error al borrar el contacto:", error);
				}
			},
			modifyContact: async (idToModify, updatedContact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${idToModify}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(updatedContact)
					});
					if (response.ok) {
						console.log("Contacto modificado exitosamente");
						alert("Contacto modificado exitosamente");
					} else {
						const data = await response.json();
						console.error("Error al modificar el contacto:", data);
						return;
					}
				} catch (error) {
					console.error("Hubo un error al modificar el contacto:", error);
				}
			}
		}
	};
};

export default getState;
