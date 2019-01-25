(function() {
    console.assert(String.prototype.endsWith, '.endsWith() isn\'t supported by this browser.');
    console.assert(String.prototype.startsWith, '.startsWith() isn\'t supported by this browser.');
    fetch('http://api.open-notify.org/iss-now.json')
        .then(function(resp) { return resp.json() })
        .then(function(resp) { console.log(resp) })
})()