import { defineComponent } from '../_utils/defineComponent';
import { TabsProps, TabsEvents } from './types';


export default defineComponent<TabsProps, TabsEvents>('tabs')
  .create({
    render() {
      const root = this.root();
      return (
        <div class={root}></div>
      );
    },
  });
