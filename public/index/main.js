(async () => {
    document.querySelector('#dialog-preview').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog').toggleAttribute('open') })
    document.querySelector('#dialog-popup-preview').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog[data-popup]').showModal() })
    document.querySelector('dialog[data-popup]').addEventListener('click', (e) => { e.preventDefault(); document.querySelector('dialog[data-popup]').close() })
})()