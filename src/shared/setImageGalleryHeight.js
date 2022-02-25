export default () => {
  if (window.outerWidth > 991) {
    const list = document.getElementsByClassName("list")[0]
    const header = document.getElementsByTagName("header")[0]
    header.addEventListener("change", () => {
      const headerHeight = header.clientHeight
      const newListHeight = `calc(100vh - ${headerHeight}px)`
      list.style.height = newListHeight
    })
    const chg = new Event("change")
    header.dispatchEvent(chg)
  }
}