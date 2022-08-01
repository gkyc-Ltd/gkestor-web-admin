/*
 * @Author: ypc
 * @Date: 2022-07-18 11:13:00
 * @LastEditors: ypc
 * @LastEditTime: 2022-08-01 16:19:53
 * @Description: file content
 * @FilePath: \gkestor-web-admin\src\logics\theme\index.ts
 */
import { getThemeColors, generateColors } from '../../../build/config/themeConfig';
import { setCssVar } from './util';
import { replaceStyleVariables } from 'vite-plugin-theme/es/client';
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils';

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
