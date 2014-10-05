var PromiseMixin = Ember.Object.create({
    xhr: function(url, type, hash) {
        hash = hash || {};
        hash.url = url;
        hash.type = type;
        hash.dataType = "json";
        hash.contentType = "application/json";
        hash.cache = false;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            hash.success = function(json) {
                return Ember.run(null, resolve, json);
            };
            hash.error = function(json) {
                if (json && json.then) {
                    json.then = null;
                }
                return Ember.run(null, reject, json);
            };
            $.ajax(hash);
        });
    }
});
 
export default PromiseMixin;
