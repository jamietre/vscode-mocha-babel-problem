"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MAX_AGE = 360000; // 10 minutes

var Cache = function () {
    function Cache(maxAge) {
        (0, _classCallCheck3.default)(this, Cache);

        this.maxAge = maxAge || DEFAULT_MAX_AGE;
        this.cache = {};
        this.keyXref = {};

        this.cacheAge = [];
        this.nextId = 0;
    }

    (0, _createClass3.default)(Cache, [{
        key: "flush",
        value: function flush() {
            var cacheAge = this.cacheAge;
            var curTime = new Date().getTime();

            while (cacheAge.length) {
                var top = cacheAge[0];
                if (curTime - top.timestamp > this.maxAge) {
                    cacheAge.shift();
                    delete this.cache[top.id];
                    delete this.keyXref[top.id];
                } else {
                    break;
                }
            }
        }
    }, {
        key: "set",
        value: function set(key, value) {
            debugger;
            // untested, not needed really
            //flush();
            var timestamp = new Date().getTime();
            var id = this.nextId++;
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
    }, {
        key: "getById",
        value: function getById(id) {
            var entry = this.cache[id];
            if (!entry) {
                return undefined;
            }
            return entry.value;
        }
    }, {
        key: "get",
        value: function get(key) {
            var id = this.getId(key);
            return this.getById(id);
        }
    }, {
        key: "getId",
        value: function getId(key) {
            return this.keyXref[key];
        }
    }]);
    return Cache;
}();

exports.default = Cache;
//# sourceMappingURL=cache.js.map
