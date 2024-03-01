import Vue from 'vue';
import docs from './README.md?raw';
import List from './index';
import './style';
import Icon from '../Icon';
import '../Icon/style';
import Skeleton from '../Skeleton';
import '../Skeleton/style';
import Grid from '../Grid';
import '../Grid/style';
import CheckList from '../CheckList';
import '../CheckList/style';
import RadioList from '../RadioList';
import '../RadioList/style';
import { RadioOption } from '../RadioGroup';
import { CheckboxOption } from '../CheckboxGroup';
import {
  ArrowRightOutlined,
  ArrowRightSOutlined,
  FolderOutlined,
} from '@ohu-mobile/icons';

export default {
  title: 'Components/DataDisplay/List',
  parameters: {
    component: List,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const Avatar = () =>
  Vue.extend({
    render() {
      return (
        <List>
          <List.Item
            button
            text="张斌 | 副主任医师"
            paddingDivider={false}
            minorText="擅长：肺结核、肺癌、胸腔积液、慢性咳嗽"
            onClick={(e) => {
              console.log(e);
            }}
          >
            <img
              slot="avatar"
              style="object-fit: contain;"
              src="https://raw.githubusercontent.com/jeffwcx/ohu-mobile/master/docs/storybook/src/assets/logo.svg"
            />
            <Icon slot="action" type={ArrowRightOutlined} />
          </List.Item>
        </List>
      );
    },
  });

export const Text = () =>
  Vue.extend({
    render() {
      return (
        <List>
          <List.Item button>
            <div style="min-height: 32px;" slot="text">
              【避孕】短效避孕药——小药片，大用处
            </div>
            <template slot="minorText">
              <div style="height: 24px; line-height: 24px; display: flex; flex-flow: row nowrap; align-items: center;">
                <img
                  style="object-fit: contain; width: 24px; height: 24px; margin-right: 8px;"
                  src="https://raw.githubusercontent.com/jeffwcx/ohu-mobile/master/docs/storybook/src/assets/logo.svg"
                />
                <span>严春晓 副主任医师 | 妇科</span>
              </div>
            </template>
          </List.Item>
        </List>
      );
    },
  });

export const MinorText = () =>
  Vue.extend({
    render() {
      return (
        <List>
          <List.Item
            button
            text="张斌 | 副主任医师"
            onClick={(e) => {
              console.log(e);
            }}
          >
            <template slot="minorText">
              <div>在线挂号量：1256</div>
              <div>擅长：肺结核、肺癌、胸腔积液、慢性咳嗽</div>
            </template>
            <img
              slot="avatar"
              style="object-fit: contain;"
              src="https://raw.githubusercontent.com/jeffwcx/ohu-mobile/master/docs/storybook/src/assets/logo.svg"
            />
            <Icon slot="action" type="arrow-right" />
          </List.Item>
        </List>
      );
    },
  });

export const Finished = () =>
  Vue.extend({
    render() {
      return (
        <List finished>
          <List.Item button text="解放院区" minorText="浙江杭州市解放路88号">
            <img
              slot="thumb"
              style="object-fit: contain; width: 120px;"
              src="http://via.placeholder.com/240x144/EEEEEE"
            />
            <Icon slot="action" type={ArrowRightSOutlined} />
          </List.Item>
        </List>
      );
    },
  });

export const Loading = () =>
  Vue.extend({
    render() {
      return (
        <List loading>
          <List.Item button text="解放院区" minorText="浙江杭州市解放路88号">
            <img
              slot="thumb"
              style="object-fit: contain; width: 120px;"
              src="http://via.placeholder.com/240x144/EEEEEE"
            />
            <Icon slot="action" type="arrow-right-s" />
          </List.Item>
        </List>
      );
    },
  });

export const LoadingSlot = () =>
  Vue.extend({
    render() {
      return (
        <List loading>
          <Skeleton title rows={2} slot="loading">
            <Skeleton
              style="width: 120px; height: 72px;"
              slot="left"
            ></Skeleton>
            <Grid
              slot="content"
              style="height: 72px;"
              column
              x="left"
              y="center"
            >
              <Skeleton row rowWidth="30%"></Skeleton>
              <Skeleton row rowWidth="70%"></Skeleton>
            </Grid>
          </Skeleton>
          <List.Item button text="解放院区" minorText="浙江杭州市解放路88号">
            <img
              slot="thumb"
              style="object-fit: contain; width: 120px;"
              src="http://via.placeholder.com/240x144/EEEEEE"
            />
            <Icon slot="action" type="arrow-right-s" />
          </List.Item>
          <List.Item button text="解放院区" minorText="浙江杭州市解放路88号">
            <img
              slot="thumb"
              style="object-fit: contain; width: 120px;"
              src="http://via.placeholder.com/240x144/EEEEEE"
            />
            <Icon slot="action" type="arrow-right-s" />
          </List.Item>
        </List>
      );
    },
  });

export const Thumb = () =>
  Vue.extend({
    render() {
      return (
        <List>
          <List.Item button text="解放院区" minorText="浙江杭州市解放路88号">
            <img
              slot="thumb"
              style="object-fit: contain; width: 90px;"
              src="http://via.placeholder.com/240x144/EEEEEE"
            />
            <Icon slot="action" type="arrow-right-s" />
          </List.Item>
          <List.Item button text="解放院区" minorText="浙江杭州市解放路88号">
            <img
              slot="thumb"
              style="object-fit: contain; width: 90px;"
              src="http://via.placeholder.com/240x144/EEEEEE"
            />
            <Icon slot="action" type="arrow-right-s" />
          </List.Item>
        </List>
      );
    },
  });

export const WithIcon = () =>
  Vue.extend({
    render() {
      return (
        <List>
          <List.Item button text="芬兰 | 副主任医师">
            <Icon slot="icon" type={FolderOutlined} color="#999"></Icon>
            <Icon type={ArrowRightSOutlined} slot="action"></Icon>
          </List.Item>
          <List.Item button text="芬兰 | 副主任医师">
            <Icon slot="icon" type={FolderOutlined} color="#999"></Icon>
            <Icon type={ArrowRightSOutlined} slot="action"></Icon>
          </List.Item>
          <List.Item button text="芬兰 | 副主任医师">
            <Icon slot="icon" type={FolderOutlined} color="#999"></Icon>
            <Icon type={ArrowRightSOutlined} slot="action"></Icon>
          </List.Item>
        </List>
      );
    },
  });

export const Subheader = () =>
  Vue.extend({
    data() {
      return {
        list: new Array(1).fill(
          new Array(8).fill({
            text: '张斌 | 副主任医师',
            minorText: '擅长：肺结核、肺癌、胸腔积液、慢性咳嗽',
          }),
        ),
        top: 0,
        count: 0,
        load: false,
        finished: false,
        infinite: true,
      };
    },
    render() {
      return (
        <List
          style="height: 80vh; overflow: scroll;"
          infinite={this.infinite}
          finished={this.finished}
          loading={this.load}
          scrollContainer={(self) => {
            return self.$el;
          }}
          onInfinite={() => {
            if (this.load || this.finished) {
              return;
            }
            this.load = true;
            console.log('开始请求');
            setTimeout(() => {
              this.list.push(
                new Array(8).fill({
                  text: '张斌 | 副主任医师',
                  minorText: '擅长：肺结核、肺癌、胸腔积液、慢性咳嗽',
                }),
              );
              if (this.list.length === 8) {
                this.finished = true;
              }
              this.load = false;
            }, 1500);
          }}
        >
          {this.list.map((items: any[], index: number) => {
            return (
              <ul style="position: relative; padding: 0;">
                <List.Subheader sticky>
                  {index * 7 + 1}-{(index + 1) * 8}
                </List.Subheader>
                {items.map((item) => {
                  return (
                    <List.Item
                      button
                      text={item.text}
                      paddingDivider={false}
                      minorText={item.minorText}
                    >
                      <img
                        slot="avatar"
                        style="object-fit: contain;"
                        src="https://raw.githubusercontent.com/jeffwcx/ohu-mobile/master/docs/storybook/src/assets/logo.svg"
                      />
                      <Icon slot="action" type="arrow-right" />
                    </List.Item>
                  );
                })}
              </ul>
            );
          })}
        </List>
      );
    },
  });

export const UseCheckList = () =>
  Vue.extend({
    data() {
      return {
        value: [],
        options: [
          {
            label: '消化内科',
            value: '1',
            attach: {
              name: '小何',
              sex: '女',
            },
          },
          {
            label: '呼吸内科',
            value: '2',
            attach: {
              name: '小何',
              sex: '男',
            },
          },
          {
            label: '神经内科',
            value: '3',
            disabled: true,
          },
        ] as Array<CheckboxOption<{ name: string; sex: string }>>,
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
                return <Icon slot="icon" type="folder" color="#999"></Icon>;
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
                  <div style={{ color: checked ? 'rgb(45, 126, 255)' : '' }}>
                    {option.label}
                  </div>
                );
              },
            }}
          ></CheckList>
          <p>
            <h4>result:</h4>
            {JSON.stringify(this.value)}
          </p>
        </div>
      );
    },
  });

export const UseRadioList = () =>
  Vue.extend({
    data() {
      return {
        value: '医生2',
        options: [
          {
            label: '消化内科',
            value: '1',
          },
          {
            label: '呼吸内科',
            value: '2',
            children: [
              {
                label: '医生1',
                value: '医生1',
              },
              {
                label: '医生2',
                value: '医生2',
              },
              {
                label: '医生3',
                value: '医生3',
              },
            ],
          },
          {
            label: '神经内科',
            value: '3',
            children: [
              {
                label: '医生31',
                value: '医生31',
              },
              {
                label: '医生32',
                value: '医生32',
              },
              {
                label: '医生33',
                value: '医生33',
              },
            ],
          },
        ] as Array<RadioOption>,
      };
    },
    render() {
      return (
        <div>
          <RadioList
            v-model={this.value}
            options={this.options}
            unCheckedIcon={null}
          ></RadioList>
          <p>
            <h4>Result:</h4>
            {JSON.stringify(this.value)}
          </p>
        </div>
      );
    },
  });
