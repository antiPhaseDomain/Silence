(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    // import './polyfills.js'

    window.iterations = (maxIterations) => { return Array(maxIterations).fill(0).map((n,i) => i) };

}));
