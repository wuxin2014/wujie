import LoadingComponent from './Loading.vue';
 
const LoadingPlugin = {
  install(Vue, options) {
    const LoadingConstructor = Vue.extend(LoadingComponent);
    const instance = new LoadingConstructor({
      el: document.createElement('div'), // 因为这给元素，所以无须手动挂载
      propsData: options
    });

    console.log('==LoadingPlugin==', instance.$el)
 
    document.body.appendChild(instance.$el);
 
    Vue.prototype.$PLoading = {
      show: function() {
        instance.isLoading = true;
      },
      hide: function() {
        instance.isLoading = false;
      }
    };
  }
};
 
export default LoadingPlugin;