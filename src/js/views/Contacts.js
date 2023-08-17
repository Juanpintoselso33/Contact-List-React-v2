import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
	const { store, actions } = useContext(Context);

	const [state, setState] = useState({
		showModal: false
	});

	useEffect(() => {
		actions.fetchData();
	}, []);

	useEffect(() => {
		console.log(store.contacts); // Esto se ejecutará cada vez que store.contacts cambie
	}, [store.contacts]);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{console.log(store.contacts)};
						{store.contacts && store.contacts.length > 0 ? (
							store.contacts.map((contact, index) => (
								<ContactCard
									contact={contact}
									onDelete={() => setState({ showModal: true })}
									key={index}
								/>
							))
						) : (
							<p>No contacts available.</p>
						)}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
