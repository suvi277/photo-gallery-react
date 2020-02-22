import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPhotos, searchPhotos, unlikePhoto, likePhoto } from "../../actions/index";
import Photo from "../../components/Photo/Photo";
import InfiniteScroll from "react-infinite-scroll-component";
import AlertBox from "../../components/AlertBox/AlertBox";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class PhotoList extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      hasMoreItems: true
    };
  }
  componentDidMount() {
    this.getPhotos(this.state.currentPage);
  }

  getPhotos(page) {
    const { query } = this.props;

    if (query) {
      this.props.loadSearchResult({ query, page });
    } else {
      this.props.loadPhotos({ page });
    }
  }

  loadMorePhotos = () => {
    if (this.props.photos.length >= 100) {
      this.setState({
        hasMoreItems: false
      });
      return;
    }
    this.setState((prevState, props) => ({
      currentPage: prevState.currentPage + 1
    }));
    this.getPhotos(this.state.currentPage);
  };

  toggleLike = (isLiked, id) => {
	isLiked ? this.props.unlikePhotoById(id) : this.props.likePhotoById(id);
  }

  render() {
    const allPhotos = this.props.photos;

    return (
      <div>
        {!this.props.isLoaded && (
          <Loader
            type="Grid"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        {allPhotos && allPhotos.length > 0 ? (
          <InfiniteScroll
            dataLength={allPhotos.length}
            next={this.loadMorePhotos}
            hasMore={this.state.hasMoreItems}
            className="card-columns"
          >
            {allPhotos.map(photo => (
              <Photo
                url={photo.urls.thumb}
                user={photo.user.links.html}
                name={photo.user.name}
                key={photo.id + Math.random()}
				description={photo.description}
				isLiked={photo.liked_by_user}
				toggleLike={() => this.toggleLike(photo.liked_by_user, photo.id)}
              />
            ))}
          </InfiniteScroll>
        ) : (
          this.props.isLoaded && (
            <AlertBox style={{marginTop: '35px'}} type="danger">
              Sorry! We couldn't find any photos matching{" "}
              <strong>{this.props.query}</strong>, try different words
            </AlertBox>
          )
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  const { photos, isLoaded, error, query } = state.photosData;

  return {
    photos,
    isLoaded, 
    error,
    query
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadPhotos: options => dispatch(fetchPhotos(options)),
	loadSearchResult: options => dispatch(searchPhotos(options)),
	likePhotoById: id => dispatch(likePhoto(id)),
	unlikePhotoById: id => dispatch(unlikePhoto(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList);
