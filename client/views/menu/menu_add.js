Template.menuAdd.events({
  'click .add': function(event, tmpl) { 
      let title= $('#title').val();
      let price= $('#price').val();
      let groupId=this.tmpl.data._id;
      if(title && price){
      Meteor.call('menuInsert', title,price,groupId, function(error, result) {
      if (error)
        return alert(error);
          if(result==='bad')
            alert("Item " + title + " already exists in this group"); 
          alert(groupId);
      Router.go('groupPage');  
    });}
      else{alert("Please fill all the fields")}
  }
});