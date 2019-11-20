import DropMenu from '..';
import Vue from 'vue';
import docs from '../README.md';
import Button from '../../Button';
import Toast from '../../Toast';

export default {
  title: 'Components|FeedBack/DropMenu',
  parameters: {
    component: DropMenu,
    notes: { markdown: docs },
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <DropMenu style="margin-top: 300px;"
        defaultValue={{ type: 'all', time: '*' }}
        onChange={(e) => {
          Toast.info(e.label || '', 2000, { position: 'bottom' });
        }}
        ref="dropMenu">
        <DropMenu.Item
          key="type"
          title="排班类型"
          options={[
            { label: '全部', value: 'all' },
            { label: '专家', disabled: true, value: 'special' },
            { label: '普通', value: 'normal' },
          ]}>
        </DropMenu.Item>
        <DropMenu.Item
          key="time"
          title="出诊时间"
          options={[
            { label: '不限', value: '*' },
            { label: '09-01 周日', value: '2019-09-01' },
            { label: '09-02 周一', value: '2019-09-02' },
            { label: '09-03 周二', value: '2019-09-03' },
            { label: '09-04 周三', value: '2019-09-04' },
          ]}>
        </DropMenu.Item>
        <DropMenu.Item key="position" title="医生职称">
          <Button type="primary" onClick={() => {
            (this.$refs.dropMenu as any).triggerChange({
              key: 'position',
              value: 'good',
              label: '沙雕',
            });
          }}>确认</Button>
        </DropMenu.Item>
      </DropMenu>
    );
  },
});
