import Person from 'js/models/person';

test('fullName property returns both first and last', function() {
    var person = Person.create({firstName: 'toran', lastName: 'billups'});
    var result = person.get('fullName');
    equal(result, 'toran billups', "fullName was " + result);
});

test('fullName property updates when firstName is changed', function() {
    var person = Person.create({firstName: 'toran', lastName: 'billups'});
    var result = person.get('fullName');
    equal(result, 'toran billups', "fullName was " + result);
    person.set('firstName', 'wat');
    result = person.get('fullName');
    equal(result, 'wat billups', "fullName was " + result);
});

test('fullName property updates when lastName is changed', function() {
    var person = Person.create({firstName: 'toran', lastName: 'billups'});
    var result = person.get('fullName');
    equal(result, 'toran billups', "fullName was " + result);
    person.set('lastName', 'tbozz');
    result = person.get('fullName');
    equal(result, 'toran tbozz', "fullName was " + result);
});
