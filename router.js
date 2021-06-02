import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = []

window.parentRoutes = []

window.addRoute = (name, componentName, path, callback) => {

    let options = {}

    if (typeof name !== 'string') {

        if (typeof name.name == 'undefined') {
            return
        }

        options = name
        name = options.name

        delete options.name

        if (typeof options.middleware != 'undefined') {

            if (typeof options.middleware == 'string') {
                options.middleware = [options.middleware]
            }

        }

    }

    if (typeof path !== 'string') {
        
        if (path != undefined) {
            callback = path
        }

        path = name

    }

    path = path.replace(/^\//, '')

    if (window.parentRoutes.length) {

        let lastParent = window.parentRoutes[window.parentRoutes.length - 1]

        if (lastParent.name != '') {
            name = lastParent.name + '.' + name
        }

        if (lastParent.path != '/') {
            path = lastParent.path.substring(1) + '/' + path
        }

    }

    let component = null

    try {
        component = require(`./views/${componentName}`).default
    } catch (e) {

        try {
            component = require(`./views/${componentName}/Index`).default
        } catch (e) {
        }

    }

    let middlewares = []

    if (typeof options.middleware != 'undefined') {

        options.middleware.forEach(middleware => {
            middlewares.push(middleware)
        })

    }

    parentRoutes.forEach(parentRoute => {

        if (typeof parentRoute.options.middleware != 'undefined') {

            parentRoute.options.middleware.forEach(middleware => {
                middlewares.push(middleware)
            })

        }

    })

    if (component !== null) {

        middlewares.filter((v, i, a) => a.indexOf(v) === i).forEach(middleware => {

            middleware = require(`./middleware/${middleware}`)

            if (typeof middleware.default.extends != 'undefined') {
                component.extends = middleware.default.extends()
            }

            if (typeof middleware.default.components != 'undefined') {
                
                if (typeof component.components == 'undefined') {
                    component.components = {}
                }

                let middlewareComponents = middleware.default.components()
                
                if (typeof middleware.default.components == Object) {
                    component.components = {...component.components, ...middlewareComponents}
                } else {
                    component.components = {...component.components, ...{middlewareComponents}}
                }

            }

        })

        let thisRoute = {
            path: '/' + path,
            name: name,
            options: options
        }

        routes.push({...thisRoute, ...{
            component: component
        }})

        window.parentRoutes.push(thisRoute)

        if (callback != undefined) {
            callback()
        }

        window.parentRoutes.pop()

    }

}

window.addRouteGroup = (name, path, callback) => {

    let options = {}

    if (typeof name !== 'string') {

        options = name
        name = typeof options.name != 'undefined' ? options.name : ''

        delete options.name

        if (typeof options.middleware != 'undefined') {

            if (typeof options.middleware == 'string') {
                options.middleware = [options.middleware]
            }

        }

    }

    if (typeof path !== 'string') {
        
        if (path != undefined) {
            callback = path
        }

        path = name

    }

    path = path.replace(/^\//, '')

    window.parentRoutes.push({
        path: '/' + path,
        name: name,
        options: options
    })

    callback()
    window.parentRoutes.pop()

}

require('./routes')

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

export default router;