import { renderOrderSummary } from "../../scripts/checkouot/orderSummary.js";
import {loadFromStorage, cart} from '../../data/cart.js';
import { loadProducts } from "../../data/products.js";


describe('test  suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';


    beforeAll((done) => {
        loadProducts(() => {
            done(); /* done() function allowa us to control when to go to the next step....if we not use this we keep waiting forever */
        }); /* this make sure that the products load first and we call done and then mve to the further steps of code */
    });/* we can also use the done inside beforeEach((done) => { ..}) or it((done ) => {...}) to waait for the response from thebackend and to move to the further steps of code*/

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>

        `;/* this was the real code used in in web ...this basically takes this container and put in the test div container.. */


        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            },{
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]); /* localStorage only supports strings ..so we need to return in string so..we used JSON.stringify() method */
        });
        // console.log(localStorage.getItem('cart'));
        loadFromStorage();

        renderOrderSummary();
    });

    it('displays the cart', () => {

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2); 
        expect(
            document.querySelector(`.product-quantity`).innerText
        ).toContain('Quantity: 2');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('removes a product', () => {
        

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        document.querySelector('.js-test-container').innerHTML = '';

    });
});