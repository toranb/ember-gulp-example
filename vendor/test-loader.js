document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

startApp = require('js/tests/helpers/start-app')['default'];

function missing(selector) {
    var error = "element " + selector + " found (should be missing)";
    var element = find(selector).length;
    equal(element, 0, error);
}

function stubEndpointForHttpRequest(url, json, verb, status) {
    $.mockjax({
        type: verb || "GET",
        url: url,
        status: status || 200,
        dataType: 'json',
        responseText: json
    });
}

$.mockjaxSettings.logging = false;
$.mockjaxSettings.responseTime = 0;

Ember.keys(requirejs._eak_seen).filter(function(key) {
  return (/tests/).test(key);
}).forEach(function(moduleName) {
  require(moduleName, null, null, true);
});
