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
					setStore({ contacts: data.results });
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			}
		}
	};
};

export default getState;
