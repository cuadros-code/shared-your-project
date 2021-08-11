import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import Modal from 'react-modal'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ProductDetail = ({ isOpen, setModal }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModal(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
     
     <IconButton color="primary" aria-label="add to shopping cart">
        <FavoriteIcon />
      </IconButton>
    </Modal>
  )
}

export default ProductDetail
