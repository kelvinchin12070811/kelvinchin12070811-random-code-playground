import { LRUCache } from './lru';

describe('LRU cache', () => {
    let cache: LRUCache;

    beforeEach(() => {
        cache = new LRUCache(5);
    });

    it('Should be able to create', () => {
        expect(cache.capacity).toBe(5);
        expect(cache.size).toBe(0);
    });

    it('Should be able to add elements', () => {
        cache.add('test', 'hello');
        expect(cache.get('test')).toBe('hello');
        expect(cache.size).not.toBe(0);
    });

    it('Should be able to remove elements', () => {
        cache.add('test', 'hello');
        expect(cache.get('test')).toBe('hello');
        expect(cache.size).not.toBe(0);

        cache.remove('test');
        expect(cache.size).toBe(0);
    });

    it('Should not more than 5 elements and delete oldest value', () => {
        cache.add('test', 'hello');
        cache.add('test 2', 'world');
        cache.add('javascript', 'typescript');
        cache.add('c++', 'not c');
        cache.add('ruby', 'not python');
        expect(cache.size).toBe(5);

        cache.add('thanos', 'destroy');
        expect(cache.size).not.toBeGreaterThan(5);
        expect(cache.get('thanos')).toBeTruthy();
        expect(cache.get('test')).toBeFalsy();
    });

    it('Size should not increase when key is same', () => {
        cache.add('test', 'hello');
        expect(cache.size).toBe(1);

        cache.add('test', 'world');
        expect(cache.size).toBe(1);
        expect(cache.get('test')).toBe('world');
    });

    it('Last used should be tracked', () => {
        cache.add('test', 'hello');
        expect(cache.lastUsed()).toBe('test');

        cache.add('ktm', 'ktmb');
        expect(cache.lastUsed()).toBe('ktm');

        expect(cache.get('test')).toBe('hello');
        expect(cache.lastUsed()).toBe('test');
    });
});
