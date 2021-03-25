import * as React from "react"
import styled from "@emotion/styled"

const Wrapper = styled.div`
  font-family: san-serif;
  font-size: 3.6rem;
  line-height: 1.5;
  text-align: left !important;
`

function Today({ message }) {
  const messageToMultiLineElements = () => {
    return message.split("\n").map(p => (
      <>
        {p}
        <br />
      </>
    ))
  }

  return <Wrapper>{messageToMultiLineElements()}</Wrapper>
}

export default Today
