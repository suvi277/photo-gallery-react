import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { searchPhotos, fetchPhotos } from "../../actions/index";
import AlertBox from "../../components/AlertBox/AlertBox";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.searchInput = React.createRef();
    this.state = {
      isAlreadySearched: false
    };
  }

  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
  };

  componentWillUnmount() {
    this.props.loadSearchResult({ query: '', page: 1 });
  }

  onSearchSubmit = e => {
    e.preventDefault();
    this.setState({
      isAlreadySearched: this.searchInput.current.value === this.props.query
    });
    this.props.loadSearchResult({ query: this.state.searchText, page: 1 });
    e.currentTarget.reset();
  };

  clearResults = () => {
    this.searchInput.current.value = '';
    this.props.loadPhotos({ page: 1 });
  }

  render() {
    return (
      <Fragment>
        <form className="search-bar-fixed" onSubmit={this.onSearchSubmit}>
          <div className="input-group w-50">
            <input
              ref={this.searchInput}
              type="text"
              onChange={this.onSearchChange}
              name="search"
              className="form-control"
              placeholder="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="submit">
                <i className="fa fa-search"> </i>
              </button>
              <button className="btn btn-secondary" type="button" onClick={this.clearResults}>
                <i className="fa fa-eraser"></i>
              </button>
            </div>
          </div>
        </form>
        {this.state.isAlreadySearched && (
          <AlertBox style={{marginTop: '35px'}} type="warning">
            You already Searched with <strong>{this.props.query}</strong>
          </AlertBox>
        )}
      </Fragment>
    );
  }
}
export const mapStateToProps = state => {
  return {
    query: state.photosData.query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPhotos: (options) => dispatch(fetchPhotos(options)),
    loadSearchResult: options => dispatch(searchPhotos(options))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
