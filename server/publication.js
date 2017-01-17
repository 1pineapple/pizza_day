Meteor.publish('menu', function() {
  return Menu.find();
});
Meteor.publish('groups', function() {
  return Groups.find();
});
Meteor.publish('events', function() {
  return Events.find();
});
Meteor.publish('confirmations', function() {
  return Confirmations.find();
});
