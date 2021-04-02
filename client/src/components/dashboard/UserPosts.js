import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getUserPosts } from '../../actions/post';
import formatDate from '../../utils/formatDate';
import { addLike, removeLike, deletePost } from '../../actions/post';
import PostItem from '../posts/PostItem';

const Route = () => {
  const location = useLocation();
  return location.pathname;
};

const UserPosts = ({
  addLike,
  removeLike,
  deletePost,
  getUserPosts,
  auth: { user },
  profile: { profile },
  post: { userposts },
  showActions
}) => {
  useEffect(() => {
    getUserPosts(user._id);
  }, [getUserPosts]);
  return (
    <Fragment>
      {userposts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </Fragment>
  );
};

UserPosts.defaultProps = {
  showActions: true
};

UserPosts.propTypes = {
  auth: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  getUserPosts
})(UserPosts);
