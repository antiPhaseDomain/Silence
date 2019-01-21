"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) : factory();
})(function () {
  'use strict';

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj);
  }

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }

    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name) || name === '') {
      throw new TypeError('Invalid character in header field name');
    }

    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }

    return value;
  } // Build a destructive iterator for the value list


  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return {
          done: value === undefined,
          value: value
        };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }

    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }

    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;

      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  } // HTTP methods whose capitalization should be normalized


  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }

      this.url = input.url;
      this.credentials = input.credentials;

      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }

      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;

      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';

    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }

    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }

    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, {
      body: this._bodyInit
    });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2

    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();

      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';

    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, {
      status: 0,
      statusText: ''
    });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };

  var DOMException = self.DOMException;

  try {
    new DOMException();
  } catch (err) {
    DOMException = function DOMException(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };

    DOMException.prototype = Object.create(Error.prototype);
    DOMException.prototype.constructor = DOMException;
  }

  function fetch(input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'));
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function () {
        reject(new DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function () {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  void function (root, factory) {
    if (typeof define === 'function' && define.amd) define(factory);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') module.exports = factory();else factory();
  }(undefined, function () {
    var DETAILS = 'details';
    var SUMMARY = 'summary';
    var supported = checkSupport();
    if (supported) return; // Add a classname

    document.documentElement.className += ' no-details';
    window.addEventListener('click', clickHandler);
    injectStyle('details-polyfill-style', 'html.no-details ' + DETAILS + ':not([open]) > :not(' + SUMMARY + ') { display: none; }\n' + 'html.no-details ' + DETAILS + ' > ' + SUMMARY + ":before { content: \"\u25B6\"; display: inline-block; font-size: .8em; width: 1.5em; }\n" + 'html.no-details ' + DETAILS + '[open] > ' + SUMMARY + ":before { content: \"\u25BC\"; }");
    /*
     * Click handler for `<summary>` tags
     */

    function clickHandler(e) {
      if (e.target.nodeName.toLowerCase() === 'summary') {
        var details = e.target.parentNode;
        if (!details) return;

        if (details.getAttribute('open')) {
          details.open = false;
          details.removeAttribute('open');
        } else {
          details.open = true;
          details.setAttribute('open', 'open');
        }
      }
    }
    /*
     * Checks for support for `<details>`
     */


    function checkSupport() {
      var el = document.createElement(DETAILS);
      if (!('open' in el)) return false;
      el.innerHTML = '<' + SUMMARY + '>a</' + SUMMARY + '>b';
      document.body.appendChild(el);
      var diff = el.offsetHeight;
      el.open = true;
      var result = diff != el.offsetHeight;
      document.body.removeChild(el);
      return result;
    }
    /*
     * Injects styles (idempotent)
     */


    function injectStyle(id, style) {
      if (document.getElementById(id)) return;
      var el = document.createElement('style');
      el.id = id;
      el.innerHTML = style;
      document.getElementsByTagName('head')[0].appendChild(el);
    }
  }); // eslint-disable-line semi

  (function () {
    // nb. This is for IE10 and lower _only_.
    var supportCustomEvent = window.CustomEvent;

    if (!supportCustomEvent || _typeof(supportCustomEvent) === 'object') {
      supportCustomEvent = function CustomEvent(event, x) {
        x = x || {};
        var ev = document.createEvent('CustomEvent');
        ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
        return ev;
      };

      supportCustomEvent.prototype = window.Event.prototype;
    }
    /**
     * @param {Element} el to check for stacking context
     * @return {boolean} whether this el or its parents creates a stacking context
     */


    function createsStackingContext(el) {
      while (el && el !== document.body) {
        var s = window.getComputedStyle(el);

        var invalid = function invalid(k, ok) {
          return !(s[k] === undefined || s[k] === ok);
        };

        if (s.opacity < 1 || invalid('zIndex', 'auto') || invalid('transform', 'none') || invalid('mixBlendMode', 'normal') || invalid('filter', 'none') || invalid('perspective', 'none') || s['isolation'] === 'isolate' || s.position === 'fixed' || s.webkitOverflowScrolling === 'touch') {
          return true;
        }

        el = el.parentElement;
      }

      return false;
    }
    /**
     * Finds the nearest <dialog> from the passed element.
     *
     * @param {Element} el to search from
     * @return {HTMLDialogElement} dialog found
     */


    function findNearestDialog(el) {
      while (el) {
        if (el.localName === 'dialog') {
          return (
            /** @type {HTMLDialogElement} */
            el
          );
        }

        el = el.parentElement;
      }

      return null;
    }
    /**
     * Blur the specified element, as long as it's not the HTML body element.
     * This works around an IE9/10 bug - blurring the body causes Windows to
     * blur the whole application.
     *
     * @param {Element} el to blur
     */


    function safeBlur(el) {
      if (el && el.blur && el !== document.body) {
        el.blur();
      }
    }
    /**
     * @param {!NodeList} nodeList to search
     * @param {Node} node to find
     * @return {boolean} whether node is inside nodeList
     */


    function inNodeList(nodeList, node) {
      for (var i = 0; i < nodeList.length; ++i) {
        if (nodeList[i] === node) {
          return true;
        }
      }

      return false;
    }
    /**
     * @param {HTMLFormElement} el to check
     * @return {boolean} whether this form has method="dialog"
     */


    function isFormMethodDialog(el) {
      if (!el || !el.hasAttribute('method')) {
        return false;
      }

      return el.getAttribute('method').toLowerCase() === 'dialog';
    }
    /**
     * @param {!HTMLDialogElement} dialog to upgrade
     * @constructor
     */


    function dialogPolyfillInfo(dialog) {
      this.dialog_ = dialog;
      this.replacedStyleTop_ = false;
      this.openAsModal_ = false; // Set a11y role. Browsers that support dialog implicitly know this already.

      if (!dialog.hasAttribute('role')) {
        dialog.setAttribute('role', 'dialog');
      }

      dialog.show = this.show.bind(this);
      dialog.showModal = this.showModal.bind(this);
      dialog.close = this.close.bind(this);

      if (!('returnValue' in dialog)) {
        dialog.returnValue = '';
      }

      if ('MutationObserver' in window) {
        var mo = new MutationObserver(this.maybeHideModal.bind(this));
        mo.observe(dialog, {
          attributes: true,
          attributeFilter: ['open']
        });
      } else {
        // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
        // seem to fire even if the element was removed as part of a parent removal. Use the removed
        // events to force downgrade (useful if removed/immediately added).
        var removed = false;

        var cb = function () {
          removed ? this.downgradeModal() : this.maybeHideModal();
          removed = false;
        }.bind(this);

        var timeout;

        var delayModel = function delayModel(ev) {
          if (ev.target !== dialog) {
            return;
          } // not for a child element


          var cand = 'DOMNodeRemoved';
          removed |= ev.type.substr(0, cand.length) === cand;
          window.clearTimeout(timeout);
          timeout = window.setTimeout(cb, 0);
        };

        ['DOMAttrModified', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'].forEach(function (name) {
          dialog.addEventListener(name, delayModel);
        });
      } // Note that the DOM is observed inside DialogManager while any dialog
      // is being displayed as a modal, to catch modal removal from the DOM.


      Object.defineProperty(dialog, 'open', {
        set: this.setOpen.bind(this),
        get: dialog.hasAttribute.bind(dialog, 'open')
      });
      this.backdrop_ = document.createElement('div');
      this.backdrop_.className = 'backdrop';
      this.backdrop_.addEventListener('click', this.backdropClick_.bind(this));
    }

    dialogPolyfillInfo.prototype = {
      get dialog() {
        return this.dialog_;
      },

      /**
       * Maybe remove this dialog from the modal top layer. This is called when
       * a modal dialog may no longer be tenable, e.g., when the dialog is no
       * longer open or is no longer part of the DOM.
       */
      maybeHideModal: function maybeHideModal() {
        if (this.dialog_.hasAttribute('open') && document.body.contains(this.dialog_)) {
          return;
        }

        this.downgradeModal();
      },

      /**
       * Remove this dialog from the modal top layer, leaving it as a non-modal.
       */
      downgradeModal: function downgradeModal() {
        if (!this.openAsModal_) {
          return;
        }

        this.openAsModal_ = false;
        this.dialog_.style.zIndex = ''; // This won't match the native <dialog> exactly because if the user set top on a centered
        // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
        // possible to polyfill this perfectly.

        if (this.replacedStyleTop_) {
          this.dialog_.style.top = '';
          this.replacedStyleTop_ = false;
        } // Clear the backdrop and remove from the manager.


        this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
        dialogPolyfill.dm.removeDialog(this);
      },

      /**
       * @param {boolean} value whether to open or close this dialog
       */
      setOpen: function setOpen(value) {
        if (value) {
          this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
        } else {
          this.dialog_.removeAttribute('open');
          this.maybeHideModal(); // nb. redundant with MutationObserver
        }
      },

      /**
       * Handles clicks on the fake .backdrop element, redirecting them as if
       * they were on the dialog itself.
       *
       * @param {!Event} e to redirect
       */
      backdropClick_: function backdropClick_(e) {
        if (!this.dialog_.hasAttribute('tabindex')) {
          // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
          // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
          // would not be needed - clicks would move the implicit cursor there.
          var fake = document.createElement('div');
          this.dialog_.insertBefore(fake, this.dialog_.firstChild);
          fake.tabIndex = -1;
          fake.focus();
          this.dialog_.removeChild(fake);
        } else {
          this.dialog_.focus();
        }

        var redirectedEvent = document.createEvent('MouseEvents');
        redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
        this.dialog_.dispatchEvent(redirectedEvent);
        e.stopPropagation();
      },

      /**
       * Focuses on the first focusable element within the dialog. This will always blur the current
       * focus, even if nothing within the dialog is found.
       */
      focus_: function focus_() {
        // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
        var target = this.dialog_.querySelector('[autofocus]:not([disabled])');

        if (!target && this.dialog_.tabIndex >= 0) {
          target = this.dialog_;
        }

        if (!target) {
          // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
          // alternative involves stepping through and trying to focus everything.
          var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
          var query = opts.map(function (el) {
            return el + ':not([disabled])';
          }); // TODO(samthor): tabindex values that are not numeric are not focusable.

          query.push('[tabindex]:not([disabled]):not([tabindex=""])'); // tabindex != "", not disabled

          target = this.dialog_.querySelector(query.join(', '));
        }

        safeBlur(document.activeElement);
        target && target.focus();
      },

      /**
       * Sets the zIndex for the backdrop and dialog.
       *
       * @param {number} dialogZ
       * @param {number} backdropZ
       */
      updateZIndex: function updateZIndex(dialogZ, backdropZ) {
        if (dialogZ < backdropZ) {
          throw new Error('dialogZ should never be < backdropZ');
        }

        this.dialog_.style.zIndex = dialogZ;
        this.backdrop_.style.zIndex = backdropZ;
      },

      /**
       * Shows the dialog. If the dialog is already open, this does nothing.
       */
      show: function show() {
        if (!this.dialog_.open) {
          this.setOpen(true);
          this.focus_();
        }
      },

      /**
       * Show this dialog modally.
       */
      showModal: function showModal() {
        if (this.dialog_.hasAttribute('open')) {
          throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
        }

        if (!document.body.contains(this.dialog_)) {
          throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
        }

        if (!dialogPolyfill.dm.pushDialog(this)) {
          throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
        }

        if (createsStackingContext(this.dialog_.parentElement)) {
          console.warn('A dialog is being shown inside a stacking context. ' + 'This may cause it to be unusable. For more information, see this link: ' + 'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context');
        }

        this.setOpen(true);
        this.openAsModal_ = true; // Optionally center vertically, relative to the current viewport.

        if (dialogPolyfill.needsCentering(this.dialog_)) {
          dialogPolyfill.reposition(this.dialog_);
          this.replacedStyleTop_ = true;
        } else {
          this.replacedStyleTop_ = false;
        } // Insert backdrop.


        this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling); // Focus on whatever inside the dialog.

        this.focus_();
      },

      /**
       * Closes this HTMLDialogElement. This is optional vs clearing the open
       * attribute, however this fires a 'close' event.
       *
       * @param {string=} opt_returnValue to use as the returnValue
       */
      close: function close(opt_returnValue) {
        if (!this.dialog_.hasAttribute('open')) {
          throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
        }

        this.setOpen(false); // Leave returnValue untouched in case it was set directly on the element

        if (opt_returnValue !== undefined) {
          this.dialog_.returnValue = opt_returnValue;
        } // Triggering "close" event for any attached listeners on the <dialog>.


        var closeEvent = new supportCustomEvent('close', {
          bubbles: false,
          cancelable: false
        });
        this.dialog_.dispatchEvent(closeEvent);
      }
    };
    var dialogPolyfill = {};

    dialogPolyfill.reposition = function (element) {
      var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
      element.style.top = Math.max(scrollTop, topValue) + 'px';
    };

    dialogPolyfill.isInlinePositionSetByStylesheet = function (element) {
      for (var i = 0; i < document.styleSheets.length; ++i) {
        var styleSheet = document.styleSheets[i];
        var cssRules = null; // Some browsers throw on cssRules.

        try {
          cssRules = styleSheet.cssRules;
        } catch (e) {}

        if (!cssRules) {
          continue;
        }

        for (var j = 0; j < cssRules.length; ++j) {
          var rule = cssRules[j];
          var selectedNodes = null; // Ignore errors on invalid selector texts.

          try {
            selectedNodes = document.querySelectorAll(rule.selectorText);
          } catch (e) {}

          if (!selectedNodes || !inNodeList(selectedNodes, element)) {
            continue;
          }

          var cssTop = rule.style.getPropertyValue('top');
          var cssBottom = rule.style.getPropertyValue('bottom');

          if (cssTop && cssTop !== 'auto' || cssBottom && cssBottom !== 'auto') {
            return true;
          }
        }
      }

      return false;
    };

    dialogPolyfill.needsCentering = function (dialog) {
      var computedStyle = window.getComputedStyle(dialog);

      if (computedStyle.position !== 'absolute') {
        return false;
      } // We must determine whether the top/bottom specified value is non-auto.  In
      // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
      // Firefox returns the used value. So we do this crazy thing instead: check
      // the inline style and then go through CSS rules.


      if (dialog.style.top !== 'auto' && dialog.style.top !== '' || dialog.style.bottom !== 'auto' && dialog.style.bottom !== '') {
        return false;
      }

      return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
    };
    /**
     * @param {!Element} element to force upgrade
     */


    dialogPolyfill.forceRegisterDialog = function (element) {
      if (window.HTMLDialogElement || element.showModal) {
        console.warn('This browser already supports <dialog>, the polyfill ' + 'may not work correctly', element);
      }

      if (element.localName !== 'dialog') {
        throw new Error('Failed to register dialog: The element is not a dialog.');
      }

      new dialogPolyfillInfo(
      /** @type {!HTMLDialogElement} */
      element);
    };
    /**
     * @param {!Element} element to upgrade, if necessary
     */


    dialogPolyfill.registerDialog = function (element) {
      if (!element.showModal) {
        dialogPolyfill.forceRegisterDialog(element);
      }
    };
    /**
     * @constructor
     */


    dialogPolyfill.DialogManager = function () {
      /** @type {!Array<!dialogPolyfillInfo>} */
      this.pendingDialogStack = [];
      var checkDOM = this.checkDOM_.bind(this); // The overlay is used to simulate how a modal dialog blocks the document.
      // The blocking dialog is positioned on top of the overlay, and the rest of
      // the dialogs on the pending dialog stack are positioned below it. In the
      // actual implementation, the modal dialog stacking is controlled by the
      // top layer, where z-index has no effect.

      this.overlay = document.createElement('div');
      this.overlay.className = '_dialog_overlay';
      this.overlay.addEventListener('click', function (e) {
        this.forwardTab_ = undefined;
        e.stopPropagation();
        checkDOM([]); // sanity-check DOM
      }.bind(this));
      this.handleKey_ = this.handleKey_.bind(this);
      this.handleFocus_ = this.handleFocus_.bind(this);
      this.zIndexLow_ = 100000;
      this.zIndexHigh_ = 100000 + 150;
      this.forwardTab_ = undefined;

      if ('MutationObserver' in window) {
        this.mo_ = new MutationObserver(function (records) {
          var removed = [];
          records.forEach(function (rec) {
            for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
              if (!(c instanceof Element)) {
                continue;
              } else if (c.localName === 'dialog') {
                removed.push(c);
              }

              removed = removed.concat(c.querySelectorAll('dialog'));
            }
          });
          removed.length && checkDOM(removed);
        });
      }
    };
    /**
     * Called on the first modal dialog being shown. Adds the overlay and related
     * handlers.
     */


    dialogPolyfill.DialogManager.prototype.blockDocument = function () {
      document.documentElement.addEventListener('focus', this.handleFocus_, true);
      document.addEventListener('keydown', this.handleKey_);
      this.mo_ && this.mo_.observe(document, {
        childList: true,
        subtree: true
      });
    };
    /**
     * Called on the first modal dialog being removed, i.e., when no more modal
     * dialogs are visible.
     */


    dialogPolyfill.DialogManager.prototype.unblockDocument = function () {
      document.documentElement.removeEventListener('focus', this.handleFocus_, true);
      document.removeEventListener('keydown', this.handleKey_);
      this.mo_ && this.mo_.disconnect();
    };
    /**
     * Updates the stacking of all known dialogs.
     */


    dialogPolyfill.DialogManager.prototype.updateStacking = function () {
      var zIndex = this.zIndexHigh_;

      for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
        dpi.updateZIndex(--zIndex, --zIndex);

        if (i === 0) {
          this.overlay.style.zIndex = --zIndex;
        }
      } // Make the overlay a sibling of the dialog itself.


      var last = this.pendingDialogStack[0];

      if (last) {
        var p = last.dialog.parentNode || document.body;
        p.appendChild(this.overlay);
      } else if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
    };
    /**
     * @param {Element} candidate to check if contained or is the top-most modal dialog
     * @return {boolean} whether candidate is contained in top dialog
     */


    dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function (candidate) {
      while (candidate = findNearestDialog(candidate)) {
        for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
          if (dpi.dialog === candidate) {
            return i === 0; // only valid if top-most
          }
        }

        candidate = candidate.parentElement;
      }

      return false;
    };

    dialogPolyfill.DialogManager.prototype.handleFocus_ = function (event) {
      if (this.containedByTopDialog_(event.target)) {
        return;
      }

      if (document.activeElement === document.documentElement) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      safeBlur(
      /** @type {Element} */
      event.target);

      if (this.forwardTab_ === undefined) {
        return;
      } // move focus only from a tab key


      var dpi = this.pendingDialogStack[0];
      var dialog = dpi.dialog;
      var position = dialog.compareDocumentPosition(event.target);

      if (position & Node.DOCUMENT_POSITION_PRECEDING) {
        if (this.forwardTab_) {
          // forward
          dpi.focus_();
        } else if (event.target !== document.documentElement) {
          // backwards if we're not already focused on <html>
          document.documentElement.focus();
        }
      }

      return false;
    };

    dialogPolyfill.DialogManager.prototype.handleKey_ = function (event) {
      this.forwardTab_ = undefined;

      if (event.keyCode === 27) {
        event.preventDefault();
        event.stopPropagation();
        var cancelEvent = new supportCustomEvent('cancel', {
          bubbles: false,
          cancelable: true
        });
        var dpi = this.pendingDialogStack[0];

        if (dpi && dpi.dialog.dispatchEvent(cancelEvent)) {
          dpi.dialog.close();
        }
      } else if (event.keyCode === 9) {
        this.forwardTab_ = !event.shiftKey;
      }
    };
    /**
     * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
     * removed and immediately readded don't stay modal, they become normal.
     *
     * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
     */


    dialogPolyfill.DialogManager.prototype.checkDOM_ = function (removed) {
      // This operates on a clone because it may cause it to change. Each change also calls
      // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
      // at a time?!
      var clone = this.pendingDialogStack.slice();
      clone.forEach(function (dpi) {
        if (removed.indexOf(dpi.dialog) !== -1) {
          dpi.downgradeModal();
        } else {
          dpi.maybeHideModal();
        }
      });
    };
    /**
     * @param {!dialogPolyfillInfo} dpi
     * @return {boolean} whether the dialog was allowed
     */


    dialogPolyfill.DialogManager.prototype.pushDialog = function (dpi) {
      var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;

      if (this.pendingDialogStack.length >= allowed) {
        return false;
      }

      if (this.pendingDialogStack.unshift(dpi) === 1) {
        this.blockDocument();
      }

      this.updateStacking();
      return true;
    };
    /**
     * @param {!dialogPolyfillInfo} dpi
     */


    dialogPolyfill.DialogManager.prototype.removeDialog = function (dpi) {
      var index = this.pendingDialogStack.indexOf(dpi);

      if (index === -1) {
        return;
      }

      this.pendingDialogStack.splice(index, 1);

      if (this.pendingDialogStack.length === 0) {
        this.unblockDocument();
      }

      this.updateStacking();
    };

    dialogPolyfill.dm = new dialogPolyfill.DialogManager();
    dialogPolyfill.formSubmitter = null;
    dialogPolyfill.useValue = null;
    /**
     * Installs global handlers, such as click listers and native method overrides. These are needed
     * even if a no dialog is registered, as they deal with <form method="dialog">.
     */

    if (window.HTMLDialogElement === undefined) {
      /**
       * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
       * one that returns the correct value.
       */
      var testForm = document.createElement('form');
      testForm.setAttribute('method', 'dialog');

      if (testForm.method !== 'dialog') {
        var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'method');

        if (methodDescriptor) {
          // nb. Some older iOS and older PhantomJS fail to return the descriptor. Don't do anything
          // and don't bother to update the element.
          var realGet = methodDescriptor.get;

          methodDescriptor.get = function () {
            if (isFormMethodDialog(this)) {
              return 'dialog';
            }

            return realGet.call(this);
          };

          var realSet = methodDescriptor.set;

          methodDescriptor.set = function (v) {
            if (typeof v === 'string' && v.toLowerCase() === 'dialog') {
              return this.setAttribute('method', v);
            }

            return realSet.call(this, v);
          };

          Object.defineProperty(HTMLFormElement.prototype, 'method', methodDescriptor);
        }
      }
      /**
       * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
       * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
       * document.activeElement.
       */


      document.addEventListener('click', function (ev) {
        dialogPolyfill.formSubmitter = null;
        dialogPolyfill.useValue = null;

        if (ev.defaultPrevented) {
          return;
        } // e.g. a submit which prevents default submission


        var target =
        /** @type {Element} */
        ev.target;

        if (!target || !isFormMethodDialog(target.form)) {
          return;
        }

        var valid = target.type === 'submit' && ['button', 'input'].indexOf(target.localName) > -1;

        if (!valid) {
          if (!(target.localName === 'input' && target.type === 'image')) {
            return;
          } // this is a <input type="image">, which can submit forms


          dialogPolyfill.useValue = ev.offsetX + ',' + ev.offsetY;
        }

        var dialog = findNearestDialog(target);

        if (!dialog) {
          return;
        }

        dialogPolyfill.formSubmitter = target;
      }, false);
      /**
       * Replace the native HTMLFormElement.submit() method, as it won't fire the
       * submit event and give us a chance to respond.
       */

      var nativeFormSubmit = HTMLFormElement.prototype.submit;

      var replacementFormSubmit = function replacementFormSubmit() {
        if (!isFormMethodDialog(this)) {
          return nativeFormSubmit.call(this);
        }

        var dialog = findNearestDialog(this);
        dialog && dialog.close();
      };

      HTMLFormElement.prototype.submit = replacementFormSubmit;
      /**
       * Global form 'dialog' method handler. Closes a dialog correctly on submit
       * and possibly sets its return value.
       */

      document.addEventListener('submit', function (ev) {
        var form =
        /** @type {HTMLFormElement} */
        ev.target;

        if (!isFormMethodDialog(form)) {
          return;
        }

        ev.preventDefault();
        var dialog = findNearestDialog(form);

        if (!dialog) {
          return;
        } // Forms can only be submitted via .submit() or a click (?), but anyway: sanity-check that
        // the submitter is correct before using its value as .returnValue.


        var s = dialogPolyfill.formSubmitter;

        if (s && s.form === form) {
          dialog.close(dialogPolyfill.useValue || s.value);
        } else {
          dialog.close();
        }

        dialogPolyfill.formSubmitter = null;
      }, true);
    }

    dialogPolyfill['forceRegisterDialog'] = dialogPolyfill.forceRegisterDialog;
    dialogPolyfill['registerDialog'] = dialogPolyfill.registerDialog;

    if (typeof define === 'function' && 'amd' in define) {
      // AMD support
      define(function () {
        return dialogPolyfill;
      });
    } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && _typeof(module['exports']) === 'object') {
      // CommonJS support
      module['exports'] = dialogPolyfill;
    } else {
      // all others
      window['dialogPolyfill'] = dialogPolyfill;
    }
  })();

  (function () {
    if (!Element.prototype.toggleAttribute) {
      Element.prototype.toggleAttribute = function (name, force) {
        if (force !== void 0) force = !!force;

        if (this.getAttribute(name) !== null) {
          if (force) return true;
          this.removeAttribute(name);
          return false;
        } else {
          if (force === false) return false;
          this.setAttribute(name, "");
          return true;
        }
      };
    }
  })();

  window.iterations = function (maxIterations) {
    return Array(maxIterations).fill(0).map(function (n, i) {
      return i;
    });
  };

  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _iterations, _iterations2, a, b;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const url = document.querySelector('input').value
            // const jsonResponse = await fetch(url).then(r => r.json())
            // document.querySelector('fetch-result').innerHTML = `<pre><code>${JSON.stringify(jsonResponse, null, 2)}</code></pre>`
            // for(let idx of iterations(10)) {
            //     console.log(idx)
            // }
            _iterations = iterations(2), _iterations2 = _slicedToArray(_iterations, 2), a = _iterations2[0], b = _iterations2[1];
            console.log(a, b); // document.querySelector('.dialog-button').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog').toggleAttribute('open') })

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }))();
});
