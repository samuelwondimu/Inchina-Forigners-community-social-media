import React, { Fragment, useEffect, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { getPosts } from '../../actions/post';
import '../../styles/components/Home.css';
import Spinner from '../layout/Spinner';

const PostItem = lazy(() => import('./PostItem'));
const PostForm = lazy(() => import('./PostForm'));
const Contributors = lazy(() => import('./Contributors'));
const TopPosts = lazy(() => import('./TopPosts'));
const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        <div className="home--layout">
          <section id="sidebar--left--home">
            <Contributors />
          </section>
          <section id="center-content">
            <PostForm />
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </section>
          <section id="sidebar--right--home">
            <TopPosts posts={posts} />
          </section>
        </div>
      </Suspense>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
