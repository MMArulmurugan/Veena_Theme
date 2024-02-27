class addToCart extends HTMLElement {
    constructor() {
        super();
        
        console.log(this);
        this.addEventListener('click', this.addtocart);
    }
    addtocart() {
        let formData = {
            'items': [{
                'id': Number(this.dataset.productId),
                'quantity':Number( this.dataset.quantity)
            }]
        };

        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                return response.json();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
}

customElements.define('add-to-cart', addToCart);