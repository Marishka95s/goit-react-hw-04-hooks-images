import React, { Component} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render(){
        const { src, alt } = this.props;
        return createPortal(
            <div className="Overlay" onClick={this.handleOverlayClick}>
                <div className="Modal">
                    <img src={src} alt={alt} />
                </div>
            </div>, 
            modalRoot,
        );
    }
}

export default Modal;