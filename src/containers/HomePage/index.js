import React, { Component } from 'react';
import { OAUTH_PATH } from '../../config/constants'

const h1Style = {
  fontSize: '70px'
}
const pStyle = {
  fontSize: '30px'

}
export default class HomePage extends Component {
	render() {
		return (
      <div className="cover-container h-100">
        <div className="inner cover">
            <h1 className="text-uppercase text-white font-weight-bold" style={h1Style}>Howdy!</h1>
            <p className="lead" style={pStyle}>Please click below link to view collection of photos from unsplash</p>
            <a className="btn btn-lg btn-secondary" href={ OAUTH_PATH }>Authorize to Load Photos</a>
        </div>
      </div>
		);
	}
}