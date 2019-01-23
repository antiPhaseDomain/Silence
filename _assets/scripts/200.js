(async () => {
    const resp = await fetch('http://api.open-notify.org/iss-now.json').then(resp => resp.json())
    console.log(resp)
})()