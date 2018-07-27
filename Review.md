# Review Questions

## What is Node.js?
    A: Node is a runtime environment used for executing JavaScript applications outside of the browser.

## What is Express?
    A: Express is similar to React, except we use express for the backend. It's simple and lightweight.

## Mention two parts of Express that you learned about this week.
    A: 
        Express is a web application framework that enables additional functionality, such as routing and middleware support, for the raw http server that Node provides.
        We can build web applications with Express! We can serve SPAs and static content.

## What is Middleware?
    A: Everything is middleware, haha. No, but, seriously, similar to React, middleware can act as our decision-maker for determining if request go through or if they get sent back. Middleware has the ability to stop and change requests, but that's ultimately up to how the functions are written. Essentially, middleware = functions for handling the request and response, passing the req & res onwards.

## What is a Resource?
    A: Everything is a resource. A resource is accessible via a unique URL. Resources can have multiple representations, and they are managed by HTTP methods.

## What can the API return to help clients know if a request was successful?
    A: The response as well as a unique message depending on the success of the promise.

## How can we partition our application into sub-applications?
    A: We can partition our application into sub-applications by defining different behaviors by routing.

## What is express.json() and why do we need it?
    A: express.json() is middleware. It parses JSON, for data, which is then passed onto the request.