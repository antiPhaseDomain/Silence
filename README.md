# Hybrid Design Doc

## What is this?

It's a cross between a Design Document and Component Library.

* Self [transpiles](https://github.com/loraxx753/design-doc-concept/blob/master/package.json#L7) on `npm start`
* Serves babeled version/polyfills only to non-evergreen browsers
* Other than the above two (which are only referenced in pacakage.json), this boilerplate has no dependencies.
* Custom and fully reset CSS (see the button at the bottom of the example). 
* Hopefully🤞, easy to understand.
* _**STILL A WORK IN PROGRESS**_


## What do I do?

## Live Version

[See this code running live](http://hybrid-design-doc.surge.sh/).

### Use This As A Boilerplate

1. Clone the respository and change into the directory
  * `git clone https://github.com/loraxx753/design-doc-concept.git && cd design-doc-concept`
2. Install the dependencies used for transpiling and working on legacy browsers :
  * `npm i `
  * _NOTE_: These dependencies are only used in package.json. With a few minutes of effort (and no transpiling or legacy support), this step is optional.
3. Run `npm start` and visit [127.0.0.1:8080/](http://127.0.0.1:8080/)
