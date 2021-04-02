import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const Route = () => {
  const location = useLocation();
  return location.pathname;
};

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => (
  <Fragment>
    <div className="post p-1 my-1" style={{ color: '#333' }}>
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4 style={{ color: '#333' }}>{name}</h4>
        </Link>
      </div>

      <div>
        {Route() === '/posts' || Route() === '/search' ? (
          <div
            dangerouslySetInnerHTML={{
              __html: text.substring(0, 400).trim() + '...'
            }}
          ></div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: text
            }}
          ></div>
        )}

        <p className="post-date">Posted on {formatDate(date)}</p>
        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${_id}`} className="btn">
              comments{' '}
              {comments.length > 0 && (
                <span className="comment-count" style={{ color: '#fff' }}>
                  {comments.length}
                </span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  </Fragment>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
