import MInput from './src/input';

/* istanbul ignore next */
MInput.install = function(Vue) {
  Vue.component(MInput.name, MInput);
};

export default MInput;
