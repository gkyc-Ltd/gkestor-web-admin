import { App, createApp, createVNode } from 'vue';
import type { Directive, DirectiveBinding } from 'vue';
import './index.css';
const badge: Directive = {
  mounted(el, binding: DirectiveBinding) {
    el.style.position = el.style.position || 'relative'; // 默认给元素添加定位
    // 获取根元素
    const r: any = document.querySelector(':root');
    r.style.setProperty('--bcolor', binding.value ? binding.value : 'pink');
    /*const Empty = Vue.extend({
      template: `<div class="decorate-box2">
          <div class="corner"  />
          <div class="corner" />
          <div class="corner" />
          <div class="corner" />
        </div>`,
    });
    const component = new Empty().$mount().$el;*/
    const app = createApp({
      render() {
        return createVNode('div', { class: 'decorate-box2' }, [
          createVNode('div', { class: 'corner' }),
          createVNode('div', { class: 'corner' }),
          createVNode('div', { class: 'corner' }),
          createVNode('div', { class: 'corner' }),
        ]);
      },
    });
    const parent = document.createElement('div');
    const instance = app.mount(parent);
    el.appendChild(instance.$el);
  },
};

export function setupBadge(app: App) {
  app.directive('badge', badge);
}

export default badge;
