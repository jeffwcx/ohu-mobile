import Vue, { VNode } from 'vue';
import docs from '../README.md';
import List from '..';
import Icon from '../../Icon';
import { CheckboxOption } from '../../CheckboxGroup';
import CheckList from '../../CheckList';
import RadioList from '../../RadioList';
import { RadioOption } from '../../RadioGroup';
import Sticky from '../../Sticky';
import Button from '../../Button';

export default {
  title: 'Components|DataDisplay/List',
  parameters: {
    component: List,
    notes: { markdown: docs }
  },
};


export const avatar = () => Vue.extend({
  render() {
    return (
      <List>
        <List.Item button
          text="张斌 | 副主任医师"
          paddingDivider={false}
          minorText="擅长：肺结核、肺癌、胸腔积液、慢性咳嗽"
          onClick={(e) => {
            console.log(e);
          }}>
          <img slot="avatar" style="object-fit: contain;" src={require('@/assets/logo.svg')} />
          <Icon slot="action" type="arrow-right" />
        </List.Item>
      </List>
    );
  },
});

export const text = () => Vue.extend({
  render() {
    return (
      <List>
        <List.Item button>
          <div style="min-height: 32px;" slot="text">【避孕】短效避孕药——小药片，大用处</div>
          <template slot="minorText">
            <div style="height: 24px; line-height: 24px; display: flex; flex-flow: row nowrap; align-items: center;">
              <img style="object-fit: contain; width: 24px; height: 24px; margin-right: 8px;" src={require('@/assets/logo.svg')} />
              <span>严春晓  副主任医师 | 妇科</span>
            </div>
          </template>
        </List.Item>
      </List>
    );
  },
});

export const minorText = () => Vue.extend({
  render() {
    return (
      <List>
        <List.Item button
          text="张斌 | 副主任医师"
          onClick={(e) => {
            console.log(e);
          }}>
          <template slot="minorText">
            <div>在线挂号量：1256</div>
            <div>擅长：肺结核、肺癌、胸腔积液、慢性咳嗽</div>
          </template>
          <img slot="avatar" style="object-fit: contain;" src={require('@/assets/logo.svg')} />
          <Icon slot="action" type="arrow-right" />
        </List.Item>
      </List>
    );
  },
});

export const thumb = () => Vue.extend({
  render() {
    return (
      <List loading>
        <List.Item button
          text="解放院区"
          minorText="浙江杭州市解放路88号">
          <img slot="thumb" style="object-fit: contain;" src="http://via.placeholder.com/240x144/EEEEEE" />
          <Icon slot="action" type="arrow-right-s" />
        </List.Item>
        <List.Item button
          text="解放院区"
          minorText="浙江杭州市解放路88号">
          <img slot="thumb" style="object-fit: contain; width: 120px;" src="http://via.placeholder.com/240x144/EEEEEE" />
          <Icon slot="action" type="arrow-right-s" />
        </List.Item>
      </List>
    );
  }
});

export const icon = () => Vue.extend({
  render() {
    return (
      <List>
        <List.Item button
          text="芬兰 | 副主任医师">
          <Icon slot="icon" type="folder" color="#999"></Icon>
          <Icon type="arrow-right-s" slot="action"></Icon>
        </List.Item>
        <List.Item button
          text="芬兰 | 副主任医师">
          <Icon slot="icon" type="folder" color="#999"></Icon>
          <Icon type="arrow-right-s" slot="action"></Icon>
        </List.Item>
        <List.Item button
          text="芬兰 | 副主任医师">
          <Icon slot="icon" type="folder" color="#999"></Icon>
          <Icon type="arrow-right-s" slot="action"></Icon>
        </List.Item>
      </List>
    );
  },
});

export const sticky = () => Vue.extend({
  data() {
    return {
      list: new Array(4).fill(new Array(8).fill({
        text: '张斌 | 副主任医师',
        minorText: '擅长：肺结核、肺癌、胸腔积液、慢性咳嗽'
      })),
      top: 0,
    };
  },
  render() {
    return (
      <List>
        {
          this.list.map((items: any[], index: number) => {
            return (
              <ul style="position: relative; padding: 0;">
                {
                  items.map((item) => {
                    return (
                      <List.Item button
                        text={item.text}
                        paddingDivider={false}
                        minorText={item.minorText}>
                        <img slot="avatar" style="object-fit: contain;" src={require('@/assets/logo.svg')} />
                        <Icon slot="action" type="arrow-right" />
                      </List.Item>
                    );
                  })
                }
                <Sticky bottom={0}>{index * 7 + 1}-{(index + 1) * 8}</Sticky>
              </ul>
            );
          })
        }
      </List>
    );
  },
});

export const checkList = () => Vue.extend({
  data() {
    return {
      value: [],
      options: [{
        label: '消化内科',
        value: '1',
        attach: {
          name: '小何',
          sex: '女',
        },
      }, {
        label: '呼吸内科',
        value: '2',
        attach: {
          name: '小何',
          sex: '男',
        },
      }, {
        label: '神经内科',
        value: '3',
        disabled: true,
      }] as Array<CheckboxOption<{ name: string, sex: string }>>,
    };
  },
  render() {
    return (
      <div>
        <CheckList
          v-model={this.value}
          options={this.options}
          scopedSlots={{
            renderIcon: () => {
              return (
                <Icon slot="icon" type="folder" color="#999"></Icon>
              );
            },
            // renderThumb: () => {
            //   return (
            //     <img style="object-fit: contain;" src="http://via.placeholder.com/240x144/EEEEEE" />
            //   );
            // },
            // renderText: ({ option }) => {
            //   return option.label;
            // },
            // renderMinorText: ({ option }) => {
            //   return [
            //     <Tag>{option?.attach?.name}</Tag>,
            //     <Tag>{option?.attach?.sex}</Tag>
            //   ];
            // },
            renderItem: ({ option, checked }) => {
              return (
                <div style={{ color: checked ? 'rgb(45, 126, 255)' : '' }}>{option.label}</div>
              );
            },
          }}>
        </CheckList>
        <p>
          <h4>result:</h4>
          { JSON.stringify(this.value) }
        </p>
      </div>
    );
  },
});

export const radioList = () => Vue.extend({
  data() {
    return {
      value: null,
      options: [{
        label: '消化内科',
        value: '1',
      }, {
        label: '呼吸内科',
        value: '2',
      }, {
        label: '神经内科',
        value: '3',
      }] as Array<RadioOption>,
    };
  },
  render() {
    return (
      <div>
        <RadioList v-model={this.value} options={this.options} unCheckedIcon={null}>
        </RadioList>
        <p>
          <h4>Result:</h4>
          { JSON.stringify(this.value) }
        </p>
      </div>
    );
  },
});
