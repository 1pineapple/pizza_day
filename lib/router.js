Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
 waitOn: function() {
    return [Meteor.subscribe('menu'),Meteor.subscribe('groups'),Meteor.subscribe('events'),Meteor.subscribe('confirmations')];
  }
});
Router.route('/', {name: 'groupsPage'});
Router.route('/menu', {name: 'menuPage'});
var requireLogin = function() {
  if (! Meteor.user()) {
       if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}
Router.route('/group/:_id',{
    name:'groupPage',
    data: function(){return Groups.findOne(this.params._id);}
});
Router.route('/add/menu', {
    name:'menuAdd',});
Router.route('/add/group', {name: 'groupAdd'});
Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin,{only:'groupsPage'})