import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dotyeti from './images/dotyeti.jpeg'
import { objects } from './objects';

export const FileUpload = () => {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])  
  const [grid, setGrid] = useState(objects)

  const gridLength = grid.filter((item) => item.toggled).length
  
  function onImageChange(e) {
    setImages([...e.target.files])
    grid.map((item) => item.toggled = false);
  }

  const toggleActive = (index) =>{
    let arrayCopy = [...grid]
      arrayCopy[index].toggled ? arrayCopy[index].toggled = false : arrayCopy[index].toggled = true
      setGrid(arrayCopy)
  }
  
  const toggleActiveStyles = (index) =>{
    if(grid[index].toggled){
      return "grid-item active"
    } else {
      return "grid-item inactive"
    }
  } 
  
  useEffect(() => {
    const newImageUrls = []
    images.map((image) => newImageUrls.push(URL.createObjectURL(image)))
    setImageURLs(newImageUrls)
  }, [images])

  return (
    <Container>
      <div className="content">
      <div className="form-control">
      <h2>Step 1 - Upload Your Image</h2>
        <form onChange={onImageChange}>
          <div className="label-wrapper">
            <label htmlFor="file" id="custom-msg-one">Please choose a file on your computer.</label>
            <label htmlFor="file" id="custom-msg-two">Browse</label>
          </div>
          <input type="file" hidden="hidden" id="file" accept="image/*"  />
        </form>
          <h2 className="step-two">Step 2 - Select all the squares that contain text</h2>
          <div className="square-div">
              <div className="img-container">
                <img src={images.length < 1 ? dotyeti : imageURLs} alt="your image" className="theImg"/>
                <div className="grid-container" >
                  {grid.map((_, index) => {
                    return (
                      <div key={index} className={toggleActiveStyles(index)} onClick={() => {toggleActive(index)}}></div>
                      )
                    })}
                </div>
              </div>
              <p className="disclaimer">Disclaimer: This tool allows you to see exactly what percent of text takes up any size image or ad that you upload. Actual results may vary when running the images on Facebook or Instagram since they use artificial intelligence to detect text. Their system can mistakenly read text on products or parts of photos that you didn’t add and will flag it for using too much text. To see what Facebook sees, simply upload your image to the Facebook Overlay Tool and you can see the results.</p>
          </div>
         </div>
        <div className="results-div">
          <h2 className="step-three">Step 3 - Your Results</h2>
        <div className="outcomes">
          <h5>{gridLength} {gridLength === 1 ? 'square' : 'squares'} selected containing text</h5>
          <h5>{gridLength * 4}% of your image contains text</h5>
            {gridLength === 0 ? (<h5>Please select one or more squares containing text</h5>) :
            gridLength < 6 ? (<h5 className="success">Congratulations! Your image meets the Facebook/Instagram text threshold of 20% or less text.</h5>) : (
              <h5 className="error">Whoops! It looks like your image contains more than 20% text. Why does this matter though? Well, if you want to run this image as a paid advertisement on Facebook or Instagram, you may experience a lower reach. This means fewer people will see your ad than if you had 20% text or less on the image.</h5>
            )}
        </div>
        </div>
      </div>
    </Container>
  )
};

const Container = styled.div `
  background-color: rgb(242, 245, 250);
  width: 95%;  
  margin: 0 auto; 

.disclaimer {
  font-size: 0.75rem;
  line-height: 1.5em;
  margin-top: 2.5em ;
}

.square-div {
  padding: 15px 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 5px #B8B8B8; 
}

.img-container {
  position: relative;
  margin-top: 1em;
}

.step-two,
.step-three,
.results-div {
  margin-bottom: 0.5em;
}

.results-div{
  margin-top: 5em;
}

.label-wrapper {
  display: flex;
  background: rgb(242, 245, 250);
  justify-content: space-between;
  align-items: center;
  padding: 0.3em;
  border-radius: 5px;
  border: 1px solid black;
}

form {
  padding: 5px;
  background: #fff;
  box-shadow: 0 0 5px #B8B8B8;
  border-radius: 5px;
  width: 100%; 
  margin: 1em 0 5em 0;
  padding: 0.5em;
}

#custom-msg-one {
  color: rgb(153, 153, 153);
  font-weight: 700;
  margin-left: 0.5em;
}

#custom-msg-two {
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  padding: 0.3em 0.6em;
  cursor: pointer;
  background-color: rgb(241, 0, 127) ;
  transition: 0.3s;
}

#custom-msg-two:hover {
  background-color: rgb(200, 2, 108);
  transition: 0.2s;
}

.theImg {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.grid-container {
  position: absolute;
  width: 100%; 
  height: 100%;
  left: 0;
  top: 0; 
  border: 1px solid gray;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.grid-item {
  cursor: pointer;
  border: 1px solid #BBBBBB;
  grid-gap: 0;
}

@media (min-width: 500px){
  .grid-item{
    &:hover {
    background-color: rgba(203, 203, 203, 0.6);
  }
  }
}

.inactive {
  background-color: none;
}

.active {
  background-color: rgba(229, 47, 127, 0.65);
}

.outcomes {
  background: #fff;
  border-radius: 5px;
  padding: 2em 1.5em;
  box-shadow: 0 0 5px #B8B8B8;
 }

.success {
  color: rgb(0, 128, 0);
}

.error {
  color: rgb(255, 0, 0);
}

@media (min-width: 1024px){
  .content {
    display: grid;
    grid-template-columns: 63% 37%;
  }
  .results-div {
    margin: 11.8em 3em 0 3em;
  }
}
`

export default FileUpload;
