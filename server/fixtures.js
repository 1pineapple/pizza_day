if (Groups.find().count() === 0) {
    var newGroup = {
			owner: 11111,
			groupName: 'groupName',
			description: 'description',
			creationDate: new Date(),
			participants: [11111],
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
			groupIconURL: "http://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png",
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
}