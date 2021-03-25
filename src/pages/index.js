import * as React from "react"
import styled from "@emotion/styled"
import { connect } from "react-redux"

import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Clock from "../components/clock"
import AbsencePanel from "../features/absence/absence-panel"
import Today from "../features/today/today"

const ContentsWrapper = styled.div`
  position: relative;
  margin-top: 3.6rem;
  height: calc(
    var(--vh) * 100 - env(safe-area-inset-top) - env(safe-area-inset-bottom) -
      3.6rem
  );
`

const API_HOST = "https://culture.iportfolio.co.kr"

const IndexPage = () => {
  const [payday, setPaydayMessage] = React.useState("payday")
  const [cashDisbursement, setCashDisbursementMessage] = React.useState("cash")

  const fetchTodayEvents = async () => {
    const today = await fetch(`${API_HOST}/api/today`)
    const response = await today.json()

    setPaydayMessage(response.payday)
    setCashDisbursementMessage(response.cashDisbursement)
  }

  React.useEffect(() => {
    fetchTodayEvents()
    const timer = setInterval(() => {
      fetchTodayEvents()
    }, 60 * 60 * 2 * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <Clock style={{ height: "16rem" }} />
      <ContentsWrapper>
        <Carousel
          autoPlay={true}
          interval={7000}
          infiniteLoop={true}
          centerMode={false}
          showArrows={false}
          showStatus={false}
        >
          <Today message={payday} />
          <Today message={cashDisbursement} />
          <AbsencePanel />
        </Carousel>
      </ContentsWrapper>
    </Layout>
  )
}

export default connect()(IndexPage)
