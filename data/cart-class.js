/* we can create a class by using 'class' */
/* class is genarlly a object generator */
class Cart { /* just for a reminder we need to use PascalCase for things that generate objects */
    cartItems;/* slightly different syntax for class objects */
    #localStorageKey;  // let localStorageKey;/* shorthand for localStorageKey = undefined */
    /* #localStorageKey is caleed private property used # before...that it can only be accessed inside the class or inside the curly beackets {} */

        /* constructor usage */
        /* after generating each object below will run everytime and thats how this constructor method works */
        /* everytime we generate the object it will run the code inside here...this was great place to keep and keep code cleaner */
        /* more details about constructor
           1) has to be named 'constructor' 
           2) Should not return anything*/
    constructor(localStorageKey) {
        /* here in class instead of making parameters, we use this to give the value of localStorageKey for two different carts */
        this.localStorageKey = localStorageKey; 
        this.#loadFromStorage();
    }

    #loadFromStorage() { /* to make the method private..use number sign or # sign so that it cant be accessed outside */
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
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
    } /* no need of ; for methods in class objects */

    saveToStorage() {
    
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));/* remember JSON only stores strings..so we need to convert in to strings by using stringify */
    } /* no need of ; for methods in class objects */

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
    } /* no need of ; for methods in class objects */

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;

        this.saveToStorage();
    } /* no need of ; for methods in class objects */

    updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem ;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }   /* no need of ; for methods in class objects */



}

/* to generate the new object using the class we use below syntax */
/* by the way each object we create from the class is called instance of the class */
const cart = new Cart('cart-oop'); /* basically instead of copy pasting all the time just like below...we use function to generate objects */
const businessCart = new Cart('cart-business');



cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);/* to check the object was instance of the class { true || false } will be output ....business cart was generated from this class */












