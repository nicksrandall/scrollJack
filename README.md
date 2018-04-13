# ScrollJack
A tiny (~1kb) helper library for scroll based interactions

## Usage
```js
import ScrollJack from 'scrolljack'

const scrollJack = new ScrollJack(document.body);

const h1 = document.getElementById('heading');
scrollJack.on(ScrollJack.SCROLL_DOWN, ({ scollPositionX, inView }) => {
  if (scrollPositionX <= 0) {
    // at top of page!
  }

  if (inView(h1)) {
    // the heading element is in the viewport!
  }
})
```

## Constructor
- `ScrollJack(containerElement)` - create a new scroll jack instance for given contianer. If no container is passed, `document.body` is used.

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
- viewport: an object with the width, height, top, bottom, left, right, of scroll container;
- scrollPositionY: how far the document as been vertically scrolled
- scrollPositionX: how far the document as been horizontally scrolled
- goingDown: if the user is scrolling down
- goingUp: if the user is scrolling up
- goingLeft: if the user is scrolling left
- goingRight: if the user is scrolling right
- horizontal: if the user is scrolling horizontally
- vertical: if the user is scrolling vertically
- deltaY: how far the user has scroll vertically since last tick (via requestAnimationFrame)
- deltaX: how far the user has scroll horizontally since last tick (via requestAnimationFrame)

### Helpers (also passed as props)
- `getBoundingClientRect(element)`: returns a cached version of bounding client rect for element
- `inView(element)`: returns true if element is viewable in viewport
- `aboveView(element)`: returns true if element is above viewport
- `belowView(element)`: returns true if element is below viewport
- `leftOfView(element)`: returns true if element is left of viewport
- `rightOfView(element)`: returns true if element is right of viewport
- `atTop(element)`: returns true if element is touching top of viewprot
- `atLeft(element)`: returns true if element is touching left side of viewprot

## Related Work
- *https://github.com/stutrek/scrollMonitor* - this project takes an imperative approach to scroll based interactions while ScrollJack attempts to keep things declarative.
