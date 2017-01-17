Template.groupPage.helpers({
     menu: function(){
		return Menu.find({groupId:this._id});
    },
    event: function(){
        return Events.find({group:this._id});
    },
     owner: function(){
        return this.owner===Meteor.userId();
     }
});
Template.groupPage.events({
    'click .unsubscribe': function(){
        var groupId=this._id;
        Meteor.call('deleteSub',groupId, function(error, result) {
      if (error)
        return alert(error);
             Router.go('groupsPage');
        });
    }
});
Template.groupPage.onCreated(function helloOnCreated() {
  this.counter = new ReactiveVar(0);
    this.cost=new ReactiveVar(0);
});
Template.groupPage.helpers({
     cost() {
    return Template.instance().cost.get();
  },
});
Template.groupPage.events({
  'click .plus'(event, instance) {
    instance.counter.set(instance.counter.get() + 1);
      instance.cost.set(instance.cost.get() + Number(this.price));
  },
});
Template.groupPage.events({
  'click .minus'(event, instance) {
      if(Template.instance().counter.get()!=0){
    instance.counter.set(instance.counter.get() - 1);
       instance.cost.set(instance.cost.get() - Number(this.price));}
  },
});
Template.groupPage.events({
    'click .accept'(event,instance){
        Router.go('homePage');
    }
});
Template.groupPage.events({
    'click .add': function(event, tmpl) { 
      let title= $('#title').val();
      let price= $('#price').val();
      let groupId=this._id;
      if(title && price){
      Meteor.call('menuInsert', title,price,groupId, function(error, result) {
      if (error)
        return alert(error);
          if(result==='bad')
            alert("Item " + title + " already exists in this group"); 
      Router.go('groupPage',{_id:groupId}); 
          $('#title').val('');
          $('#price').val('');
    });}
      else{alert("Please fill all the fields")}
  },
    'click .add': function(event, tmpl) {
		event.preventDefault();
		let groupId = this._id;
		let userEmail = $("#email").val();
		Meteor.call("addUserToGroup", userEmail, groupId, function(error, result) {
				if (error) {
					return alert(error);
				} else if (result === "notFound") {
					alert("user with email " + userEmail + "not found");
				} else if (result === "inGroup") {
					alert("user with email " + userEmail + " is already in group");
				} else {
					alert("user with email " + userEmail + " has been invited");
				}
			}
		);
		$("#user-email").val("");
	},
    'click .delete': function(event, tmpl) {
		let groupId = this._id;
		let userEmail = $("#email").val();
		Meteor.call("removeUserFromGroup", userEmail, groupId, function(error, result) {
			if (error) {
				alert(error);
			} else if (result === "notFound") {
				alert("user with e-mail " + userEmail + " not found");
			} else if (result === "inGroup") {
				alert("user with e-mail " + userEmail + " doesn't belong to this group");
			} else {
				alert("user with e-mail " + userEmail + " has been removed from group");
			}
		});
		$("#email").val("");
	},
    "click .addevent": function() {
		let eventName = $("#name").val();
		let groupId = this._id;
        var owner = Meteor.userId();
		if (eventName) {
			Meteor.call("createEvent", eventName, groupId, owner, function(error, result) {
				if (error) {
					alert(error);
				} else {
					alert("Event " + eventName + " is created!");
					$("#name").val("");
				}
			});
		} else {
			alert("Enter the event name")
		}
	}
});