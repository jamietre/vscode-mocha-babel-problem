var Cache = require('./cache.js').default;
var cache = new Cache();
cache.set('foo', 'bar');
console.log(cache.get('foo'));
