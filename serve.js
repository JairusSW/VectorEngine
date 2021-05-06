var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

const localtunnel = require('localtunnel')

// Serve up public/ftp folder
var serve = serveStatic('./')

// Create server
var server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Listen
server.listen(3000)

localtunnel({ port: 3000, subdomain: 'pingpong123' }).then((tunnel) => {

  console.log('Listening on: ' + tunnel.url)

  server.on('close', () => {

    tunnel.close()

  })

})