class SplideSlider extends HTMLElement {
    constructor() {
      super();
      this.splideEl = this.querySelector(".splide");
      this.options = JSON.parse(this.getAttribute("data-splide-options"));
  
      console.log(this.options);
      this.mountSplider();
    }
  
    mountSplider() {
      let splide =  new Splide(this.splideEl, this.options);
      splide.mount();
    }
  }
  
  customElements.define("splide-slider", SplideSlider);