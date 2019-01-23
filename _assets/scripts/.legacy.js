"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict'; // This should be a dynamic import. "If a legacy browser, import the polyfills."
  // Might be wonky in the transpiler....
  // import './polyfills.js'

  /* Only the basics for now! */
  // window.iterations = (maxIterations) => { return Array(maxIterations).fill(0).map((n,i) => i) }

  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("Want to see under the hood? Start with /_assets/scripts/main.js.");
            console.log("Operators are standing by.");
            /* Only the basics for now! 
            const url = document.querySelector('input').value
            const jsonResponse = await fetch(url).then(r => r.json())
            document.querySelector('fetch-result').innerHTML = `<pre><code>${JSON.stringify(jsonResponse, null, 2)}</code></pre>`
            for(let idx of iterations(10)) {
                console.log(idx)
            }
            const [ a, b ] = iterations(2)
            console.log(a, b)
             document.querySelector('.dialog-button').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog').toggleAttribute('open') })
            */

            document.querySelector('#dialog-preview').addEventListener('click', function (e) {
              e.preventDefault();
              document.querySelector('dialog').toggleAttribute('open');
            });
            document.querySelector('#dialog-popup-preview').addEventListener('click', function (e) {
              e.preventDefault();
              document.querySelector('dialog[data-popup]').toggleAttribute('open');
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }))();
});
