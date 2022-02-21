 1-we should not loop over server_echo variable because it's undefined,
 the fetch api is asynchronous, it return a promise that resolve a result,
 that resolved result will be pushed in the event queue and wait till all
 synchronous calls in the call stack finishes, then it will be pushed at 
 the call stack using the event loop, so that mean our loop will run first
 before getting any data from the fetch api and because of that the server_echo
 variable is still undefined.

 2-the response object have a method json() that parse the result and
 return it, it can be consumed only once. but in the code we call it twice
 so that will result an error, also there is no echo property in it, if we
 wanna assign the result to server_echo variable we should do that in the
 second .then() where we get the actual result.

 3-there is no reason to stringify json property in json object two times.

Solution:

var server_echo;
var json = {
    json: JSON.stringify({
        a: 1,
        b: 2
    }),
    delay: 3
};
fetch('/echo/', {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: 'json=' + encodeURIComponent(json.json) + '&delay=' + json.delay
})
.then(function (response) {
    return response.json();
})
.then(function (result) {
    server_echo = result.echo;

    server_echo.forEach(
        element => console.log(element)
    )

    alert(result);
})
.catch (function (error) {
    console.log('Request failed', error);
});