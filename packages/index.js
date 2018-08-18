/**
 * @author MGT360124
 * Date: 18/8/15
 */

import Alert from './components/alert/index';

const components = [
    Alert,
]

const install = function (Vue, options = {}) {
    if (install.installed) return
    components.map(component => Vue.component(component.name, component))

    const M = {};

    Vue.prototype.$M = {
        size: options.size || '',
        zIndex: options.zIndex || 2000
      };
    
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    Alert,
}