# Hybrid Design

## What is this?

An interactive [design language](https://link.medium.com/rJ3wBmDFIT) editor. Includes [vanilla javascript components](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), a [component library](https://www.webcomponents.org/libraries) and sandbox.

* ES6/7
* async/await
* Self [transpiles](https://github.com/loraxx753/design-doc-concept/blob/master/package.json#L7) on `npm start`
* Serves babel & polyfills to [legacy browsers](https://stackoverflow.com/questions/45943494/what-s-the-purpose-of-the-html-nomodule-attribute-for-script-elements-if-the-d).
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
