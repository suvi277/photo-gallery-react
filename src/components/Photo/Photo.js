import React from 'react';
import './Photo.css';

const Photo = props => (
	<div className="card photo-card">
		<img className="card-img-top img-fluid" src={props.url} alt="Unsplash Image here"/>
  		<div className="card-overlay">
			<span className="title">{props.name}</span>
			<p>{props.description}</p>
			<span className={ props.isLiked ? 'like-button' : 'unlike-button' } onClick={props.toggleLike} role="button">
				{ props.isLiked && <i className="fa fa-heart"></i> }
				{ !props.isLiked && <i className="fa fa-heart-o"></i> }
			</span>
		</div>
	</div>
);

export default Photo;
