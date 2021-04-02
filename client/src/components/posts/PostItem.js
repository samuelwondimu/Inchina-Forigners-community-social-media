import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

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
  showAction
}) => (
  <section>
    <div className="card">
      <div className="card__body">
        <div className="post-wrapper">
          <div className="post-header-wrapper">
            <Avatar src={avatar} alt="profile" />
            <Link to={`/profile/${user}`} className="post-user-name">
              <h6 style={{ color: '#333' }}>{name}</h6>
              <p className="post-meta">{formatDate(date)}</p>
            </Link>
          </div>
          <div className="post-contents">
            <div className="post-votes">
              <i
                onClick={() => addLike(_id)}
                className="fas fa-thumbs-up vote-icon up-arrow"
              />
              <p>{likes.length}</p>
              <i
                onClick={() => removeLike(_id)}
                type="button"
                className="fas fa-thumbs-down vote-icon down-arrow"
              />
            </div>
            <div className="post-body">
              <p>
                {Route() === '/posts' || Route() === '/search' ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: text.substring(0, 400).trim() + '...'
                    }}
                  ></p>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{
                      __html: text
                    }}
                  ></p>
                )}
              </p>
            </div>
            <div>
              {/* {showActions && (
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
            )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
