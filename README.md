# Vue Router

This is a simple router class for use with Vue Router.

Vue Router natively reads an array of objects to register routes. This can become pretty difficult to manage once you have a handful of routes registered, especially when building an SPA. Because of this I decided to write a simple class to allow you to register routes in a similar way to Laravel Routes.

**Basic setup example:**

```javascript
# vue.js

import Routes from './router'
import App from './components/App'

const app = new Vue({
    el: '#app',
    router: Routes,
    render: h => h(App)
})
```

```vue
# App.vue

<template>
    <router-view :key="$router.path"></router-view>
</template>
```

```javascript
# routes.js

addRoute('dashboard', 'Dashboard', '/')

addRoute('users', 'Users', () => {

    addRoute('view', 'Users/View', 'view/:user')
    addRoute('new', 'Users/New')
    addRoute('edit', 'Users/Edit', 'edit/:user')

})
```

---

### Parameters Explained

```name```

The name parameter simply enables you to name each route, making it easier to reference routes later on.


```component```

The component parameter determines which component this route should look for. If you specify a folder name, it will look for `Index.vue` inside of that folder. For example if I set component as `Users`, my vue component could be either `Users/Index.vue` or `Users.vue`.

```path/callback```

You can either parse the third parameter as a string, or a callback method.<br>

As a string, the third parameter allows you to manually specify the path to this route, as well as specify route parameters, i.e. `users/:user` - which declares user as the parameter.

As a callback method, this parameter allows you to register child routes. Children routes inherit their parents name and path.

If the third parameter is parsed as a string, the callback may be parsed as the fourth parameter.

---

### Methods


**Add Route**

```addRoute('name', 'component', 'path', 'callback')```


**Add Route (with callback)**

This allows you to wrap child routes inside of other routes.

```addRoute('name', 'component', 'callback')```


**Add Route Group**

This method is mainly used to keep routes tidy, it gives you the ability to group routes without the need for additional components to be uncessarily registered.

```addRouteGroup('path', 'component', 'parameters:optional')```