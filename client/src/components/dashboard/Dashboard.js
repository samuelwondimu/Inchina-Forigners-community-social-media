import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import UserPosts from './UserPosts';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
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
          <button
            style={{
              padding: '9px',
              marginLeft: '173px',
              marginBottom: '20px'
            }}
            className="btn btn-danger my-1"
            onClick={() => deleteAccount()}
          >
            Delete Account
          </button>
          <div style={{ paddingTop: '5px' }}>
            <UserPosts />
          </div>
        </div>
      ) : (
        <Fragment>
          <Spinner />
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
