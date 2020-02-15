import Collapse from '@/Collapse';
import '@/Collapse/style';
import List from '@/List';
import '@/List/style';
import Button from '@/Button';
import '@/Button/style';
import Vue from 'vue';
import docs from '@/Collapse/README.md';

export default {
  title: 'Components|DataDisplay/Collapse',
  parameters: {
    component: Collapse,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  data() {
    return {
      active: [1],
    };
  },
  render() {
    return (
      <Collapse v-model={this.active}>
        <Button type="primary" size="md" onClick={() => {
          this.active = [2];
        }}>设置为拱墅区</Button>
        <Collapse.Item title="滨江区" key={1} hasList>
          <List>
            <List.Item paddingDivider={false}>浙江省杭州第二中学</List.Item>
            <List.Item paddingDivider={false}>杭州市长河高级中学</List.Item>
            <List.Item paddingDivider={false}>杭州市旅游职业学校</List.Item>
            <List.Item paddingDivider={false}>杭州市旅游职业学校</List.Item>
            <List.Item paddingDivider={false}>杭州市旅游职业学校</List.Item>
            <List.Item paddingDivider={false}>杭州市旅游职业学校</List.Item>
            <List.Item paddingDivider={false}>杭州市旅游职业学校</List.Item>
            <List.Item paddingDivider={false}>杭州市旅游职业学校</List.Item>
          </List>
        </Collapse.Item>
        <Collapse.Item title="拱墅区" key={2}>
          sdfsdfsdfwegteetbsdfasdgertgasdtghsfdEFGTADVAEGSGBADAD
        </Collapse.Item>
        <Collapse.Item title="错误" key={3} disabled>
          被禁止的内容
        </Collapse.Item>
      </Collapse>
    );
  },
});

export const accordion = () => Vue.extend({
  render() {
    return (
      <Collapse accordion expandIconPosition="left">
        <Collapse.Item title="滨江区" key={1}>
          <div slot="title">滨江区</div>
          <div>
          浙江大学医学院附属第二医院（简称“浙大二院”）创建于1869年，曾创办国内最早的西医院校之一——广济医校
          </div>
        </Collapse.Item>
        <Collapse.Item title="拱墅区" key={2}>
          sdfsdfsdfwegteetbsdfasdgertgasdtghsfdEFGTADVAEGSGBADAD
        </Collapse.Item>
        <Collapse.Item title="不知道什么去" key={3}>
          sdfsdfsdfwegteetbsdfasdgertgasdtghsfdEFGTADVAEGSGBADAD
        </Collapse.Item>
      </Collapse>
    );
  },
});
