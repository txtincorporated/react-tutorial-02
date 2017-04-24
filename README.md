# ReactTutorial02
## Based on the [scotch.io](https://scotch.io/tutorials/build-a-real-time-twitter-stream-with-node-and-react-js) tutorials

*All code hand-transcribed from the tutorial or from [React Start Kit](https://facebook.github.io/react/downloads/react-15.0.1.zip) except for vendor and minified files; code may be altered or extended from the original*

## NOTES AND QUESTIONS
* **NOTE** the spec for this app:  it should...
  - ...listen to the Twitter streaming API and save new tweets as they come in
  - ..., on save, emit an event to client side to update views
  - ...render the page server side initially and then pass it off to the client
  - ...load tweets in blocks of 10 at a time using infity scroll pagination
  - ...display a notification bar on unread tweets prompting the user to view them

* **NOTE** app-specific dependencies:
  - Express: for talking to Node
  - Handlbars: for static templating in the DOM
  - Browserify: for loading dependencies directly in to the browser
  - Mongoose: for creating and working with MongoDB schemas
  - Socket.io: for handling real-time full-duplex messaging over HTTP
  - nTwitter: Node Twitter API library

* **NOTE** the advantage of using isomorphic code to support server side renedering:  allows us to dynamically update the DOM without degrading SEO

* **WHY** are we not using `src` and `build` folders?  Is it because we're building into the browser with Browserify instead of into a server-side directory?  Seems like you would still need an entry point for the build, but maybe this has to do with the specific workings of Browserify.
  - **A:** See `build` and `browserify` commands in `package.json`.

## TERMS AND CONCEPTS
* **isomorphic JavaScript:** JS written in such a way that a single code base can run on both client and server
* **server side rendering:** in React, the ability of the code to render a DOM on the server side, update and serve it on the fly to a "virtual DOM" in the client rather than sending the data to the client for rendering there as static HTML
