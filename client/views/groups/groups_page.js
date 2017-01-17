Template.groupsPage.events({
    'click .add'(event,instance){
        Router.go('groupAdd');
    }
});
Template.groupsPage.helpers({
    groups: function(){
        return Groups.find();
    }
});
