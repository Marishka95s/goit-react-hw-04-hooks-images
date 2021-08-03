import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {
    state = {
        searchQuery: ''
    };

    handleChange = (event) => {
        this.setState({searchQuery: event.currentTarget.value})       
    }

    handleSubmit = e => {
        e.preventDefault();  
        if (this.state.searchQuery.length !== 0) {
            this.props.onChangeQuery(this.state.searchQuery)     
        }  
    }

    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label"> Search
                        </span>
                    </button>

                    <input className="SearchForm-input" type="text" autoComplete="off" autoFocus placeholder="Search images and photos" value={this.state.searchQuery} onChange={this.handleChange}/>
                </form>
            </header>
        )
    }
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

export default Searchbar;