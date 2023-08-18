import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const ModalModify = ({ contact, show, onClose, onConfirm }) => {
	const [updatedContact, setUpdatedContact] = useState(contact);

	useEffect(() => {
		setUpdatedContact(contact);
	}, [contact]);

	const handleChange = e => {
		const { name, value } = e.target;
		setUpdatedContact({
			...updatedContact,
			[name]: value
		});
	};

	const handleSubmit = () => {
		if (updatedContact) {
			onConfirm(updatedContact);
		}
		onClose();
	};

	return (
		show && (
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Edit Contact</h1>
					<form>
						<div className="form-group">
							<label>Full Name</label>
							<input
								type="text"
								className="form-control"
								name="full_name"
								value={updatedContact.full_name}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								value={updatedContact.email}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="phone"
								className="form-control"
								name="phone"
								value={updatedContact.phone}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								className="form-control"
								name="address"
								value={updatedContact.address}
								onChange={handleChange}
							/>
						</div>
						<button type="button" className="btn btn-primary form-control" onClick={handleSubmit}>
							save
						</button>
						<Link className="mt-3 w-100 text-center" to="/" onClick={onClose}>
							or get back to contacts
						</Link>
					</form>
				</div>
			</div>
		)
	);
};

ModalModify.propTypes = {
	contact: PropTypes.object,
	show: PropTypes.bool,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func
};

ModalModify.defaultProps = {
	show: false,
	onClose: null
};
