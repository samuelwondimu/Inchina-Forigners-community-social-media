import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticlesCard = ({ posts }) => (
  <div className="card card--dark">
    <div className="card__body">
      <h5>Popular Posts</h5>
      <Link to="#">Write a Post</Link>
      {posts
        .filter((post) => post.likes.length > 1)
        .map((post) => (
          <Fragment>
            <div className="custom-spacer">
              <div className="snippet-wrapper">
                <div>
                  <Link to={`/`} className="snippet-engagement-count">
                    <p>{post.likes.length}</p>
                  </Link>
                </div>
                <div className="snippet-teaser">
                  <Link to={'/'} className="snippet-teaser">
                    <p className="snippet-text">
                      {' '}
                      {post.text.substring(0, 100)}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  </div>
);

ArticlesCard.propTypes = {
  posts: PropTypes.object.isRequired
};

export default ArticlesCard;
