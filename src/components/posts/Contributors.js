import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';
import { getProfiles } from '../../actions/profile';

const Contributors = ({
  users,
  getProfiles,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div className="card">
      <div className="card__body">
        <h5>Top Expacts Contributors</h5>
        <div className="custom-spacer"></div>

        {!loading ? (
          profiles.map((profile) => (
            <div key={profile._id} className="contributor-wrapper">
              <div className="contributor-preview">
                <Avatar src={profile.user.avatar} alt="img-description" />
                <Link to={`/profile/${profile.user._id}`}>
                  <strong>{profile.user.name}</strong>
                </Link>
              </div>
              <Link
                className="btn btn--main--outline btn--sm"
                to={`/profile/${profile.user._id}`}
              >
                Profile
              </Link>
            </div>
          ))
        ) : (
          <h4>No profiles found...</h4>
        )}
      </div>
    </div>
  );
};

Contributors.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  profile: state.profile
});
export default connect(mapStateToProps, { getProfiles })(Contributors);
