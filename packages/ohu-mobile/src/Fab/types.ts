import { ButtonProps, ButtonEvents } from '../Button';
import { IconDef } from '../types';

export type FabPositions = 'left-top' | 'left-center' | 'left-bottom' |
'right-top' | 'right-center' | 'right-bottom' |
'center-top' | 'center-center' | 'center-bottom';

export type FabAdsorb = 'x' | 'y' | 'none';

export type FabDirection = 'up' | 'down' | 'left' | 'right';

export type FabMaskEffect = 'ripple' | 'normal';

export interface FabProps extends ButtonProps {
  expand?: boolean;
  /**
   * position of the Fab.
   */
  position?: FabPositions;

  /**
   * direction to expand Fab actions to.
   */
  direction?: FabDirection;
  /**
   * whether and how to adsorb.
   */
  // adsorb?: FabAdsorb; // todo

  /**
   * use mask
   */
  mask?: boolean;
  /**
   * transition of mask
   */
  maskTransition?: string;
  /**
   * close fab when click mask
   */
  maskClosable?: boolean;
  /**
   * label of the Fab
   */
  label?: string;

  /**
   * Fab button text
   */
  text?: string;
  /**
   * Fab z-index
   */
  zIndex?: number;

  shadow?: boolean;

  closeIcon?: IconDef | string;
}

export interface FabEvents {
  onChange?: boolean;
  onClick?: MouseEvent;
}


export interface FabActionProps extends ButtonProps {
  /**
   * label of the FabAction
   */
  label?: string;
}

export interface FabActionEvents extends ButtonEvents {}
