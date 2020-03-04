import { SwitchBaseProps, SwitchBaseEvents, SwitchBaseScopedSlots } from '../_internal/SwitchBase';

export type RadioProps = Omit<SwitchBaseProps, 'indeterminate' | 'indeterminateIcon'>

export interface RadioEvents extends SwitchBaseEvents {}


export interface RadioScopedSlots extends SwitchBaseScopedSlots {}
