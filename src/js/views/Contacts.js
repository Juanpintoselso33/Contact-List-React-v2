import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";
import { ModalModify } from "../component/ModalModify.js";

export const Contacts = () => {
	const { store, actions } = useContext(Context);

	const [state, setState] = useState({
		showDeleteModal: false,
		contactToDelete: null,
		contactToModify: null,
		showModalModify: false
	});

	useEffect(() => {
		actions.fetchData();
	}, []);

	useEffect(() => {
		actions.fetchData();
	}, [store.contacts]);

	const handleDelete = contactId => {
		const foundContact = store.contacts.find(c => c.id === contactId);
		setState({ showDeleteModal: true, contactToDelete: foundContact });
	};

	const handleModify = contactId => {
		const foundContact = store.contacts.find(c => c.id === contactId);
		setState({ contactToModify: foundContact, showModalModify: true });
	};

	const closeModal = () => {
		setState({
			showDeleteModal: false,
			contactToDelete: null,
			contactToModify: null,
			showModalModify: false
		});
	};

	const handleDeleteConfirmation = () => {
		if (state.contactToDelete !== null) {
			actions.deleteContact(state.contactToDelete.id);
			closeModal();
		}
	};

	const handleModifyConfirmation = updatedContact => {
		console.log("updatedContact en handleModifyConfirmation:", updatedContact);
		if (state.contactToModify !== null) {
			actions.modifyContact(state.contactToModify.id, updatedContact);
			closeModal();
		}
	};

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				{!state.showModalModify && (
					<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
						<ul className="list-group pull-down" id="contact-list">
							{store.contacts && store.contacts.length > 0 ? (
								store.contacts.map(contact => (
									<ContactCard
										contact={contact}
										key={contact.id}
										onDelete={() => handleDelete(contact.id)}
										onModify={() => handleModify(contact.id)}
									/>
								))
							) : (
								<p>No contacts available.</p>
							)}
						</ul>
					</div>
				)}
			</div>

			<Modal show={state.showDeleteModal} onClose={closeModal} onConfirm={handleDeleteConfirmation} />
			{state.showModalModify && (
				<ModalModify
					contact={state.contactToModify}
					show={true}
					onClose={closeModal}
					onConfirm={handleModifyConfirmation}
				/>
			)}
		</div>
	);
};
