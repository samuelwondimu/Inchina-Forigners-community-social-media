import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPosts from './UserPosts';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
  getUserPosts,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <p className="lead">Welcome {user && user.name}</p>
      {profile ? (
        <div>
          {/* <p>{profile.bio}</p> */}
          <ProfileItem profile={profile} />
          <div style={{ paddingTop: '450px' }}>
            <UserPosts />
          </div>
        </div>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <a to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </a>
        </Fragment>
      )}
    </Fragment>
  );
};
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount
})(Dashboard);
