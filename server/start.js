// I can one line all the imports thanks to destructuring assignment (1).
const [http, fs, path, parser, mimeTypes] = [require('http'), require('fs'), require('path'), require('url'), require('./mimeTypes.js')] // ./mimeTypes is just an object. Go look real quick.
// Without this semi-colon, this would be run as `const [http, ...] =  [require('http') ...](async (port) => server(port))(9000);` which tries to call the whole thing as a function
;(async (port) => server(port))(9000) // A compacted self-calling function

/* 
    `server(port)` is called before it's defined, so the function is a declaration and not an expression (2)
*/

/**
 * Creates and maintains the server.
 * @param {Number} port
 */
async function server(port) {
    // http.createServer() is one of node's default features (3)
    http.createServer(async (request, response) => {
        const url = parser.parse(request.url)
        var filePath = './' + url.pathname;

        switch (url.pathname) {
            case '/':
                // Same with this. instead of a callback function, await makes it return the value.
                fs.readFile(`./index.html`, function(err, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                })
                break;
            default:

                // The default case is that the url should be pointing to a file that exists.
                fs.readFile(filePath, function(error, content) {
                    const extname = String(path.extname(filePath)).toLowerCase();
                    const contentType = mimeTypes[extname] || 'application/octet-stream';

                    if (error) {
                        if(error.code == 'ENOENT') {
                            switch(url.pathname) {
                                case '/test/features':
                                case '/features':
                                case '/test/components':
                                case '/components':
                                    fs.readFile(`./200.html`, function(err, content) {
                                        response.writeHead(200, { 'Content-Type': 'text/html' });
                                        response.end(content, 'utf-8');
                                    })

                                    break;
                                default:
                                    fs.readFile('./404.html', function(error, content) {
                                        response.writeHead(200, { 'Content-Type': contentType });
                                        response.end(content, 'utf-8');
                                    });
                            }
                        }
                        else {
                            response.writeHead(500);
                            response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                            response.end();
                        }
                    }
                    else {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    }
                });
                break;
        }

    }).listen(port, '127.0.0.1');
    console.log(`Server running at http://127.0.0.1:${port}/`);
}




/** References
 * (1) https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
 * (2) https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/
 * (3) https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
 * 
 */
