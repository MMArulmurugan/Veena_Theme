/*
Variant selection with variants
class ProductCard extends HTMLElement {
  constructor() {
    super();

    this.productHandle = this.dataset.productHandle;
    this.sectionId = this.dataset.sectionId;
    
    this.variantData = JSON.parse(this.querySelector('script').textContent);
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.selectedVariant = this.querySelector('[name="id"]').value;
    this.getCurrentVariant();
  }

  getCurrentVariant() {  
    this.currentVariant = this.variantData.find(variant => variant.id == this.selectedVariant);
    this.getUpdatedCard();
  }

  getUpdatedCard() {
    const url = `/products/${this.productHandle}?variant=${this.currentVariant.id}&section_id=${this.sectionId}`;

    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, "text/html");
        this.innerHTML = html.querySelector(`[data-product-handle="${this.productHandle}"]`).innerHTML;
      });
  }
}

customElements.define('product-card', ProductCard);
*/

// Variant selection with options
class ProductCard extends HTMLElement {
    constructor() {
      super();
  
      this.productHandle = this.dataset.productHandle;
      this.sectionId = this.dataset.sectionId;
      
      this.variantData = JSON.parse(this.querySelector('script').textContent);
      this.addEventListener('change', this.onOptionChange);
      
      this.addEventListener('change', event => {
        console.log("Hey", event.target);
        if (event.target.name == "id") this.variantChange();
    })
    }

    variantChange() {

        this.selectedVariantId = this.querySelector('[name="id"]').value;
        let variantUrl = `/products/${this.dataset.productHandle}?view=card&variant=${this.selectedVariantId}`;

        //Change the DOM Elements
        fetch(variantUrl)
            .then((response) => response.text())
            .then((responseText) => {
                const html = new DOMParser().parseFromString(responseText, 'text/html');
                const responseCard = html.querySelector('custom-product-card');

                this.innerHTML = responseCard.innerHTML;
            });
    }
  
    onOptionChange() {
      this.selectedOptions = Array.from(this.querySelectorAll('input[type="radio"]:checked'), input => input.value);
      this.currentVariant = this.variantData.find(item => JSON.stringify(item.options) == JSON.stringify(this.selectedOptions))
      
      this.getUpdatedCard();
    }
  
    getUpdatedCard() {
      const url = `/products/${this.productHandle}?variant=${this.currentVariant.id}&section_id=${this.sectionId}`;
  
      fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, "text/html");
          this.innerHTML = html.querySelector(`[data-product-handle="${this.productHandle}"]`).innerHTML;
        });
    }
  }
  
  customElements.define('product-card', ProductCard);