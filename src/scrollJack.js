const getViewPortSize = () => ({
  top: 0,
  left: 0,
  width:
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,
  height:
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
});

const scrollTop = element => {
  if (element === document.body) {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    );
  }
  return element.scrollTop;
};

const scrollLeft = element => {
  if (element === document.body) {
    return (
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft
    );
  }
  return element.scrollLeft;
};

// TODO: support offsets
class ScrollJack {
  constructor(element = document.body) {
    this.element = element;
    this.registry = Object.create(null);
    this.bbMap = new Map();
    this.raf = null;
    this.timeout = null;
    this.lastScrollY = 0;
    this.lastScrollX = 0;

    this.viewport =
      this.element === document.body
        ? getViewPortSize()
        : element.getBoundingClientRect();

    this.handler = this.handler.bind(this);
    this.resize = this.resize.bind(this);
    this.inView = this.inView.bind(this);
    this.aboveView = this.aboveView.bind(this);
    this.belowView = this.belowView.bind(this);
    this.leftOfView = this.leftOfView.bind(this);
    this.rightOfView = this.rightOfView.bind(this);
    this.atTop = this.atTop.bind(this);
    this.atLeft = this.atLeft.bind(this);
    this.atBottom = this.atBottom.bind(this);
    this.atRight = this.atRight.bind(this);
    this.getBoundingClientRect = this.getBoundingClientRect.bind(this);

    this.makeProps(null);

    if (this.element === document.body) {
      window.addEventListener("scroll", this.handler, {
        capture: false,
        passive: true
      });
    } else {
      this.element.addEventListener("scroll", this.handler, {
        capture: false,
        passive: true
      });
    }

    window.addEventListener("resize", this.resize, {
      capture: false,
      passive: true
    });
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
  trigger(name, ) {
    (this.registry[name] || []).slice().map(handler => {
      handler(this.props);
    });
    return this;
  }
  resize() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.viewport =
        this.element === document.body
          ? getViewPortSize()
          : this.element.getBoundingClientRect();
    }, 16);
  }
  destory() {
    if (this.element === document.body) {
      window.removeEventListener("scroll", this.handler);
    } else {
      this.element.removeEventListener("scroll", this.handler);
    }

    window.removeEventListener("resize", this.resize);
  }
  getBoundingClientRect(element) {
    let br;
    if (this.bbMap.has(element)) {
      br = this.bbMap.get(element);
    } else {
      br = element.getBoundingClientRect();
      this.bbMap.set(element, br);
    }
    return br;
  }
  // TODO Add offset for container element if not window
  inView(element) {
    const br = this.getBoundingClientRect(element);
    return (
      br.top - this.viewport.top > -1 * br.height &&
      br.top - this.viewport.top < this.viewport.height &&
      br.left - this.viewport.left > -1 * br.width &&
      br.left - this.viewport.left < this.viewport.width
    );
  }
  // TODO Add offset for container element if not window
  aboveView(element) {
    const br = this.getBoundingClientRect(element);
    return -1 * (br.top - this.viewport.top) > br.height;
  }
  // TODO Add offset for container element if not window
  belowView(element) {
    const br = this.getBoundingClientRect(element);
    return br.top - this.viewport.top > this.viewport.height;
  }
  leftOfView(element) {
    const br = this.getBoundingClientRect(element);
    return -1 * (br.left - this.viewport.left) > br.width;
  }
  rightOfView(element) {
    const br = this.getBoundingClientRect(element);
    return br.left - this.viewport.left > this.viewport.width;
  }
  atTop(element) {
    const br = this.getBoundingClientRect(element);
    return (
      br.top - this.viewport.top <= 0 &&
      -1 * (br.top - this.viewport.top) < br.height
    );
  }
  atBottom(element) {
    const br = this.getBoundingClientRect(element);
    return (br.top - this.viewport.top + br.height) >= this.viewport.height
  }
  atLeft(element) {
    const br = this.getBoundingClientRect(element);
    return (
      br.left - this.viewport.left <= 0 &&
      -1 * (br.left - this.viewport.left) < br.width
    );
  }
  atRight(element) {
    const br = this.getBoundingClientRect(element);
    return (br.left - this.viewport.left + br.width) >= this.viewport.width
  }
  makeProps(event) {
    if (this.props) {
      return this.props;
    }
    const props = {
      event,
      viewport: this.viewport,
      getBoundingClientRect: this.getBoundingClientRect,
      inView: this.inView,
      aboveView: this.aboveView,
      belowView: this.belowView,
      leftOfView: this.leftOfView,
      rightOfView: this.rightOfView,
      atTop: this.atTop,
      atBottom: this.atBottom,
      atLeft: this.atLeft,
      atRight: this.atRight,
    };
    props.scrollPositionY = scrollTop(this.element);
    props.scrollPositionX = scrollLeft(this.element);

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

    this.props = props;
    return this.props;
  }
  handler(event) {
    if (this.raf) {
      window.cancelAnimationFrame(this.raf);
    }
    this.raf = window.requestAnimationFrame(() => {
      this.bbMap.clear();
      this.props = null;
      this.makeProps(event);

      // all scrolls
      this.trigger(ScrollJack.SCROLL);

      // vertical scrolls
      this.props.goingUp && this.trigger(ScrollJack.SCROLL_UP);
      this.props.goingDown && this.trigger(ScrollJack.SCROLL_DOWN);
      this.props.vertical && this.trigger(ScrollJack.SCROLL_VERTICAL);

      // // horizontal scrolls
      this.props.goingLeft && this.trigger(ScrollJack.SCROLL_LEFT);
      this.props.goingRight && this.trigger(ScrollJack.SCROLL_RIGHT);
      this.props.horizontal && this.trigger(ScrollJack.SCROLL_HORIZONTAL);
    });
  }
}

ScrollJack.SCROLL = "SCROLL";
ScrollJack.SCROLL_VERTICAL = "SCROLL_VERTICAL";
ScrollJack.SCROLL_UP = "SCROLL_UP";
ScrollJack.SCROLL_DOWN = "SCROLL_DOWN";
ScrollJack.SCROLL_HORIZONTAL = "SCROLL_HORIZONTRAL";
ScrollJack.SCROLL_LEFT = "SCROLL_LEFT";
ScrollJack.SCROLL_RIGHT = "SCROLL_RIGHT";

export default ScrollJack;
