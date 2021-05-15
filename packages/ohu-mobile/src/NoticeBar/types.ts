import { IconDef } from '../types';

export type NoticeBarType = 'warning' | 'default';
export type NoticeBarAction = 'link' | 'closable';

export interface NoticeBarProps {
  /**
   * 通知栏内容文字
   */
  text?: string;
  /**
   * 左侧图标
   */
  icon?: IconDef;
  /**
   * 通知栏类型
   * warning: 警告类型
   * default: 默认类型
   */
  type?: NoticeBarType;
  /**
   * 支持多行文字
   */
  multiline?: boolean;
  /**
   * 是否滚动
   */
  scrollable?: boolean;
  /**
   * 滚动速度 (?px/s)
   */
  speed?: number;
  /**
   * 文字的左侧偏移（当`multiline`为`true`时生效）
   * 百分比0%-100%，默认：100%
   */
  offset?: string;
  /**
   * 通知栏功能
   * link: 链接
   * closable: 可关闭
   */
  action?: NoticeBarAction;
}

export interface NoticeBarEvents {
  onClose: Event;
  onClick: Event;
}
