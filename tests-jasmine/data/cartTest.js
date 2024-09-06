import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCArt', () => {
    it('adds an existing product to the cart', () =>{

        spyOn(localStorage, 'setItem'); 

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'

            }]); /* localStorage only supports strings ..so we need to return in string so..we used JSON.stringify() method */
            
        });
        // console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);/* this method was used to check how many times it was called and it only works for mock version ..here we mocked / faked the localStorage */
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart',() => {
        spyOn(localStorage, 'setItem');


        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]); /* localStorage only supports strings ..so we need to return in string so..we used JSON.stringify() method */
            
        });
        // console.log(localStorage.getItem('cart'));
        loadFromStorage();
        // simply we are spying on localstorage and calling fake..simple languagge
        // we use that to mock which means to create the fake version of that cuz as we write the code that if cart was empty it will be add twp products automaticalyy so that we get cart length 2..so it will be difficult to test which is called Flacky test...
        // 1st parameter was object and 2nd one was method ..here we use localStorage.getItem() to fake it
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);/* this method was used to check how many times it was called and it only works for mock version ..here we mocked / faked the localStorage */
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});

