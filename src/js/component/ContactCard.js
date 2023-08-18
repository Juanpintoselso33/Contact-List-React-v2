import React, { useState } from "react";
import PropTypes from "prop-types";
import MikePhoto from "../../img/m101.jpg";

export const ContactCard = ({ contact, onDelete, onModify }) => {
	return (
		<li className="list-group-item">
			<div className="row w-100">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img src={MikePhoto} alt={contact.full_name} className="rounded-circle mx-auto d-block img-fluid" />
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
					<div className=" float-right">
						<button className="btn" onClick={() => onModify(contact.id)}>
							<i className="fas fa-pencil-alt mr-3" />
						</button>
						<button className="btn" onClick={() => onDelete(contact.id)}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
					<label className="name lead">{contact.full_name}</label>
					<br />
					<i className="fas fa-map-marker-alt text-muted mr-3" />
					<span className="text-muted">{contact.address}</span>
					<br />
					<span className="fa fa-phone fa-fw text-muted mr-3" />
					<span className="text-muted small">{contact.phone}</span>
					<br />
					<span className="fa fa-envelope fa-fw text-muted mr-3" />
					<span className="text-muted small text-truncate">{contact.email}</span>
				</div>
			</div>
		</li>
	);
};

ContactCard.propTypes = {
	onDelete: PropTypes.func,
	contact: PropTypes.object,
	onModify: PropTypes.func
};

ContactCard.defaultProps = {
	onDelete: null
};
