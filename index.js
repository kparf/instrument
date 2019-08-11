const StaticServer = require('static-server');


const server = new StaticServer({
  rootPath: 'src',
  port: 1337,
  name: 'mavo-server',
  cors: '*',
  followSymlink: true,
});

server.start(() => {
  console.log('Server listening to', server.port);
});