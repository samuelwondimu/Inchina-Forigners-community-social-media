import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
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
  showActions
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
                className="fas fa-thumbs-up fa-2x vote-icon up-arrow"
              />
              <p className="vote-count">{likes.length}</p>
              <i
                onClick={() => removeLike(_id)}
                type="button"
                className="fas fa-thumbs-down fa-2x vote-icon down-arrow"
              />
            </div>
            <div className="post-body">
              {Route() === '/posts' || Route() === '/search' ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: text.substring(0, 400).trim() + ''
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
          </div>
          <div className="post-actions-wrapper">
            {showActions && (
              <Fragment>
                <div className="action-wrapper">
                  <i className="fas fa-comments"></i>
                  <Link to={`/posts/${_id}`}>
                    {comments.length > 0 && (
                      <span className="post-action-text">
                        {comments.length}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="action-wrapper">
                  <div role="button" className="post-comment-wrapper">
                    <i className="fas fa-comment-lines"> </i>
                    <span className="post-action-text">Comment</span>
                  </div>
                </div>
                <div className="action-wrapper">
                  {!auth.loading && user === auth.user._id && (
                    <i
                      className="fas fa-trash"
                      onClick={() => deletePost(_id)}
                    />
                  )}
                </div>
                {/*  */}
              </Fragment>
            )}
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
