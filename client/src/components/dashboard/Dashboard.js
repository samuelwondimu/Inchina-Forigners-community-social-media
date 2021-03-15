import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import UserPosts from './UserPosts';
import Spinner from '../layout/Spinner';

const Dashboard = ({
  getCurrentProfile,
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
          <div style={{ paddingTop: '500px' }}>
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile
})(Dashboard);
