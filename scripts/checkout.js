import { renderOrderSummary } from './checkouot/orderSummary.js';
import { renderPaymentSummary } from './checkouot/paymentSummary.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';

async function loadPage() {

    await loadProductsFetch();

    await new Promise((resolve) => {
            loadCart(() => {
                resolve();
            });
        });

    renderOrderSummary();
    renderPaymentSummary();


}
loadPage();




// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })

// ]).then((values) => {/* what it does was the values parameter takes the value in the resolve we given and runs / displays it */
//     console.log(values);
//     renderOrderSummary();
//     renderPaymentSummary();
// });




// /* promises syntax...as it was the built in class and inside that we need to callback function */
//  new Promise((resolve) => {
//      loadProducts(() => {
//          resolve('value1');/* we call asynchronous code and we wait to finish and we call finish() to go to next steps */
//      });
//      /* when we create Promise...it will runs this inner function immediately..at starting */

//  }).then((value) => { /* .then is used to mention which next step we need to go */
//     console.log(value);/* here value parameter will takes the value which we kept in resolve and moves to further */
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });

//  }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//  });


 /* promise lets us have as many steps we want and waits to lets us finish and then move to the next steps */


// loadProducts(() => { /* we dont need to write a function everytime..we can also use anonymous function { function without name }*/
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     }); 
// });