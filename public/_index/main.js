(async () => {
    document.querySelector('#dialog-preview').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog').toggleAttribute('open') })
    document.querySelector('#dialog-popup-preview').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog[data-popup]').showModal() })
    document.querySelector('dialog[data-popup]').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog[data-popup]').close() })
    window.setTimeout(fontReplace, 200)
})()

export function fontReplace() {
    document.querySelector('#fonts + section h5').innerHTML = getComputedStyle(document.querySelector('#fonts + section h5')).fontFamily.split(',').shift().replace(/\"/g, ``)
    document.querySelector('#fonts + section p').innerHTML = getComputedStyle(document.querySelector('#fonts + section p')).fontFamily.split(',').shift().replace(/\"/g, ``)
}