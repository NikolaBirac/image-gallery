export default () => {
  window.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementsByTagName("header")[0]
    const list = document.getElementsByClassName("list")[0]

    header.addEventListener("change", function () {
      const headerHeight = header.clientHeight
      const newListHeight = `calc(100vh - ${headerHeight}px)`
      list.style.height = newListHeight
    })
    const chg = new Event("change")
    header.dispatchEvent(chg)
  })
}