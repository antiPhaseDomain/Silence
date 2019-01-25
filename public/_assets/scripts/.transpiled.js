(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    (async () => {
        document.querySelector('#dialog-preview').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog').toggleAttribute('open'); });
        document.querySelector('#dialog-popup-preview').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog[data-popup]').showModal(); });
        document.querySelector('dialog[data-popup]').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog[data-popup]').close(); });
        window.setTimeout(fontReplace, 200);
    })();

    function fontReplace() {
        document.querySelector('#fonts + section h5').innerHTML = getComputedStyle(document.querySelector('#fonts + section h5')).fontFamily.split(',').shift().replace(/\"/g, ``);
        document.querySelector('#fonts + section p').innerHTML = getComputedStyle(document.querySelector('#fonts + section p')).fontFamily.split(',').shift().replace(/\"/g, ``);
    }

    // This should be a dynamic import. "If a legacy browser, import the polyfills."

    /* Only the basics for now! */
    // window.iterations = (maxIterations) => { return Array(maxIterations).fill(0).map((n,i) => i) }

    window.updateTheme = function updateTheme(themeName ='example') {
        const link = document.createElement('link');
        link.href = `/_assets/styles/themes/${themeName}.css`;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.media = 'screen';
        document.querySelector('head').appendChild(link);
        fontReplace();
    };


    (async () => {
        console.log("Want to see under the hood? Start with /_assets/scripts/main.js.");
        console.log(`Operators are standing by.`);
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

    //    window.updnpateTheme('indeed')
    })();

}));
