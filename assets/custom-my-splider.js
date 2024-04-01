class SplideSliderTwo extends HTMLElement {
    constructor() {
        super();
        this.splideEl = this.querySelector(".splide");
        this.options = JSON.parse(this.getAttribute("data-splide-options"));

        console.log(this.options);
        this.mountSplider();
    }

    mountSplider() {
        let thumbnailSplide = new Splide(this.splideEl, this.options);
        let mainSplide = null;

        thumbnailSplide.mount();

        thumbnailSplide.on("click", (slide) => {
            const index = slide.index;
            mainSplide.go(index);
        });

        if (this.options.id === "thumbnail-slider") {
            const mainSliderEl = document.querySelector(".custom-timeline--main-slider .splide");
            const mainOptions = JSON.parse(mainSliderEl.getAttribute("data-splide-options"));
            mainSplide = new Splide(mainSliderEl, mainOptions);
            mainSplide.mount();

            // Set the start option to the index of the last slide
            mainSplide.on('mounted', () => {
                mainSplide.go(mainSplide.length - 1); // Go to the last slide
            });
        }
    }
}

customElements.define("splide-slider-two", SplideSliderTwo);
