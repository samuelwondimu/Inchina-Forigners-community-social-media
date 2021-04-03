import React, { Fragment, useEffect, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
// import ProfileItem from './ProfileItem';
import '../../styles/components/Profile.css';
import UserPosts from './UserPosts';
import Spinner from '../layout/Spinner';
import Button from '../common/Button';
import SkillTags from './SkillTags';
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
    <div className="profile--layout">
      <section id="sidebar--left--profile">
        <Suspense
          fallback={
            <div>
              <Spinner />
            </div>
          }
        >
          {profile !== null ? (
            <Fragment>
              <ProfileItem profile={profile} />
              <SkillTags skills={profile.skills} />
              <Button
                className="btn btn--danger"
                onClick={() => deleteAccount()}
                text="Delete Account"
              ></Button>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile">Create Profile</Link>
            </Fragment>
          )}
        </Suspense>
      </section>
      <section id="center-content">
        <div className="card">
          <div className="card__body">
            <Link className="btn btn--main--outline" to={'/'}>
              &#8592; Go Back{' '}
            </Link>
          </div>
        </div>
        <Suspense
          fallback={
            <div>
              <Spinner />
            </div>
          }
        >
          {user !== null ? <UserPosts /> : <Spinner />}
        </Suspense>
      </section>
    </div>
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
