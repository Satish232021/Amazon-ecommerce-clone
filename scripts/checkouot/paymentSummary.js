import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-object.js";
import formatCurrency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
      const product = getProduct(cartItem.productId);
      productPriceCents += product.priceCents * cartItem.quantity;

      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      shippingPriceCents += deliveryOption.priceCents;
    });
    // console.log(productPriceCents);
    // console.log(shippingPriceCents);

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const TaxCents = totalBeforeTaxCents * 0.1;/* which is 10% tax of total cost */
    const totalCents = totalBeforeTaxCents + TaxCents;

    
    const paymentSummaryHTML = `
    
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(TaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders',{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });
    
            const order = await response.json(); /* response was also a promise so we need to use await to wait until it gets data from backend */
            addOrder(order);
        }
        catch {
            console.log('Unexpected error. Try again later');
        }
        
        window.location.href = 'orders.html';
    });
    
}
