export { default as wrapRootElement } from "./src/redux-wrapper"

const vh = window.innerHeight * 0.01
document.documentElement.style.setProperty("--vh", vh + "px")
