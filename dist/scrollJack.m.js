var t=function(){return{top:0,left:0,width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}},i=function(i){void 0===i&&(i=document.body),this.element=i,this.registry=Object.create(null),this.bbMap=new Map,this.raf=null,this.timeout=null,this.lastScrollY=0,this.lastScrollX=0,this.viewport=this.element===document.body?t():i.getBoundingClientRect(),this.handler=this.handler.bind(this),this.resize=this.resize.bind(this),this.inView=this.inView.bind(this),this.aboveView=this.aboveView.bind(this),this.belowView=this.belowView.bind(this),this.leftOfView=this.leftOfView.bind(this),this.rightOfView=this.rightOfView.bind(this),this.atTop=this.atTop.bind(this),this.atLeft=this.atLeft.bind(this),this.atBottom=this.atBottom.bind(this),this.atRight=this.atRight.bind(this),this.getBoundingClientRect=this.getBoundingClientRect.bind(this),this.makeProps(null),this.element===document.body?window.addEventListener("scroll",this.handler,{capture:!1,passive:!0}):this.element.addEventListener("scroll",this.handler,{capture:!1,passive:!0}),window.addEventListener("resize",this.resize,{capture:!1,passive:!0})};i.prototype.on=function(t,i){return(this.registry[t]||(this.registry[t]=[])).push(i),this},i.prototype.off=function(t,i){return this.registry[t]&&this.registryl[t].splice(this.registry[t].indexOf(i)>>>0,1),this},i.prototype.trigger=function(t){var i=this;return(this.registry[t]||[]).slice().map(function(t){t(i.props)}),this},i.prototype.resize=function(){var i=this;this.timeout&&window.clearTimeout(this.timeout),this.timeout=window.setTimeout(function(){i.viewport=i.element===document.body?t():i.element.getBoundingClientRect()},16)},i.prototype.destory=function(){this.element===document.body?window.removeEventListener("scroll",this.handler):this.element.removeEventListener("scroll",this.handler),window.removeEventListener("resize",this.resize)},i.prototype.getBoundingClientRect=function(t){var i;return this.bbMap.has(t)?i=this.bbMap.get(t):(i=t.getBoundingClientRect(),this.bbMap.set(t,i)),i},i.prototype.inView=function(t){var i=this.getBoundingClientRect(t);return i.top-this.viewport.top>-1*i.height&&i.top-this.viewport.top<this.viewport.height&&i.left-this.viewport.left>-1*i.width&&i.left-this.viewport.left<this.viewport.width},i.prototype.aboveView=function(t){var i=this.getBoundingClientRect(t);return-1*(i.top-this.viewport.top)>i.height},i.prototype.belowView=function(t){return this.getBoundingClientRect(t).top-this.viewport.top>this.viewport.height},i.prototype.leftOfView=function(t){var i=this.getBoundingClientRect(t);return-1*(i.left-this.viewport.left)>i.width},i.prototype.rightOfView=function(t){return this.getBoundingClientRect(t).left-this.viewport.left>this.viewport.width},i.prototype.atTop=function(t){var i=this.getBoundingClientRect(t);return i.top-this.viewport.top<=0&&-1*(i.top-this.viewport.top)<i.height},i.prototype.atBottom=function(t){var i=this.getBoundingClientRect(t);return i.top-this.viewport.top+i.height>=this.viewport.height},i.prototype.atLeft=function(t){var i=this.getBoundingClientRect(t);return i.left-this.viewport.left<=0&&-1*(i.left-this.viewport.left)<i.width},i.prototype.atRight=function(t){var i=this.getBoundingClientRect(t);return i.left-this.viewport.left+i.width>=this.viewport.width},i.prototype.makeProps=function(t){if(this.props)return this.props;var i,e={event:t,viewport:this.viewport,getBoundingClientRect:this.getBoundingClientRect,inView:this.inView,aboveView:this.aboveView,belowView:this.belowView,leftOfView:this.leftOfView,rightOfView:this.rightOfView,atTop:this.atTop,atBottom:this.atBottom,atLeft:this.atLeft,atRight:this.atRight};return e.scrollPositionY=(i=this.element)===document.body?window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop:i.scrollTop,e.scrollPositionX=function(t){return t===document.body?window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft:t.scrollLeft}(this.element),e.scrollPositionY>this.lastScrollY?(e.goingDown=!0,e.goingUp=!1,e.vertical=!0):e.scrollPositionY<this.lastScrollY?(e.goingDown=!1,e.goingUp=!0,e.vertical=!0):(e.goingDown=!1,e.goingUp=!1,e.vertical=!1),e.scrollPositionX>this.lastScrollX?(e.goingRight=!0,e.goingLeft=!1,e.horizontal=!0):e.scrollPositionX<this.lastScrollX?(e.goingRight=!1,e.goingLeft=!0,e.horizontal=!0):(e.goingRight=!1,e.goingLeft=!1,e.horizontal=!1),e.deltaY=e.scrollPositionY-this.lastScrollY,e.deltaX=e.scrollPositionX-this.lastScrollX,this.lastScrollY=e.scrollPositionY,this.lastScrollX=e.scrollPositionX,this.props=e,this.props},i.prototype.handler=function(t){var e=this;this.raf&&window.cancelAnimationFrame(this.raf),this.raf=window.requestAnimationFrame(function(){e.bbMap.clear(),e.props=null,e.makeProps(t),e.trigger(i.SCROLL),e.props.goingUp&&e.trigger(i.SCROLL_UP),e.props.goingDown&&e.trigger(i.SCROLL_DOWN),e.props.vertical&&e.trigger(i.SCROLL_VERTICAL),e.props.goingLeft&&e.trigger(i.SCROLL_LEFT),e.props.goingRight&&e.trigger(i.SCROLL_RIGHT),e.props.horizontal&&e.trigger(i.SCROLL_HORIZONTAL)})},i.SCROLL="SCROLL",i.SCROLL_VERTICAL="SCROLL_VERTICAL",i.SCROLL_UP="SCROLL_UP",i.SCROLL_DOWN="SCROLL_DOWN",i.SCROLL_HORIZONTAL="SCROLL_HORIZONTRAL",i.SCROLL_LEFT="SCROLL_LEFT",i.SCROLL_RIGHT="SCROLL_RIGHT";export default i;
//# sourceMappingURL=scrollJack.m.js.map
