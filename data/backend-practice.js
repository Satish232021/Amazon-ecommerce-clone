const xhr = new XMLHttpRequest();/* this creates a new HTTTP message to send to the backend ..message = request*/

xhr.addEventListener('load',() => { /* we use this to await until it gets the response (load) from the backend*/
    console.log(xhr.response); /* and then save the response in our code */
});

xhr.open('GET', 'https://supersimplebackend.dev');
/* 1st parameter was ..type of HTTP message 'GET = get some information from the backend'
   type of HTTP message requests are
       a)GET
       b)POST
       c)PUT
       d)DELETE 

2nd parameter was ,,where to send this HTTP mesage     */
xhr.send(); /* this is a asynchronous code..means it doesnot not wait for this to happen and it runs the next line of code */


