
import Vue from 'vue';
import docs from '@/Tabs/README.md';
import Tabs from '@/Tabs';
import '@/Tabs/style';
import Card from '@/Card';
import '@/Card/style';

export default {
  title: 'Components|Navigation/Tabs',
  parameters: {
    component: Tabs,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <div>
        <Card>
          <Tabs></Tabs>
        </Card>
      </div>
    );
  },
});
