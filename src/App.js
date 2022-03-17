import React from "react"
import FileUpload from "./FileUpload";
import styled from 'styled-components'

function App() {
  return (
    <Container>
      <FileUpload/>
    </Container>
  )
}

const Container = styled.div `
    background-color: rgb(242, 245, 250);
    color: rgb(35, 61, 99);
    max-width: 1170px;
    margin: 0 auto;
    padding: 5em 0;
`

export default App;
