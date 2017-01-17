Template.groupsItem.helpers({
    showDate: function() {
		return this.creationDate.toLocaleTimeString() + " " + this.creationDate.toLocaleDateString();
	},
    groupIcon: function() {
		return this.groupIconURL;
	},
    owner: function(){
        return this.owner===Meteor.userId();
    },
    sub: function(){
       var result= this.participants.filter(function(item){
          return item===Meteor.userId();
       });
        if(result !=0)
            return true;
        else
            return false;
    }
});
Template.groupsItem.events({
    'click .delete': function(){
         if (confirm("Delete this "+this.groupName+" ?")) {
      Meteor.call("deleteGroup", this._id);
    Router.go('groupsPage');}
    },
    'click .subscribe': function(){
        var groupId=this._id;
        Meteor.call('addSub',groupId, function(error, result) {
      if (error)
        return alert(error);
             Router.go('groupPage', {_id: groupId});
        });
    } 
});