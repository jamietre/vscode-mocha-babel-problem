import Cache from './cache.js'
const cache = new Cache();
cache.set('foo', 'bar');
console.log(cache.get('foo'));
