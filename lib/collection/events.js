Events = new Mongo.Collection('events');
Meteor.methods({
  createEvent: function(name, groupId, owner) {
		check(name, String);
		var properties = {
			eventName: name,
			date: new Date(),
			status: "ordering",
			group: groupId,
			eventOwner: owner,
			eventParticipants: [owner],
			confirmedParticipants: []
		};
		var eventId = Events.insert(properties);

		Groups.update({_id: groupId}, {$push: {currentEvents: eventId}});
		Confirmations.insert({user: Meteor.userId(), event: eventId, confirmed: false});
	},  
});