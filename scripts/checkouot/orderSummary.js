import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/delivery-object.js';

hello(); 

const today = dayjs();/* this will give the current day and date and time */
const deliveryDate = today.add(7, 'days');/* it will add the days we need..1st value was how much we need to add and the 2nd value was what we need to add ..here days so days in that string */
console.log(deliveryDate.format('dddd, MMMM D'));/* dayjs ..according to that there are some ways and shorts to format the date we required..and we used here ... dddd means day with full name...MMMM means month will full name....D means date number*/

export function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {

        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        

        const deliveryOptionId = cartItem.deliveryOptionId;

        let deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );

        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );


        /* console.log(matchingProduct); just for checking purpose */
        cartSummaryHTML += `   <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
            `;
    });
    /* console.log(cartSummaryHTML); checking purpose
    */

    function deliveryOptionsHTML(matchingProduct, cartItem) {

        let html = '';
        deliveryOptions.forEach((deliveryOption) => {

            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );

            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );

            const priceString = deliveryOption.priceCents 
            === 0 
            ? 'FREE'  /* just for reminder this is a ternary operator...if the value left was true the value is whatever after the ?...if value was false the value is whatever the value afrer : ..this is the working of ternary operator  */
            : `$${formatCurrency(deliveryOption.priceCents)} -`; 

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            html += 
            `
            <div class="delivery-option js-delivery-option" data-product-id= "${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>

            `
            
        });
        return html;
    };

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.delete-quantity-link').forEach((link) =>{
        link.addEventListener('click', () =>{
            const productId = link.dataset.productId;
            /* console.log(productId); */
            removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        /* console.log(container); */
        container.remove();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            // const productId =element.productId;
            // const deliveryOptionId = element.dataset.deliveryOptionId;
            // the shorthand property for above two is wrtten below...
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary(); /* A function can call / re-run itself which is called recursion */
        });
    });
}

