import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getUserPosts } from '../../actions/post';
import formatDate from '../../utils/formatDate';
import { addLike, removeLike, deletePost } from '../../actions/post';

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
      <div>
        <hr></hr>
        <div className="my-post">
        <h1 className="text-center"> {userposts.length}{' '}Posts</h1>
        </div>
        <br className="clearBoth"></br>
        
        {userposts.map((post) => (
          <div className="post p-1 my-1" style={{ color: '#333' }}>
            <div>
              <img className="round-img" src={post.avatar} alt="" />
              <h4 style={{ color: '#333' }}>{post.name}</h4>
            </div>
            <div>
              {Route() === '/dashboard' ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.text.substring(0, 400).trim() + '...'
                  }}
                ></div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.text
                  }}
                ></div>
              )}

              <p className="post-date">Posted on {formatDate(post.date)}</p>
              {showActions && (
                <Fragment>
                  <button
                    onClick={() => addLike(post._id)}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-up" />{' '}
                    <span>
                      {post.likes.length > 0 && (
                        <span>{post.likes.length}</span>
                      )}
                    </span>
                  </button>
                  <button
                    onClick={() => removeLike(post._id)}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-down" />
                  </button>
                  <Link to={`/posts/${post._id}`} className="btn">
                    comments{' '}
                    {post.comments.length > 0 && (
                      <span className="comment-count" style={{ color: '#fff' }}>
                        {post.comments.length}
                      </span>
                    )}
                  </Link>
                </Fragment>
              )}
            </div>
          </div>
        ))}
      </div>
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
