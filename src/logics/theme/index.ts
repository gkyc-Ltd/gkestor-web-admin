/*
 * @Author: ypc
 * @Date: 2022-07-18 11:13:00
 * @LastEditors: ypc
 * @LastEditTime: 2022-08-02 14:28:04
 * @Description: file content
 * @FilePath: \gkestor-web-admin\src\logics\theme\index.ts
 */
import { getThemeColors, generateColors, THEME_VARIABLES } from '../../../build/config/themeConfig';
import { setCssVar } from './util';
import { replaceStyleVariables } from 'vite-plugin-theme/es/client';
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils';

export function initThemeVariables() {
  Object.keys(THEME_VARIABLES)
    .map((item) => {
      return {
        key: '--' + item.replace(/([A-Z])/g, '-$1').toLowerCase(),
        value: THEME_VARIABLES[item],
      };
    })
    .forEach((item) => {
      setCssVar(item.key, item.value);
    });
}

export async function changeTheme(color: string) {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
    color,
  });

  setCssVar('--primary-color', color);
  return await replaceStyleVariables({
    colorVariables: [...getThemeColors(color), ...colors],
  });
}
