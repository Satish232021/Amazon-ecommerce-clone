
function Cart(localStorageKey) { /* use PascalCase for things that generate objects { Cart } */
    const cart = {  /* in above we use parameter localStorageKey to get different carts with different cart itemas ,if we dont use that we will get the same cart items for each*/
        cartItems: undefined,
        loadFromStorage/* : function */() { /* here we should only use the regular function not the arrow function */ /* shorthand for loadFromlocalStorage: function() { */
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));/* this keyword will gives the access to the outer object { cartItems } */
        /* now if the cart is empty it returns a value null..so instead of that we display thw default cart value by below */
        if(!this.cartItems){ /* in this case not null will become truthy and executes below as cart will return null idf empty  by above */
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
        },
        saveToStorage() {
    
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));/* remember JSON only stores strings..so we need to convert in to strings by using stringify */
        },
        addToCart(productId){ /* shorcut for ....  addToCart : function(productId) { ...shortcut for colon function */
            let matchingItem ;
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
            if(matchingItem) {
                matchingItem.quantity += 1;
            }else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
    
            this.saveToStorage();/* this was used to access the  function inside the object*/
        },
        removeFromCart(productId) {
            const newCart = [];
            this.cartItems.forEach((cartItem) => {
                if(cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
    
            this.saveToStorage();
        },
        updateDeliveryOption(productId,deliveryOptionId){
            let matchingItem ;
            this.cartItems.forEach((cartItem) => {
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;
    
            this.saveToStorage();
        }
    };

    return cart; /* used to access cart outside the function */
}

const cart = Cart('cart-oop'); /* basically instead of copy pasting all the time just like below...we use function to generate objects */
const businessCart = Cart('cart-business');


// export let cart;/* shorthand for export cart = undefined */

cart.loadFromStorage();

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(cart);


/* created completely different cart for business cart...this was the main purpose of OOP which we can create multiple objects in real world and we can use it for ease */
/* now we have two different carts {cart, businessCart} */
// const businessCart = {
//     cartItems: undefined,
//     loadFromStorage/* : function */() { /* here we should only use the regular function not the arrow function */ /* shorthand for loadFromlocalStorage: function() { */
//         this.cartItems = JSON.parse(localStorage.getItem('cart-business'));/* this keyword will gives the access to the outer object { cartItems } */
//     /* now if the cart is empty it returns a value null..so instead of that we display thw default cart value by below */
//     if(!this.cartItems){ /* in this case not null will become truthy and executes below as cart will return null idf empty  by above */
//         this.cartItems = [{
//             productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//             quantity: 2,
//             deliveryOptionId: '1'
//         },{
//             productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//             quantity: 1,
//             deliveryOptionId: '2'
//         }];
//     }
//     },
//     saveToStorage() {

//         localStorage.setItem('cart-business', JSON.stringify(this.cartItems));/* remember JSON only stores strings..so we need to convert in to strings by using stringify */
//     },
//     addToCart(productId){ /* shorcut for ....  addToCart : function(productId) { ...shortcut for colon function */
//         let matchingItem ;
//         this.cartItems.forEach((cartItem) => {
//             if(productId === cartItem.productId){
//                 matchingItem = cartItem;
//             }
//         });
//         if(matchingItem) {
//             matchingItem.quantity += 1;
//         }else {
//             this.cartItems.push({
//                 productId: productId,
//                 quantity: 1,
//                 deliveryOptionId: '1'
//             });
//         }

//         this.saveToStorage();/* this was used to access the  function inside the object*/
//     },
//     removeFromCart(productId) {
//         const newCart = [];
//         this.cartItems.forEach((cartItem) => {
//             if(cartItem.productId !== productId) {
//                 newCart.push(cartItem);
//             }
//         });
//         this.cartItems = newCart;

//         this.saveToStorage();
//     },
//     updateDeliveryOption(productId,deliveryOptionId){
//         let matchingItem ;
//         this.cartItems.forEach((cartItem) => {
//             if(productId === cartItem.productId){
//                 matchingItem = cartItem;
//             }
//         });
//         matchingItem.deliveryOptionId = deliveryOptionId;

//         this.saveToStorage();
//     }
// };

// export let cart;/* shorthand for export cart = undefined */

businessCart.loadFromStorage();
console.log(businessCart);








