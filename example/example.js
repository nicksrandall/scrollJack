const h1 = document.getElementById('heading');
window.scrollJack.on(window.scrollJack.events.SCROLL, ({ inView, aboveView, belowView }) => {
  console.log('element is in viewport', inView(h1))
  console.log('element is above viewport', aboveView(h1))
  console.log('element is below viewport', belowView(h1))
})
