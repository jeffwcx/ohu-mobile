import Vue, { CSSProperties } from 'vue';
import docs from './README.md?raw';
import props from 'vue-strict-prop';
import { component } from 'vue-tsx-support';
import DropMenu from './index';
import './style';
import Button from '../Button';
import '../Button/style';
import Toast from '../Toast';
import '../Toast/style';
import { IconDef } from '../types';
import { ArrowDownSFilled, CheckboxCircleOutlined } from '@ohu-mobile/icons';

export default {
  title: 'Components/FeedBack/DropMenu',
  parameters: {
    component: DropMenu,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

const Demo = component({
  props: {
    direction: props.ofStringLiterals('up', 'down').default('down'),
    checkedIcon: props.ofType<IconDef>().optional,
    dropDownIcon: props.ofType<IconDef>().optional,
    itemActive: props(Boolean).default(true),
    divider: props(Boolean).default(true),
    mask: props(Boolean).default(true),
    defaultValue: props(Object).default(() => ({
      type: 'all',
      time: '*',
      position: 'zrys',
    })),
    typeDisabled: props(Boolean).default(false),
    popupStyle: props<Partial<CSSProperties>>(Object).default(() => ({})),
  },
  render() {
    return (
      <div>
        <DropMenu
          style="margin-top: 300px;"
          defaultValue={this.defaultValue}
          direction={this.direction}
          itemActive={this.itemActive}
          divider={this.divider}
          mask={this.mask}
          popupStyle={this.popupStyle}
          checkIcon={this.checkedIcon}
          dropDownIcon={this.dropDownIcon}
          onChange={(e) => {
            Toast.info(JSON.stringify(e) || '', { zIndex: 99999 });
          }}
          onItemChange={(e) => {
            console.log(e);
          }}
        >
          <DropMenu.Item
            key="type"
            title="排班类型"
            disabled={this.typeDisabled}
            options={[
              { label: '全部', value: 'all' },
              { label: '专家', disabled: true, value: 'special' },
              { label: '普通', value: 'normal' },
            ]}
          ></DropMenu.Item>
          <DropMenu.Item
            key="time"
            title="出诊时间"
            style="width: 80%; flex-shrink: 0;"
            options={[
              { label: '不限', value: '*' },
              { label: '09-01 周日', value: '2019-09-01' },
              { label: '09-02 周一', value: '2019-09-02' },
              { label: '09-03 周二', value: '2019-09-03' },
              { label: '09-04 周三', value: '2019-09-04' },
            ]}
          ></DropMenu.Item>
          <DropMenu.Item
            key="position"
            title="医生职称"
            popupStyle={{ background: '#efefef', height: '200px' }}
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
            scopedSlots={{
              title: ({ checked, defaultTitle }) => {
                return defaultTitle + (checked?.value || '');
              },
              default: ({ checked, instance, options }) => (
                <div style="padding: 10px; font-size: 14px; display: flex; flex-flow: row nowrap; justify-content: space-between; align-items: center;">
                  <span>当前选中：{(checked && checked.label) || '暂无'}</span>
                  <div>
                    {options.map((option) => {
                      return (
                        <Button
                          style="margin-left: 5px;"
                          size="sm"
                          type={
                            checked && checked.value === option.value
                              ? 'primary'
                              : 'default'
                          }
                          inline
                          onClick={() => {
                            instance.triggerChange({
                              label: option.label,
                              value: option.value,
                            });
                          }}
                        >
                          {option.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ),
            }}
          ></DropMenu.Item>
        </DropMenu>
        <p style="height: 900px;"></p>
      </div>
    );
  },
});

export const Basic = () =>
  Vue.extend({
    render() {
      return <Demo defaultValue={{}}></Demo>;
    },
  });

export const Direction = () =>
  Vue.extend({
    render() {
      return <Demo direction="up"></Demo>;
    },
  });

export const Icon = () =>
  Vue.extend({
    render() {
      return (
        <Demo
          checkedIcon={CheckboxCircleOutlined}
          dropDownIcon={ArrowDownSFilled}
        ></Demo>
      );
    },
  });

export const DisableItemActive = () =>
  Vue.extend({
    render() {
      return <Demo itemActive={false}></Demo>;
    },
  });

export const Divider = () =>
  Vue.extend({
    render() {
      return <Demo divider={false}></Demo>;
    },
  });

export const Mask = () =>
  Vue.extend({
    render() {
      return <Demo mask={false}></Demo>;
    },
  });

export const ItemDisabled = () =>
  Vue.extend({
    render() {
      return <Demo typeDisabled></Demo>;
    },
  });

export const GlobalPopupStyle = () =>
  Vue.extend({
    render() {
      return (
        <Demo popupStyle={{ maxHeight: '200px', overflowY: 'auto' }}></Demo>
      );
    },
  });
