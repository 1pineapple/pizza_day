Template.menuItem.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});
Template.menuItem.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});
Template.menuItem.events({
  'click .plus'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
Template.menuItem.events({
  'click .minus'(event, instance) {
    // increment the counter when button is clicked
      if(Template.instance().counter.get()!=0){
    instance.counter.set(instance.counter.get() - 1);}
  },
});
Template.menuItem.events({
  'click .delete':function() {
    if (confirm("Delete this "+this.title+" ?")) {
      Meteor.call("deleteItem", this._id);
    Router.go('groupPage',{_id:this.groupId});}
  },
});