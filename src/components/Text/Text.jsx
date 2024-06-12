import React from 'react';
import './Text.css';

function Text({ value, onChange, onFocus, onBlur, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className='custom-textfield'
    />
  );
}

export default Text;
