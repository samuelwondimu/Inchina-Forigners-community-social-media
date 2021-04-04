import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import { getPosts } from '../../actions/post';
import PostItem from '../posts/PostItem';
import ProfileItem from '../profiles/ProfileItem';
const Search = ({
  getProfiles,
  profile: { profiles, loading },
  getPosts,
  post: { posts }
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      <div class="search-bar">
        <form>
          <input
            type="text"
            placeholder="search by typing........"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </form>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <hr></hr>
          <h1>Profiles</h1>
          {profiles.length > 0 ? (
            profiles
              .filter((profile) => {
                if (searchTerm === '') return profile;
                else if (
                  profile.user.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return profile;
                }
              })
              .map((profile) => {
                return <ProfileItem key={profile._id} profile={profile} />;
              })
          ) : (
            <h4>No profiles found...</h4>
          )}
          <hr></hr>
          <h1>posts</h1>
          {posts
            .filter((post) => {
              if (searchTerm === '') return post;
              else if (
                post.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return post;
              }
            })
            .map((post) => {
              return <PostItem key={post._id} post={post} />;
            })}
        </Fragment>
      )}
    </Fragment>
  );
};

Search.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getProfiles, getPosts })(Search);
