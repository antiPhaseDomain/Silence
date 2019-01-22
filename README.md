# Hybrid Design

## What is this?

It's a cross between a Design Document and Component Library.

* Self [transpiles](https://github.com/loraxx753/design-doc-concept/blob/master/package.json#L7) on `npm start`
* Serves babeled version/polyfills only to legacy browsers.
* Dependencies are only referenced in the [package.json](https://github.com/loraxx753/hybrid-design-doc/blob/master/package.json#L7-L12) (removeable).
* [Custom](https://github.com/loraxx753/hybrid-design-doc/blob/master/_assets/styles/lib/base.css), [fully reset](https://github.com/loraxx753/hybrid-design-doc/blob/master/_assets/styles/lib/reset.css), cross-browser CSS (see the button at the bottom of the example). 
* Hopefully🤞, easy to understand.
* _**STILL A WORK IN PROGRESS**_


## What do I do?

## Live Version

[See this code running live](http://hybrid-design-doc.surge.sh/).

### Use This As A Boilerplate

1. Clone the respository and change into the directory
  * `git clone https://github.com/loraxx753/hybrid-design-doc.git && cd hybrid-design-doc`
2. Install the dependencies used for transpiling and working on legacy browsers :
  * `npm i `
  * _NOTE_: These dependencies are only used in [package.json](https://github.com/loraxx753/hybrid-design-doc/blob/master/package.json). With a few minutes of effort (and no transpiling or legacy support), this step is optional.
3. Run `npm start` and visit [127.0.0.1:8080/](http://127.0.0.1:8080/)
