Groups = new Mongo.Collection('groups');

Meteor.methods({
    createGroup: function(groupName, description, icon) {
		check(groupName, String);
        check(description, String);
        check(icon, String);
		if (!icon) {
			icon = "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png"
		}
		var newGroup = {
			owner: Meteor.userId(),
			groupName: groupName,
			description: description,
			creationDate: new Date(),
			participants: [Meteor.userId()],
			menuItems: [
				{title: 'Pizza lite',price:'10'},
				{title: 'Pizza ultra',price:'20'},
				{title: "Prosciutto salad", price:'15'},
				{title: "Pepsi 0.5", price: '14'},
				{title: "Pepsi 1.0", price: '18'},
				{title: "Juice", price: '18'},
				{title: "Tomato juice", price: '26'},
				{title: "Fruit juice ", price: '26'},
				{title: "Minaral water", price: '5'},
				{title: "Sandora juice", price: '22'}
			],
			groupIconURL: icon,
			currentEvents: []
		};
		var groupId = Groups.insert(newGroup);
		newGroup.menuItems.forEach(function(elem, index) {
			Menu.insert({
				title: elem.title,
				price: elem.price,
				groupId: groupId
			});
		});
		return groupId;
	},
    deleteGroup: function(groupId) {
		Menu.remove({groupId: groupId});
		Groups.remove(groupId);
    },
    addSub:function(groupId){
        Groups.update({_id: groupId}, {$push: {participants: Meteor.userId()}});
    },
     deleteSub:function(groupId){
        Groups.update({_id: groupId}, {$pull: {participants: Meteor.userId()}});
    },
});