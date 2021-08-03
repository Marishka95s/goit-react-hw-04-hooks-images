import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Button({ onFetchImages }) {
    useEffect(()=>{
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
    }, []);

    return(
        <button type="button" className="Button" onClick={onFetchImages} >
            Load more
        </button>
    )
};
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};