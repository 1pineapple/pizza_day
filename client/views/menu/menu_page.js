Template.menuPage.helpers({
    menu: function(){
		var ourGroup = Groups.findOne(this._id);
		return Menu.find({groupId: ourGroup});
    }
});
Template.menuPage.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
    this.cost=new ReactiveVar(0);
});
Template.menuPage.helpers({
     cost() {
    return Template.instance().cost.get();
  },
});
Template.menuPage.events({
  'click .plus'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
      instance.cost.set(instance.cost.get() + Number(this.price));
  },
});
Template.menuPage.events({
  'click .minus'(event, instance) {
    // increment the counter when button is clicked
      if(Template.instance().counter.get()!=0){
    instance.counter.set(instance.counter.get() - 1);
       instance.cost.set(instance.cost.get() - Number(this.price));}
  },
});
Template.menuPage.events({
    'click .accept'(event,instance){
        Router.go('homePage');
    }
});
Template.menuPage.events({
    'click button'(event,instance){
        Router.go('menuAdd');
    }
});