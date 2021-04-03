import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import AuthorBox from '../common/AuthorBox';
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
            <AuthorBox avatarSrc={avatar} name={name} size="md">
              <p className="post-meta">{formatDate(date)}</p>
            </AuthorBox>
            <Button buttonStyle="main" outline text="Profile" size="sm" />
          </div>
          <div className="post-contents">
            <div className="post-votes">
              <i
                onClick={() => addLike(_id)}
                className="fas fa-thumbs-up vote-icon up-arrow"
              />
              <p className="vote-count">{likes.length}</p>
              <i
                onClick={() => removeLike(_id)}
                type="button"
                className="fas fa-thumbs-down vote-icon down-arrow"
              />
            </div>
            <div className="post-body">
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
