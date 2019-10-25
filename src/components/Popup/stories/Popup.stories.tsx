import Popup from '..';
import Vue from 'vue';
import docs from '../README.md';
import Button from '../../Button';

export default {
  title: 'Components|FeedBack/Popup',
  parameters: {
    component: Popup,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  methods: {
    open() {
    },
  },
  render() {
    return (
      <div style="padding: 10px;">
        <Button type="primary" onClick={this.open}>打开</Button>
      </div>
    );
  }
});
