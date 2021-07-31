function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
// -----------------------------------------------------------------------------
var elementCount = 0
var deleteAnimationTime = 300

// delete image while click on delete icon
var deleteElements = document.querySelectorAll('i.delete')
deleteElements.forEach(element => {
  element.addEventListener('click', ({ target }) => {
    let columnElement = target.parentElement.parentElement.parentElement.parentElement
    columnElement.classList.add('deleting')
    setTimeout(() => {
      columnElement.remove()
    }, deleteAnimationTime)
  })
})

function shuffleImages() {
  let columnsElements = document.querySelectorAll('.img-column')
  sequenceOfElement = Array.from(Array(columnsElements.length).keys())
  setOrder(shuffleArray(sequenceOfElement))
}

// set order for column
function setOrder(sequenceOfElement = []) {
  let imageGrid = document.querySelector('.image-grid') // require for animation
  imageGrid.style.height = `${imageGrid.offsetHeight}px` // require for animation

  let columnsElements = document.querySelectorAll('.img-column')
  columnsElements.forEach((ele, i) => {
    ele.style.height = `${ele.offsetHeight}px` // require for animation
    ele.style.width = `${ele.offsetWidth}px` // require for animation
    setAnimationPosition(i) // require for animation
    ele.style.order = sequenceOfElement.length ? sequenceOfElement[i] : i;
    elementCount = i + 1
    setTimeout(() => { // require for animation
      setAnimationPosition(i, false)
    }, deleteAnimationTime)
    setTimeout(() => { // require for animation
      imageGrid.style.height = 'auto'
    }, 900)
  })

}

function setAnimationPosition(i, isAnimationStart = true) { // require for animation
  let columnElement = document.querySelectorAll('.img-column')[i]
  let columnElementPosition = columnElement.getBoundingClientRect()
  let animateElement = columnElement.children[0]
  animateElement.style.top = `${columnElementPosition.top}px`
  animateElement.style.left = `${columnElementPosition.left}px`
  if (isAnimationStart) {
    animateElement.style.position = 'fixed'
  }
  else {
    setTimeout(() => {
      animateElement.style.position = 'static'
    }, 800)
  }
}


setOrder()