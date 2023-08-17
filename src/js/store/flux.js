const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contacts: [],
			users: null
		},
		actions: {
			fetchData: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda");
					let data = await response.json();
					setStore({ contacts: data });
				} catch (error) {
					console.log(error);
				}
			},
			addContact: async contact => {
				try {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(contact)
					});
					if (response.ok) {
						const newContact = await response.json();
						const updatedContacts = [...getStore().contacts, newContact];
						setStore({ contacts: updatedContacts });
					} else {
						console.error("Error al agregar contacto");
					}
				} catch (error) {
					console.error(error);
				}
			}
		}
	};
};

export default getState;
