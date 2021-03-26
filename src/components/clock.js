import React from "react"
import styled from "@emotion/styled"

import moment from "moment"

const DateWrapper = styled.div`
  font-size: 3.6rem;
`

const ClockWrapper = styled.div`
  font-family: "Courier New", san-serif;
  font-size: 9.6rem;
  font-weight: 900;
  text-align: right;
`

export default function Clock() {
  const [now, setNow] = React.useState(moment())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNow(moment())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })

  return (
    <ClockWrapper>
      <DateWrapper>{now.format("LL")}</DateWrapper>
      {now.format("LT")}
    </ClockWrapper>
  )
}
