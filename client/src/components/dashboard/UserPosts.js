import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/post';
import formatDate from '../../utils/formatDate';
const UserPosts = ({
  getUserPosts,
  profile: { profile },
  post: { userposts }
}) => {
  useEffect(() => {
    getUserPosts(profile.user._id);
  }, [getUserPosts]);
  return (
    <Fragment>
      <div>
        {userposts.map((post) => (
          <div className="userpost" key={post._id}>
            <hr></hr>
            <h4>{post.name}</h4>
            <p>{post.text}</p>
            <span className="post-date">Posted on {formatDate(post.date)}</span>
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile
});

export default connect(mapStateToProps, { getUserPosts })(UserPosts);
