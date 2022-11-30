export class LRUCache {
    private _capacity: number;
    private cache: Map<string, string>;
    private _size: number;

    constructor(capacity: number) {
        this._capacity = capacity;
        this.cache = new Map();
        this._size = 0;
    }

    get(key: string): string {
        if (this.cache.has(key)) {
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value as string);
            return value as string;
        }
        return '';
    }

    add(key: string, value: string): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size === this._capacity) {
            this.cache.delete(this.cache.keys().next().value);
        } else {
            this._size++;
        }

        this.cache.set(key, value);
    }

    remove(key: string): void {
        this.cache.delete(key);
        this._size--;
    }

    lastUsed(): string {
        const key = [...this.cache.keys()].pop();
        return key ?? '';
    }

    get capacity() {
        return this._capacity;
    }

    get size(): number {
        return this._size;
    }
}
