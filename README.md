# ScrollJack
A tiny (~1kb) helper library for scroll based interactions

## Usage
```js
import scrollJack, { events: { SCROLL_DOWN } } from 'scrolljack'

const h1 = document.getElementById('heading');
scrollJack.on(SCROLL_DOWN, ({ scollPositionX, inView }) => {
  if (scrollPositionX <= 0) {
    // at top of page!
  }

  if (inView(h1)) {
    // the heading element is in the viewport!
  }
})
```

## Methods
- `on(eventName, handler)`: register a handler for given event 
- `off(eventName, handler)`: unregister a handler for given event 
- `trigger(eventName, props)`: fires all handlers for given event

## Available Events
- SCROLL: Fires on any scroll event
- SCROLL_VERTICAL: fires only when scroll vertially
- SCROLL_UP: fires only when scrolling up
- SCROLL_DOWN: firew only when scrolling down
- SCROLL_HORIZONTRAL: fires only when scrolling horizontally
- SCROLL_LEFT: fires only when scrolling left
- SCROLL_RIGHT: fires only when scrolling right

## Event Handler Props
- event: the raw scroll event
- scrollPositionY: how far the document as been vertically scrolled
- scrollPositionY: how far the document as been vertically scrolled
- goingDown: if the user is scrolling down
- goingUp: if the user is scrolling up
- goingLeft: if the user is scrolling left
- goingRight: if the user is scrolling right
- horizontal: if the user is scrolling horizontally
- vertical: if the user is scrolling vertically
- deltaY: how far the user has scroll vertically since last tick (via requestAnimationFrame)
- deltaX: how far the user has scroll horizontally since last tick (via requestAnimationFrame)

### Helpers (also passed as props)
- `inView(element)`: returns true if element is viewable in viewport
- `aboveView(element)`: returns true if element is above viewport
- `belowView(element)`: returns true if element is below viewport
