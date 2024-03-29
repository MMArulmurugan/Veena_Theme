if (!customElements.get("product-cart-element")) {
    class ProductCartElement extends HTMLElement {
      constructor() {
        super();
        

        this.sectionId = this.dataset.sectionId;
        this.productUrl = this.dataset.productUrl;
        this.variants = JSON.parse(this.querySelector('script').textContent);
        this.currentVariant = this.variants[0] || {}; // Initialize with the first variant
        let currentValue = 1;
        this.currentQuantity = 1; // Initialize with the default quantity
  
        // Add an event listener for input changes
        this.addEventListener('input', this.inputChange.bind(this));
  
        // Add event listener for the "Add to Cart" button
        this.addEventListener('click', function (event) {
          if (event.target.classList.contains('custom-buy-btn')) {

            // Add the product to the cart with the current quantity
            this.addToCart(this.currentVariant.id, currentValue);
  
            // Toggle visibility
            this.handleCartUpdate();
          } else if (event.target.id === 'increase' || event.target.id === 'decrease') {
            // Handle quantity changes
            this.handleQuantity(event);
          }
        }.bind(this));
  
        // Call the rendering logic when the custom element is created
        this.render();
      }
  
      inputChange() {
        let selectedValues = [];
  
        this.querySelectorAll('input').forEach(function (input) {
          if (input.checked) {
            selectedValues.push(input.value);
          }
        });
  
        this.variants.forEach(function (variant) {
          if (JSON.stringify(variant.options) == JSON.stringify(selectedValues)) {
            this.currentVariant = variant;
          }
        }.bind(this));  // Bind this to the callback function
  
        // Call the rendering logic after a variant change
        this.render();
        this.currentQuantity = 1;
        this.showAddToCartButton();
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
  
      handleQuantity(event) {
        if (event.target.id === 'increase') {
          this.increaseQuantity();
        } else if (event.target.id === 'decrease') {
         
        this.decreaseQuantity();
      
          
        }
  
        // Update the quantity display
        this.updateQuantityDisplay();
  
        // Update the cart when quantity changes
        this.updateCartQuantity(this.currentQuantity);
  
        // Toggle visibility
        this.handleCartUpdate();
      }
  
      increaseQuantity() {
        this.currentQuantity += 1;
      }
  
  decreaseQuantity() {
        if (this.currentQuantity > 0) {
      this.currentQuantity -= 1;
    }
    this.updateQuantityDisplay();
  
    // Update the cart with the new quantity
    this.updateCartQuantity(this.currentQuantity);
      }
  
      updateQuantityDisplay() {
        let quantityElement = this.querySelector('#quantity-value');
        quantityElement.textContent = this.currentQuantity;
      }
  
      handleCartUpdate() {
        // Toggle visibility based on cart update
        if (this.currentQuantity >= 1 ) {
          // Show the quantity box and hide the "Add to Cart" button
          this.showQuantityBox();
        } else {
          // Show the "Add to Cart" button and hide the quantity box
          this.showAddToCartButton();
        }
      }
  
      showQuantityBox() {
        const quantityBox = this.querySelector('.quantity-container');
        const addToCartButton = this.querySelector('.button_container');
  
        quantityBox.style.display = 'flex';
        addToCartButton.style.display = 'none';
      }
  
      showAddToCartButton() {
        const quantityBox = this.querySelector('.quantity-container');
        const addToCartButton = this.querySelector('.button_container');
  
        quantityBox.style.display = 'none';
        addToCartButton.style.display = 'flex';
      }
  
      hideQuantityBox() {
        const quantityBox = this.querySelector('.quantity-container');
        quantityBox.style.display = 'none';
      }
  
  addToCart(productId, quantity) {
        console.log('Adding to cart:', productId, quantity);
   
  
        const formData = {
          'items': [{
            'id': productId,
            'quantity': quantity
          }],
          'sections' : "header"
        };
  
        let _this = this;
  
        fetch('/cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData),
        })
          
        .then((response) => {
          if (response.ok) {
            console.log(response)
            return response.json();
            
          } else {
            throw new Error('Failed to add to cart');
          }
        })
        .then((cartData) => {
       
          
          this.showQuantityBox();
          let quantityElement = this.querySelector('#quantity-value');
        quantityElement.textContent = 1;
           this.currentQuantity = 1;
        
  debugger
  let cartBubble = cartData.sections['header'];
  let html = new DOMParser().parseFromString(cartBubble, "text/html")
  document.querySelector('#cart-icon-bubble').innerHTML = html.querySelector('#cart-icon-bubble').innerHTML
          console.log('Cart updated:', cartData);
          // Perform any additional actions or UI updates as needed
  
          // Toggle visibility based on cart update
          
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
          // Handle the error or show an error message to the user
        });
      }
  
      updateCartQuantity(quantity) {
        const productId = this.currentVariant.id;
  
        const formData = {
          updates: {
            [productId]: quantity
          },
           'sections' : "header"
        };
  
        fetch('/cart/update.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to update cart');
          }
        })
        .then(cartData => {
    debugger
          console.log('Cart updated:', cartData);
          // Log the updated quantity
         let cartBubble = cartData.sections['header'];
  let html = new DOMParser().parseFromString(cartBubble, "text/html")
  document.querySelector('#cart-icon-bubble').innerHTML = html.querySelector('#cart-icon-bubble').innerHTML
          console.log('Updated Quantity:', quantity);
        })
        .catch(error => {
          console.error('Error updating cart:', error);
        });
      }
  
      render() {
        console.log('Rendering...');
        // Construct the URL for fetching updated product data
        let productUrl = this.productUrl;
        let url = `${this.productUrl}?variant=${this.currentVariant.id}&section_id=${this.sectionId}`;
  
        let _this = this;
  
        // Fetch updated product data from the server
        fetch(url)
          .then(res => res.text())
          .then(function (data) {
            // Parse the fetched HTML and update the content of the current element
            let html = new DOMParser().parseFromString(data, "text/html");
            _this.innerHTML = html.querySelector(`[data-product-url="${productUrl}"]`).innerHTML;
            // Update the quantity display after rendering
            _this.updateQuantityDisplay();
  
            // Toggle visibility based on cart update
            
          });
      }
    }
  
    customElements.define('product-cart-element', ProductCartElement);
  }
  