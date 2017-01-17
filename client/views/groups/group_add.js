Template.groupAdd.events({
  'click .create': function(event, tmpl) {
      let groupName = $("#groupName").val();
		let groupDescription = $("#description").val();
		let icon = $("#icon").val();
      if (groupName && groupDescription) {
			Meteor.call("createGroup", groupName, groupDescription, icon, function(error, result) {
				if (error) {
					alert(error);
				} else {
                    Router.go("groupsPage")
				}
			});
		} else {
			alert("Please fill all the fields")
		}
	}
    });