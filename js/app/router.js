var Router = Ember.Router.extend();

Router.map(function() {
    this.resource("people", { path: "/" });
});

export default Router;
