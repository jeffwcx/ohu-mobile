import DropMenu from '..';
import Vue from 'vue';
import docs from '../README.md';
import Button from '../../Button';
import Toast from '../../Toast';
import props from 'vue-strict-prop';
import { component } from 'vue-tsx-support';
import { SVGIconDef } from '@/global';
import { CheckboxCircleOutlined, ArrowDownSFilled } from '@/icons';

export default {
  title: 'Components|FeedBack/DropMenu',
  parameters: {
    component: DropMenu,
    notes: { markdown: docs },
  },
};

const Demo = component({
  props: {
    direction: props.ofStringLiterals('up', 'down').default('down'),
    checkedIcon: props.ofType<SVGIconDef>().optional,
    dropDownIcon: props.ofType<SVGIconDef>().optional,
  },
  render() {
    return (
      <div>
        <DropMenu style="margin-top: 300px;"
          defaultValue={{ type: 'all', time: '*', position: 'zrys' }}
          direction={this.direction}
          onChange={(e) => {
            Toast.info(JSON.stringify(e) || '', { zIndex: 99999 });
          }}
          onItemChange={(e) => {
            console.log(e);
          }}
          ref="dropMenu">
          <DropMenu.Item
            key="type"
            title="排班类型"
            checkIcon={this.checkedIcon}
            dropDownIcon={this.dropDownIcon}
            options={[
              { label: '全部', value: 'all' },
              { label: '专家', disabled: true, value: 'special' },
              { label: '普通', value: 'normal' },
            ]}>
          </DropMenu.Item>
          <DropMenu.Item
            key="time"
            title="出诊时间"
            checkIcon={this.checkedIcon}
            dropDownIcon={this.dropDownIcon}
            options={[
              { label: '不限', value: '*' },
              { label: '09-01 周日', value: '2019-09-01' },
              { label: '09-02 周一', value: '2019-09-02' },
              { label: '09-03 周二', value: '2019-09-03' },
              { label: '09-04 周三', value: '2019-09-04' },
            ]}>
          </DropMenu.Item>
          <DropMenu.Item
            key="position"
            title="医生职称"
            checkIcon={this.checkedIcon}
            dropDownIcon={this.dropDownIcon}
            options={[
              {
                value: 'zrys',
                label: '主任医师',
              },
              {
                value: 'fzrys',
                label: '副主任医师',
              },
            ]}
            checkedFunc={(checkedOption) => {
              return !!checkedOption && (checkedOption.value === 'zrys' || checkedOption.value === 'fzrys');
            }}
            scopedSlots={{
              default: ({ checked }) =>
                <div style="padding: 10px; font-size: 14px; display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: center;">
                  <span>
                    当前选中：{(checked && checked.label) || '暂无'}
                  </span>
                  <div>
                    <Button style="margin-right: 5px;" size="sm" type="primary" inline onClick={() => {
                      (this.$refs.dropMenu as InstanceType<typeof DropMenu>).triggerChange({
                        index: 2,
                        key: 'position',
                        value: 'zrys',
                        label: '主任医师',
                      });
                    }}>主任医师</Button>
                    <Button size="sm" inline onClick={() => {
                      (this.$refs.dropMenu as InstanceType<typeof DropMenu>).triggerChange({
                        index: 2,
                        key: 'position',
                        value: 'fzrys',
                        label: '副主任医师',
                      });
                    }}>副主任医师</Button>
                  </div>
                </div>,
            }}>
          </DropMenu.Item>
        </DropMenu>
        <p style="height: 900px;"></p>
      </div>
    );
  },
});

export const basic = () => Demo;

export const direction = () => Vue.extend({
  render() {
    return (
      <Demo direction="up"></Demo>
    );
  },
});

export const icon = () => Vue.extend({
  render() {
    return (
      <Demo checkedIcon={CheckboxCircleOutlined} dropDownIcon={ArrowDownSFilled}></Demo>
    );
  },
});
