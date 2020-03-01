import { defineComponent } from '../_utils/defineComponent';
import { TreeSelectProps, TreeSelectEvents } from './types';


export default defineComponent<TreeSelectProps, TreeSelectEvents>('tree-select')
  .create({
    render() {
      const root = this.root();
      return (
        <div class={root}></div>
      );
    },
  });
