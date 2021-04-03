import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const AuthorBox = ({
  size = 'small',
  url = '',
  name = '',
  className = '',
  avatarSrc = '',
  children,
  ...others
}) => {
  const authorBoxClass = `${
    className && className + ' '
  }author-box author-box--${size}`;

  return (
    <Link to={url} className={authorBoxClass} {...others}>
      <Avatar size={size} alt={name} src={avatarSrc} />
      <div className="author-box__info">
        {children}
        <p className="author-box__name">{name}</p>
      </div>
    </Link>
  );
};

AuthorBox.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  avatarSrc: PropTypes.string,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default AuthorBox;
