import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Searchbar({ onChangeQuery,  }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event) => {
        setSearchQuery(event.currentTarget.value);      
    }

    const handleSubmit = e => {
        e.preventDefault();  
        if (searchQuery.length !== 0) {
            onChangeQuery(searchQuery);     
        }  
    }

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label"> Search
                    </span>
                </button>

                <input className="SearchForm-input" type="text" autoComplete="off" autoFocus placeholder="Search images and photos" value={searchQuery} onChange={handleChange}/>
            </form>
        </header>
    )
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func,
  };
