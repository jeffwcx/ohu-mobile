import { create } from '@storybook/theming';
import brandImage from './assets/logo-text.svg';


export default create({
  base: 'light',
  colorPrimary: '#2d7eff',
  colorSecondary: '#2d7eff',
  barTextColor: '#333333',
  barSelectedColor: '#2d7eff',
  textColor: '#333333',
  textInverseColor: '#ffffff',
  fontBase: '-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  brandTitle: 'ohu-mobile',
  brandImage,
});
