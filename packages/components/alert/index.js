import ALert from './src/main';

/* istanbul ignore next */
ALert.install = function(Vue) {
  Vue.component(ALert.name, Alert);
};

export default ALert;