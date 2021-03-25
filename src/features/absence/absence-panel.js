import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "@emotion/styled"

import { fetchAbsenceEvents, selectAll } from "./absenceSlice"

const AbsenceItem = styled.li`
  width: 50%;
  font-family: san-serif;
  font-size: 3.6rem;
  line-height: 1.5;
  text-align: left !important;
`

function AbsencePanel() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.absence.status)
  const items = useSelector(state => selectAll(state.absence))

  const getAllAbsenceEvents = () => {
    dispatch(fetchAbsenceEvents())
  }

  useEffect(() => {
    getAllAbsenceEvents()

    const timer = setInterval(() => {
      getAllAbsenceEvents()
    }, 60 * 60 * 2 * 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none" }}>
      {status === "succeeded" &&
        items.map(item => (
          <AbsenceItem key={item.id}>{item.summary}</AbsenceItem>
        ))}
      {items.length < 1 && <AbsenceItem>오늘은 휴가자가 없습니다.</AbsenceItem>}
    </ul>
  )
}

export default AbsencePanel
