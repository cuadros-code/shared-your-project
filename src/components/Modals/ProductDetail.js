import { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import Modal from 'react-modal'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components'

Modal.setAppElement('#root')


const ProductDetail = ({ isOpen, setModal, project }) => {

  const [galleryImages, setGalleryImages] = useState([])

  useEffect(() => {
    if(!project) return
    setGalleryImages( project.image )
  }, [project])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModal(false)}
      className="Modal"
      contentLabel="Example Modal"
    >
      <div style={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{ project?.projectName }</h1>
        <IconButton color="primary" aria-label="add to shopping cart">
          <FavoriteIcon />
        </IconButton>
      </div>

      <ContentCarousel>
        <ImageCarouser
          width={400}
          dynamicHeight={false}
          emulateTouch
          statusFormatter={ (current, total) => `${current} de ${total}` }
        >
            {
              galleryImages.map( (img, index) => (
                <div className="content-img" key={index}>
                  <img src={img} alt="img" />
                </div>
              ))
            }
        </ImageCarouser>

        <div style={{ background: 'red'}}>

        </div>

      </ContentCarousel>

      <p>{ project?.projectDescription }</p>
       
    </Modal>
  )
}

export default ProductDetail

const ImageCarouser = styled(Carousel)`
  height: auto;
  object-fit: contain;
`

const ContentCarousel = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`