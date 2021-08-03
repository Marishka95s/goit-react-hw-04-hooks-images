import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
    componentDidMount() {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
    }
    render() {
    return(
        <button type="button" className="Button" onClick={this.props.onFetchImages} >
            Load more
        </button>
    )}
};
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

export default Button;