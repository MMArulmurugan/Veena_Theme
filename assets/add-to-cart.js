


// btn.addEventListener("click", () => {
//   const cart = document.querySelector("cart-drawer");
//   console.log(cart.getSectionsToRender());
//   let formData = {
//     items: [
//       {
//         id: btn.dataset.id,
//         quantity: btn.dataset.quantity,
//         properties: {
//           "First name": userInput.value,
//           "_Last Name": "Hari",
//         },
//         sections: cart.getSectionsToRender().map((section) => section.id),
//       },
//     ],
//   };

//   fetch("/cart/add.js", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   })
//     .then((response) => {
//       console.log(response);
//       cart.open();
//       return response.json();
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// });