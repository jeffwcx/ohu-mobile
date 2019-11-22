import Grid from '..';
import docs from '../README.md';
import Vue from 'vue';

export default {
  title: 'Components|Basic/Layout',
  parameters: {
    component: Grid,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <Grid x="left" y="center" m="around" gap={2} style="height: 300px; background: #888;">
        <Grid.Item span={3} style="background: #efefef; height: 100px;" class="sdf"></Grid.Item>
        <Grid.Item span={3} style="background: #efefef; height: 100px;"></Grid.Item>
        <Grid.Item span={3} style="background: #efefef; height: 100px;"></Grid.Item>
        <Grid.Item span={3} style="background: #efefef; height: 100px;"></Grid.Item>
        <Grid.Item span={3} style="background: #efefef; height: 100px;"></Grid.Item>
        <Grid.Item span={3} style="background: #efefef; height: 100px;"></Grid.Item>
      </Grid>
    );
  },
});
