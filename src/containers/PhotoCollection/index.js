import React, { Component } from 'react';
import { connect } from "react-redux";
import PhotoList from './PhotoList';
import { Redirect } from 'react-router-dom';
import SearchForm from './SearchForm';
import './card.css'

class PhotoCollection extends Component {
    componentDidMount() {
        document.body.classList.add("no-background");
    }
    componentWillUnmount() {
        document.body.classList.remove("no-background");
    }
	render() {
        if (!this.props.isAuthorized) {
            return <Redirect to='/'/>;
        } else {
            return (
                <div className="inner px-5">
                    <SearchForm/>
                    <PhotoList />
                </div>
            ); 
        }
	}
}

export const mapStateToProps = state => {
    return {
      isAuthorized : state.authData.isAuthorized
    };
};

export default connect(mapStateToProps, null)(PhotoCollection);