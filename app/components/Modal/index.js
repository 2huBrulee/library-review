/**
 *
 * Modal
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import OutsideClickHandler from 'react-outside-click-handler';
import messages from './messages';

const ModalWrapper = styled.div`
  ${({ visible }) => (visible ? `display: block;` : `display:none;`)};
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 2px solid #888;
  border-radius: 5px;
  width: 800px; /* Could be more or less, depending on screen size */
`;

function Modal(props) {
  const { visible, hide, children } = props;

  return (
    <ModalWrapper visible={visible}>
      <OutsideClickHandler onOutsideClick={hide}>
        <ModalContent>
          {children}
        </ModalContent>
      </OutsideClickHandler>
    </ModalWrapper>
  );
}

Modal.propTypes = {};

export default Modal;
