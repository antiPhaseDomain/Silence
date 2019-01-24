import objectOptions from './data/CharacterSets.js'

;(function() {
    const library = {
        ...objectOptions
    }
    for(let name in library) {
        window[name] = library[name]
    }
})()