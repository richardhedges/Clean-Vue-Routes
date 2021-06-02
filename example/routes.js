addRoute('dashboard', 'Dashboard', '/')

addRoute('users', 'Users', () => {

	addRoute('view', 'Users/View', 'view/:user')
	addRoute('new', 'Users/New')

})