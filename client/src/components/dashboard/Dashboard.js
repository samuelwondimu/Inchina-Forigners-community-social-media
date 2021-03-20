import React, { Fragment, useEffect, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
// import ProfileItem from './ProfileItem';
import UserPosts from './UserPosts';
import Spinner from '../layout/Spinner';

const ProfileItem = lazy(() => import('./ProfileItem'));

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <p className="lead">Welcome {user && user.name}</p>
      <Suspense
        fallback={
          <div>
            <Spinner />
          </div>
        }
      >
        {profile !== null ? (
          <div>
            <ProfileItem profile={profile} />
            <div>
              <button
                className="btn btn-danger"
                onClick={() => deleteAccount()}
              >
                Delete Account
              </button>
            </div>
            <div>
              <Suspense
                fallback={
                  <div>
                    <Spinner />
                  </div>
                }
              >
                {user !== null ? <UserPosts /> : <Spinner />}
              </Suspense>
            </div>
          </div>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </Suspense>
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
