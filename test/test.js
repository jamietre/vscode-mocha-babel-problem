import assert from 'assert';
import Cache from '../src/cache';

describe('cache', function () {
    it('set', function () {
        debugger;
        let cache = new Cache();
        cache.set('foo', 'bar');
        assert.equal(cache.get('foo'), 'bar');
    });
});