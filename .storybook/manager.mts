import { addons } from '@storybook/manager-api';
import ohuTheme from './ohu-theme.mjs';

addons.setConfig({
  theme: ohuTheme,
  panelPosition: 'right',
});
