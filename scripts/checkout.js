import { renderOrderSummary } from './checkouot/orderSummary.js';
import { renderPaymentSummary } from './checkouot/paymentSummary.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts } from '../data/products.js';



loadProducts(() => { /* we dont need to write a function everytime..we can also use anonymous function { function without name }*/
    renderOrderSummary();
    renderPaymentSummary();
});