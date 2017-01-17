Meteor.methods({
    addUserToGroup: function(eMail, groupId) {
		var user = Meteor.users.findOne({"services.google.email": eMail});
		if (!user) {
			return "notFound";
		} else {
			var group = Groups.findOne(groupId);
			if (group.participants.indexOf(user._id) >= 0) {
				return "inGroup";
			} else {
				Groups.update({_id: groupId}, {$push: {participants: user._id}});
			}
		}
	},
    removeUserFromGroup: function(eMail, groupId) {
		var user = Meteor.users.findOne({"services.google.email": eMail});
		if (!user) {
			return "notFound";
		} else {
			var group = Groups.findOne(groupId);
			if (group.participants.indexOf(user._id) >= 0) {
				Groups.update({_id: groupId}, {$pull: {participants: user._id}});
			} else {
				return "inGroup"
			}
		}
	},
    });