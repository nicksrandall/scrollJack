const scrollJack = new ScrollJack(document.getElementById('scroll-container'));

const h1 = document.getElementById('heading');
scrollJack.on(ScrollJack.SCROLL, ({ inView, aboveView, belowView, leftOfView, rightOfView }) => {
  console.log('element is in viewport', inView(h1))
})
