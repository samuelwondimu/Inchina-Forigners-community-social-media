import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import '../../styles/components/CreatePost.css';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className="card create-post">
      <div className="card__body">
        <div className="create-post__body">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              addPost({ text });
              setText('');
            }}
          >
            <div className="form__field">
              <textarea
                className="input input--textarea"
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post....."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <Button
                id="post-btn"
                type="submit"
                buttonStyle="main"
                size="large"
                text="Create Post"
                iconName="pencil-alt"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
