import React, { useEffect} from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, src, alt }) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);

        return () => window.removeEventListener('keydown', handleKeydown)
    })

    const handleKeydown = e => {
        if (e.code === 'Escape') { onClose(); }
    }

    const handleOverlayClick = e => {
        if (e.currentTarget === e.target) { onClose(); }
    }

    return createPortal(
        <div className="Overlay" onClick={handleOverlayClick}>
            <div className="Modal">
                <img src={src} alt={alt} />
            </div>
        </div>, 
        modalRoot,
    );
}