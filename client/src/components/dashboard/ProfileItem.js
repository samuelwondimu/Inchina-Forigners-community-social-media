import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import DashboardActions from './DashboardActions';
import Avatar from '../common/Avatar';

const ProfileItem = ({
  profile: {
    company,
    website,
    location,
    bio,
    status,
    social,
    skills,
    user: { avatar, name }
  }
}) => {
  return (
    <div className="card">
      <div className="card__body">
        <div id="user-profile-summary">
          <Avatar
            alt="img-description"
            id="profile_pic"
            src={avatar}
            size="larger"
          />
          <h1 id="user-profile-name">{name}</h1>
          <div className="custom-spacer"></div>
          <p>{bio}</p>
          <p>
            {' '}
            {status} at {company}{' '}
          </p>
          <p>{location}</p>
          <a
            href={website}
            target="_blank"
            style={{ padding: '8px' }}
            rel="noopener noreferrer"
          >
            <i className="fas fa-globe fa-2x" />
          </a>
          {social
            ? Object.entries(social)
                .filter(([_, value]) => value)
                .map(([key, value]) => (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i
                      className={`fab fa-${key} fa-2x`}
                      style={{ padding: '8px' }}
                    ></i>
                  </a>
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
