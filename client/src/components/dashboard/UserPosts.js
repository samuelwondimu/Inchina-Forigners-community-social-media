import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/post';
import formatDate from '../../utils/formatDate';
const UserPosts = ({ getUserPosts, post: { userposts }, auth: { user } }) => {
  useEffect(() => {
    getUserPosts(user._id);
  }, [getUserPosts]);
  return (
    <Fragment>
      <div>
        {userposts.map((post) => (
          <div className="userpost">
            <hr></hr>
            <h4>{post.name}</h4>
            <p>{post.text}</p>
            <p className="post-date">Posted on {formatDate(post.date)}</p>
          </div>
        ))}
        <hr></hr>
      </div>
    </Fragment>
  );
};

UserPosts.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getUserPosts })(UserPosts);
