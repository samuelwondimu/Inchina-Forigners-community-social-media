import React from 'react';
import { Link } from 'react-router-dom';

function SkillTags({ skills }) {
  return (
    <div className="card">
      <div id="topics-wrapper" className="card__body">
        <h5>Skills</h5>
        <div className="line-break"></div>
        <div className="tags-wrapper">
          {skills.map((skill, index) => (
            <div key={index} className="tag">
              <small>{skill}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillTags;
