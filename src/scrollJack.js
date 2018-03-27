export const events = {
  SCROLL: 'scroll',
  SCROLL_VERTICAL: 'scroll-vertical',
  SCROLL_UP: 'scroll-up',
  SCROLL_DOWN: 'scroll-down',
  SCROLL_HORIZONTRAL: 'scroll-horizontal',
  SCROLL_LEFT: 'scroll-left',
  SCROLL_RIGHT: 'scroll-right'
};

class ClearableWeakMap {
  constructor(init) {
    this._wm = new WeakMap(init);
  }
  clear() {
    this._wm = new WeakMap();
  }
  delete(k) {
    return this._wm.delete(k);
  }
  get(k) {
    return this._wm.get(k);
  }
  has(k) {
    return this._wm.has(k);
  }
  set(k, v) {
    this._wm.set(k, v);
    return this;
  }
}

export const getViewPortSize = () => {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight || e.clientHeight || g.clientHeight;
  return { width, height };
};

export const scrollTop = () =>
  document.documentElement.scrollTop || document.body.scrollTop;

export const scrollLeft = () =>
  document.documentElement.scrollLeft || document.body.scrollLeft;

export class ScrollJack {
  constructor() {
    this.events = events;
    this.registry = {};
    this.raf = null;
    this.lastScrollY = 0;
    this.lastScrollX = 0;

    this.bbMap = new ClearableWeakMap();
    this.viewport = getViewPortSize();

    this._handler = this._handler.bind(this);
    this.inView = this.inView.bind(this);
    this.aboveView = this.aboveView.bind(this);
    this.belowView = this.belowView.bind(this);

    window.addEventListener('scroll', this._handler, false);

    let timeout = null;
    window.addEventListener(
      'resize',
      () => {
        if (timeout) {
          window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(() => {
          this.viewport = getViewPortSize();
        }, 16);
      },
      false
    );
  }
  on(name, handler) {
    (this.registry[name] || (this.registry[name] = [])).push(handler);
    return this;
  }
  off(name, handler) {
    if (this.registry[name]) {
      this.registryl[name].splice(
        this.registry[name].indexOf(handler) >>> 0,
        1
      );
    }
    return this;
  }
  trigger(name, props) {
    (this.registry[name] || []).slice().map(handler => {
      handler(props);
    });
    return this;
  }
  getClientBoundingRect(element) {
    let br;
    if (this.bbMap.has(element)) {
      br = this.bbMap.get(element);
    } else {
      br = element.getBoundingClientRect();
      this.bbMap.set(element, br);
    }
    return br;
  }
  inView(element) {
    const br = this.getClientBoundingRect(element);
    return br.top > -1 * br.height;
  }
  aboveView(element) {
    const br = this.getClientBoundingRect(element);
    return br.top < 0;
  }
  belowView(element) {
    const br = this.getClientBoundingRect(element);
    return br.top > this.viewport.height;
  }
  _handler(event) {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
    this.raf = window.requestAnimationFrame(() => {
      const props = {
        event,
        inView: this.inView,
        aboveView: this.aboveView,
        belowView: this.belowView
      };
      props.scrollPositionY = scrollTop();
      props.scrollPositionX = scrollLeft();

      // vertical
      if (props.scrollPositionY > this.lastScrollY) {
        props.goingDown = true;
        props.goingUp = false;
        props.vertical = true;
      } else if (props.scrollPositionY < this.lastScrollY) {
        props.goingDown = false;
        props.goingUp = true;
        props.vertical = true;
      } else {
        props.goingDown = false;
        props.goingUp = false;
        props.vertical = false;
      }
      // horizontal
      if (props.scrollPositionX > this.lastScrollX) {
        props.goingRight = true;
        props.goingLeft = false;
        props.horizontal = true;
      } else if (props.scrollPositionX < this.lastScrollX) {
        props.goingRight = false;
        props.goingLeft = true;
        props.horizontal = true;
      } else {
        props.goingRight = false;
        props.goingLeft = false;
        props.horizontal = false;
      }

      props.deltaY = props.scrollPositionY - this.lastScrollY;
      props.deltaX = props.scrollPositionX - this.lastScrollX;

      this.lastScrollY = props.scrollPositionY;
      this.lastScrollX = props.scrollPositionX;

      // all scrolls
      this.trigger(events.SCROLL, props);

      // vertical scrolls
      props.goingUp && this.trigger(events.SCROLL_UP, props);
      props.goingDown && this.trigger(events.SCROLL_DOWN, props);
      props.vertical && this.trigger(events.SCROLL_VERTICAL, props);

      // // horizontal scrolls
      props.goingLeft && this.trigger(events.SCROLL_LEFT, props);
      props.goingRight && this.trigger(events.SCROLL_RIGHT, props);
      props.horizontal && this.trigger(events.SCROLL_HORIZONTAL, props);

      this.bbMap.clear();
    });
  }
}

export default new ScrollJack();
