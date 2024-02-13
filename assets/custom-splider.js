class SplideSlider extends HTMLElement {
    constructor() {
      super();
      this.splideEl = this.querySelector(".splide");
      this.options = JSON.parse(this.querySelector("script").textContent);
  
      console.log(this.options);
      this.mountSplider();
    }
  
    mountSplider() {
      new Splide(this.splideEl, this.options).mount();
    }
  }
  
  customElements.define("splide-slider", SplideSlider);