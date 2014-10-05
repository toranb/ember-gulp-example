import PromiseMixin from 'js/mixins/promise';

var Person = Ember.Object.extend({
    firstName: '',
    lastName: '',
    fullName: function() {
        var firstName = this.get('firstName');
        var lastName = this.get('lastName');
        return firstName + ' ' + lastName;
    }.property('firstName', 'lastName')
});

Person.reopenClass(PromiseMixin, {
    people: [],
    add: function(hash) {
        var self = this;
        var person = Person.create(hash);
        var hash = {data: JSON.stringify(person)};
        return new Ember.RSVP.Promise(function(resolve,reject) {
            return self.xhr("/api/people", "POST", hash).then(function(persisted) {
                self.people.pushObject(person);
                resolve(person);
            }, function(err) {
                reject(err);
            });
        });
    },
    remove: function(person) {
        this.people.removeObject(person);
    },
    find: function() {
        var self = this;
        return this.xhr('/api/people', 'GET').then(function(response) {
            response.forEach(function(hash) {
                var person = Person.create(hash);
                Ember.run(self.people, self.people.pushObject, person);
            });
            return self.people;
        });
    }
});

export default Person;
