document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

startApp = require('js/helpers/start-app')['default'];

function missing(selector) {
    var error = "element " + selector + " found (should be missing)";
    var element = find(selector).length;
    equal(element, 0, error);
}

function stubEndpointForHttpRequest(url, json, verb, status, data) {
    $.fauxjax.new({
        type: verb || "GET",
        url: url,
        status: status || 200,
        dataType: 'json',
        contentType: 'application/json',
        responseText: json,
        data: data || undefined,
        cache: false,
    });
}

$.fauxjax.settings.responseTime = 0;

require('js/helpers/start-app');
require('js/integration/integration_tests');
require('js/unit/unit_tests');
