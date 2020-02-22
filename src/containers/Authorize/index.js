import React, { Component } from 'react';
import { connect } from "react-redux";
import { auth } from "../../actions/index";

class Authorize extends Component {
  componentDidMount() {
    const URLQStrings = new URLSearchParams(this.props.search);
    const code: string = URLQStrings.has('code') ? URLQStrings.get('code') : '';
    this.props.authorize(code)
  }

  render() {
    return false;
  }
}

const mapStateToProps = state => ({
    search: state.router.location.search
});

const mapDispatchToProps = dispatch => {
    return {
        authorize: (code) => dispatch(auth(code))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorize);;
