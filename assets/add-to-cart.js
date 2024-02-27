const btn = document.getElementById('custom-my-btn');
const firstNameInput = document.getElementById('firstNameInput');

const cartQnty = document.querySelector(".quantity__input").getAttribute('data-cart-quantity');
console.log(cartQnty);


btn.addEventListener('click', () => {
  // Get user input from the input field
  const userFirstName = firstNameInput.value;

  let formData = {
    items: [
      {
        id: btn.dataset.productId,
        quantity: btn.dataset.quantity,
        properties: {
          "First name": userFirstName,
          "_Last Name": "Murugan"
        },
      },
    ],
  };

  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
