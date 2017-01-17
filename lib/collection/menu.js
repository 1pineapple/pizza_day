Menu = new Mongo.Collection('menu');
Meteor.methods({
  menuInsert: function(title,price, groupId) {
      check(title, String);
      check(price, String);
    var postWithSameLink = Menu.findOne({title: title, groupId: groupId});
    if (postWithSameLink) {
        return 'bad';
      }else{
        return Menu.insert({
          title: title,
          price: price,
        groupId: groupId
      });
      }
  },
    deleteItem:function(itemId){
		Menu.remove({_id: itemId});
	},
});