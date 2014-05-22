import Person from 'js/models/person';

var App;

module('integration tests', {
    setup: function() {
        App = startApp();
        Person.people = [];
    },
    teardown: function() {
        $.mockjaxClear();
        Ember.run(App, 'destroy');
    }
});

test('empty ajax response will yield empty table', function() {
    stubEndpointForHttpRequest('/api/people', []);
    visit("/").then(function() {
        missing("table tr");
    });
});

test('ajax response with 2 people yields table with 2 rows', function() {
    var json = [{firstName: "x", lastName: "y"}, {firstName: "h", lastName: "z"}];
    stubEndpointForHttpRequest('/api/people', json);
    visit("/").then(function() {
        var rows = find("table tr").length;
        equal(rows, 2, rows);
    });
});

test('another empty ajax response will yield another empty table', function() {
    stubEndpointForHttpRequest('/api/people', []);
    visit("/").then(function() {
        missing("table tr");
    });
});

test('ajax response with 1 person yields table with 1 row', function() {
    var matt = {firstName: 'matt', lastName: 'morrison'};
    stubEndpointForHttpRequest('/api/people', [matt]);
    visit("/").then(function() {
        var rows = find("table tr").length;
        equal(rows, 1, rows);
    });
});

test('add will append another person to the html table', function() {
    expect(4);
    var matt = {firstName: 'matt', lastName: 'morrison'};
    stubEndpointForHttpRequest('/api/people', [matt]);
    visit("/").then(function() {
      var rows = find("table tr").length
      equal(rows, 1, "the table had " + rows + " rows");
      var fullName = find("table tr:eq(0) td:eq(0)").text();
      equal(fullName, "matt morrison", "the first table row had fullName: " + fullName);
      fillIn(".firstName", "dustin");
      fillIn(".lastName", "thostenson");
      return click(".submit");
    }).then(function() {
      equal(find("table tr").length, 2, "the table of people was not complete");
      equal(find("table tr:eq(1) td:eq(0)").text(), "dustin thostenson", "dustin was not added to the html table");
  });
});

test('delete will remove the person for a given row', function() {
    expect(5);
    var matt = {firstName: 'matt', lastName: 'morrison'};
    var toran = {firstName: 'toran', lastName: 'billups'};
    stubEndpointForHttpRequest('/api/people', [matt, toran]);
    visit("/").then(function() {
        var rows = find("table tr").length
        equal(rows, 2, "the table had " + rows + " rows");
        equal(find("table tr:eq(0) td:eq(0)").text(), "matt morrison", "the first row was incorrect");
        equal(find("table tr:eq(1) td:eq(0)").text(), "toran billups", "the first row was incorrect");
        return click("table .delete:first");
    }).then(function() {
        equal(find("table tr").length, 1, "the table of people was not complete");
        equal(find("table tr:eq(0) td:eq(0)").text(), "toran billups", "the wrong person was deleted");
    });
});
