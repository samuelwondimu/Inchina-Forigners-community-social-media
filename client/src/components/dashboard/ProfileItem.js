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
          {/* 
                
            
                <div className="icons my-1">
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe fa-2x" />
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="float-child text-center">
          <div class="blue">
            <div className="profile-about p-2">
              <Fragment>
                <DashboardActions />
                <h2>{name.trim().split(' ')[0]}'s Bio</h2>
                <p>{bio}</p>
                <hr></hr>
                <h2>Skill Set</h2>
                <div className="skills">
                  {skills.map((skill, index) => (
                    <div key={index} className="p-1">
                      <i className="fas fa-check" /> {skill}
                    </div>
                  ))}
                </div>
              </Fragment> */}
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
