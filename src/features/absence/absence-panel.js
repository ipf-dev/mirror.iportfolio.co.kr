import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"

const AbsenceItem = styled.li`
  width: 50%;
  font-family: san-serif;
  font-size: 2.4rem;
  line-height: 1.5;
  text-align: left !important;
`

const API_HOST = "https://culture.iportfolio.co.kr"

async function getAllAbsenceEvents() {
  const request = await fetch(`${API_HOST}/api/absence`)
  const response = await request.json()

  return response.items
}

function AbsencePanel() {
  const [items, updateItems] = useState([])

  const getEvents = async () => {
    const items = await getAllAbsenceEvents()
    updateItems(items)
  }

  useEffect(() => {
    getEvents()

    const timer = setInterval(() => {
      getEvents()
    }, 60 * 60 * 2 * 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none" }}>
      {items.length > 0 &&
        items.map(item => (
          <AbsenceItem key={item.id}>{item.summary}</AbsenceItem>
        ))}
      {items.length < 1 && <AbsenceItem>오늘은 휴가자가 없습니다.</AbsenceItem>}
    </ul>
  )
}

export default AbsencePanel
