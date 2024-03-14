class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.productHandle = this.dataset.productHandle;
    console.log("product-handle", this.productHandle);
    this.sectionId = this.dataset.sectionId;
    if (this.querySelector("script")) {
      this.variantData = JSON.parse(this.querySelector("script").textContent);
    }
    this.addEventListener("change", this.onOptionChange);
  }

  onOptionChange() {
    console.log("clicked");

    this.selectedOptions = Array.from(
      this.querySelectorAll('input[type="radio"]:checked'),
      (input) => input.value
    );
    this.currentVariant = this.variantData.find(
      (item) =>
        JSON.stringify(item.options) == JSON.stringify(this.selectedOptions)
    );
    console.log("variantdata", this.variantData);
    console.log("current variant", this.currentVariant);
    this.getUpdatedCard();
  }

  getUpdatedCard() {
    // const url = `/products/${this.productHandle}?variant=${this.currentVariant.id}&section_id=custom-product-card`;
    const url = `/products/${this.productHandle}?view=product-card&variant=${this.currentVariant.id}`;
    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        this.innerHTML = html.querySelector(
          `[data-product-handle="${this.productHandle}"]`
        ).innerHTML;
      });
  }
}

customElements.define("product-card", ProductCard);
