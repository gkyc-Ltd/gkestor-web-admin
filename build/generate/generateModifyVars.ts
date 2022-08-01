import { generateAntColors, primaryColor, THEME_VARIABLES } from '../config/themeConfig';
import { getThemeVariables } from 'ant-design-vue/dist/theme';
import { resolve } from 'path';

/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  const palettes = generateAntColors(primaryColor);
  console.info('paletters', palettes);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  const modifyVars = getThemeVariables({ dark });
  return {
    ...modifyVars,
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    hack: `${modifyVars.hack} @import (reference) "${resolve('src/design/config.less')}";`,
    'primary-color': primary,
    ...primaryColorObj,
    'info-color': primary,
    'processing-color': primary,
    'success-color': THEME_VARIABLES.successColor, //  Success color
    'error-color': THEME_VARIABLES.errorColor, //  False color
    'warning-color': THEME_VARIABLES.warningColor, //   Warning color
    //'border-color-base': '#EEEEEE',
    'font-size-base': '14px', //  Main font size
    'border-radius-base': '2px', //  Component/float fillet
    'border-color-base': THEME_VARIABLES.borderColor, // 边框色
    'link-color': primary, //   Link color
    'app-content-background': '#fafafa', //   Link color
  };
}
