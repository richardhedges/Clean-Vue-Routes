addRoute('login', 'Login')

addRoute('dashboard', 'Dashboard', '/')

addRouteGroup({ middleware: 'auth' }, () => {

    addRoute('users', 'Users', () => {

        addRoute('view', 'Users/View', 'view/:user')
        addRoute('new', 'Users/New')

    })
    
})