window.Vue = require('vue')

import Routes from '../router'
import App from './components/App'

const app = new Vue({
	el: '#app',
	router: Routes,
	render: h => h(App)
})

export default app