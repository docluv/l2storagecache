;

(function (window, undefined) {

    var l2Storeagecache = function (customSettings) {

        var that = new l2Storeagecache.fn.init(customSettings);

        if (customSettings) {

            if (customSettings.storageType !== "sessionStorage") {

                that.storageType = "localStorage";
                that.storage = localStorage;

            } else {

                that.storageType = customSettings.storageType || that.storageType;
                that.storage = customSettings.storage || that.storage;
                that.ttlKey = customSettings.storage || that.ttlKey;

            }

        }

        return that;
    };

    l2Storeagecache.fn = l2Storeagecache.prototype = {

        constructor: l2Storeagecache,

        init: function () {


            return this;
        },

        version: "0.0.1",

        setItem: function (key, value, ttl) {

            var cache = this;

            if (!key) {
                throw new {
                    Message: "Item must have a key"
                }
            }

            if (!value) {
                throw new {
                    Message: "Item must have a value"
                }
            }

            if (typeof value === "Object") {
                value = JSON.stringify(value);
            }

            cache.storage.setItem(key, value);

            if (ttl) {

                cache.storage.setItem(cache.ttlKey + key, +new Date() + ttl);

            }

        },

        getItem: function (key) {

            var cache = this,
                ttl = cache.storage.getItem(cache.ttlKey + key);

            if (!window.online || (ttl !== null && !cache.hasItemExpired(key, ttl))) {

                return cache.storage.getItem(key);

            }

            return null;

        },

        hasItemExpired: function (key, ttl) {

            var cache = this;

            // if there's a TTL that's expired, flush this item
            if (!ttl || ttl < +new Date()) {
                cache.storage.removeItem(key);
                cache.storage.removeItem(cache.ttlKey + key);
                return true;
            }

            return false;

        },

        getObject: function (key) {

            return JSON.parse(this.getItem(key));

        },

        removeItem: function (key) {

            this.storage.removeItem(key);
            this.storage.removeItem(this.ttlKey + key);

        },

        clear: function () {

            this.storage.clear();

        },

        getTTLConstant: function (ttlType) {

            switch (ttlType) {

                case "week":

                    return 604800000;

                    break;

                case "day":

                    return 86400000;

                    break;


                case "hour":

                    return 3600000;

                    break;

                case "minute":

                    //1 minute
                    return 3600;

                    break;
            }

            return 0;

        },

        storage: localStorage,
        storageType: "localStorage",
        ttlKey: "l2S-Cache-"

    };

    l2Storeagecache.fn.init.prototype = l2Storeagecache.fn;

    return (window.l2Storeagecache = l2Storeagecache);

})(window);

