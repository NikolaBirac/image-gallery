export const setGalleryHeight = function () {
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

export const setImageHeight = function () {
  const container = document.getElementsByClassName('image-details')[0]

  if (container) {
    const para = container.getElementsByClassName('image-main-comment')[0]
    if (para) {
      const contHeight = container.clientHeight
      const paraHeight = para.clientHeight
      const viewImg = container.getElementsByTagName('img')[0]
      // take padding of element
      const pt = window
        .getComputedStyle(container, null)
        .getPropertyValue('padding-top')

      const padding = +pt.replace('px', '') * 2
      viewImg.style.maxHeight = contHeight - padding - paraHeight + 'px'
    }
  }
}
