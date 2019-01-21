# design-doc-concept

## What is this?

It's a Hybrid Design Document and Component Library.

* Self [transpiles](https://github.com/loraxx753/design-doc-concept/blob/master/package.json#L7) on `npm start`
* Serves babeled version/polyfills only to non-evergreen browsers
* Other than the above two (which are only referenced in pacakage.json), this boilerplate has no dependencies.
* Custom and fully reset CSS. 
* Hopefully🤞, easy to understand.


## What do I do?

1. First, clone the respository and change into the directory
  * `git clone https://github.com/loraxx753/design-doc-concept.git && cd design-doc-concept`
2. Install the dependencies used for transpiling and working on evergreen browsers :
  * `npm i `
  * _NOTE_: These dependencies are only used in package.json. With a few minutes of effort (and no transpiling or legacy support), this step is optional.
3. Run `npm start` and visit [127.0.0.1:8080/](127.0.0.1:8080/)
