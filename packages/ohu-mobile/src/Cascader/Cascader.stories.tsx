import Vue from 'vue';

import Cascader from './index';
import './style';

export default {
  title: 'Components/Form/Cascader',
  parameters: {
    component: Cascader,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () =>
  Vue.extend({
    render() {
      return (
        <Cascader
          style="height: 80vh"
          value={['北京', '法学']}
          options={[
            {
              label: '安徽',
              value: '安徽',
              children: [
                { label: '全部辖区', value: '*' },
                { label: '安庆', value: '安庆' },
                { label: '蚌埠', value: '蚌埠' },
                { label: '巢湖', value: '巢湖' },
                { label: '池州', value: '池州' },
                { label: '滁州', value: '滁州' },
                { label: '凤阳', value: '凤阳' },
                { label: '阜阳', value: '阜阳' },
                { label: '合肥', value: '合肥' },
                { label: '淮北', value: '淮北' },
                { label: '淮南', value: '淮南' },
              ],
            },
            {
              label: '北京',
              value: '北京',
              children: [
                { label: '全部辖区', value: '*' },
                {
                  label: '法学类',
                  value: '#',
                  useCollapse: true,
                  children: [
                    { label: '法学', value: '法学' },
                    { label: '国际经贸规则', value: '国际经贸规则' },
                    { label: '监狱学', value: '监狱学' },
                    { label: '知识产权', value: '知识产权' },
                  ],
                },
                {
                  label: '朝阳区',
                  value: '朝阳区',
                },
              ],
            },
          ]}
        ></Cascader>
      );
    },
  });
