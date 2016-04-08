const DEFAULT_MAX_AGE = 360000; // 10 minutes


class Cache {
    constructor (maxAge) {
        this.maxAge = maxAge || DEFAULT_MAX_AGE;
        this.cache = {};
        this.keyXref = {};

        this.cacheAge = [];
        this.nextId = 0;
    }


    flush () {
        const cacheAge = this.cacheAge;
        const curTime = new Date().getTime();

        while (cacheAge.length) {
            const top = cacheAge[0];
            if (curTime - top.timestamp > this.maxAge) {
                cacheAge.shift();
                delete this.cache[top.id];
                delete this.keyXref[top.id];
            } else {
                break;
            }
        }
    }

    set (key, value) {
        debugger;
        // untested, not needed really
        //flush();
        const timestamp = new Date().getTime();
        const id = this.nextId++;
        this.keyXref[key] = id;

        this.cache[id] = {
            timestamp: timestamp,
            value: value,
            key: key
        };

        this.cacheAge.push({
            timestamp: timestamp,
            id: id
        });

        return id;
    }

    getById (id) {
        const entry = this.cache[id];
        if (!entry) {
            return undefined;
        }
        return entry.value;
    }

    get (key) {
        const id = this.getId(key);
        return this.getById(id);
    }

    getId (key) {
        return this.keyXref[key];
    }
}

export default Cache;

