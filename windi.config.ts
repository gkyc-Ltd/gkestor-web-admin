/*
 * @Author: ypc
 * @Date: 2022-07-18 11:13:00
 * @LastEditors: ypc
 * @LastEditTime: 2022-08-01 17:06:05
 * @Description: file content
 * @FilePath: \gkestor-web-admin\windi.config.ts
 */
import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  darkMode: 'class',
  plugins: [createEnterPlugin()],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        primary: 'var(--primary-color)', // 全局主色
        link: 'var(--link-color)', // 链接色
        success: 'var(--success-color)', // 成功色
        warning: 'var(--warning-color)', // 警告色
        error: '#f5222d', // 错误色
        heading: 'rgba(0, 0, 0, 0.85)', // 标题色
        text: {
          first: 'rgba(0, 0, 0, 0.65)',
          secondary: 'rgba(0, 0, 0, 0.45)', // 次文本色
        },
        disabled: 'rgba(0, 0, 0, 0.25)', // 失效色
        border: '#d9d9d9', // 边框色
        // font-size-base: '14px',// 主字号
        // border-radius-base: '4px', // 组件/浮层圆角
        // box-shadow-base: '0 2px 8px rgba(0, 0, 0, 0.15)',// 浮层阴影
      },
      screens: {
        sm: '576px',
        md: '768px', // ipad 768*1024
        lg: '992px', //
        xl: '1200px', //1280 * 720： 老式电脑的屏幕，目前很少见到，1366 * 768 ： 普通液晶显示器
        '2xl': '1600px', //1920 * 1080： 高清液晶显示器
        '3xl': '2000px', //2560 * 1440： 2K高清显示器
        '4xl': '2600px', //3840 * 2160： 4K高清显示器
      },
    },
  },
});

/**
 * Used for animation when the element is displayed.
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume.
 */
function createEnterPlugin(maxOutput = 6) {
  const createCss = (index: number, d = 'x') => {
    const upd = d.toUpperCase();
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        opacity: '0',
        animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`,
      },
    };
  };
  const handler = ({ addBase }) => {
    const addRawCss = {};
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      });
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      [`@keyframes enter-y-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    });
  };
  return { handler };
}
