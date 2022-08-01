import { generate } from '@ant-design/colors';

//主题配置
export const THEME_VARIABLES = {
  primaryColor: 'red', // 全局主色
  successColor: '#55D187', // 成功色
  warningColor: '#52c41a', // 警告色
  errorColor: '#f5222d', // 错误色
  borderColor: '#d9d9d9', // 边框色
};

// --primary-color: #1890ff; // 全局主色
// --link-color: #1890ff; // 链接色
// --success-color: #52c41a; // 成功色
// --warning-color: #faad14; // 警告色
// --error-color: #f5222d; // 错误色

// --font-size-base: 14px; // 主字号
// --heading-color: rgba(0, 0, 0, 0.85); // 标题色
// --text-color: rgba(0, 0, 0, 0.65); // 主文本色
// --text-color-secondary: rgba(0, 0, 0, 0.45); // 次文本色
// --disabled-color: rgba(0, 0, 0, 0.25); // 失效色
// --border-radius-base: 4px; // 组件/浮层圆角
// --border-color-base: #d9d9d9; // 边框色
// --box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影

export const primaryColor = THEME_VARIABLES.primaryColor;

export const darkMode = 'light';

type Fn = (...arg: any) => any;

type GenerateTheme = 'default' | 'dark';

export interface GenerateColorsParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}

// 获取 ant design 色系
export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme,
  });
}

export function getThemeColors(color?: string) {
  const tc = color || primaryColor;
  const lightColors = generateAntColors(tc);
  const primary = lightColors[5];
  const modeColors = generateAntColors(primary, 'dark');

  return [...lightColors, ...modeColors];
}

export function generateColors({
  color = primaryColor,
  mixLighten,
  mixDarken,
  tinycolor,
}: GenerateColorsParams) {
  const arr = new Array(19).fill(0);
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5);
  });

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5);
  });

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  });

  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'));

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#ffffff');

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#000000');
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'));
}
