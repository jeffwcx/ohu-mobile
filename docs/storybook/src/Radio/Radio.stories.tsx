import Vue from 'vue';
import docs from '@/Radio/README.md';
import Radio from '@/Radio';
import '@/Radio/style';
import Checkbox from '@/Checkbox';
import '@/Checkbox/style';
import RadioTag from '@/RadioTag';
import '@/RadioTag/style';
import RadioGroup from '@/RadioGroup';
import Card from '@/Card';
import '@/Card/style';
import Grid from '@/Grid';
import '@/Grid/style';
import RadioList from '@/RadioList';
import '@/RadioList/style';
import { CheckFilled, CheckboxOutlined, CheckboxBlankOutlined } from '~/icons/index';



export default {
  title: 'Components|Form/Radio',
  parameters: {
    component: Radio,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};


export const basic = () => Vue.extend({
  data() {
    return {
      basic: false,
    };
  },
  render() {
    return (
      <div class="demo">
        <Card shadow divider>
          <Card.Header>Basic ({ JSON.stringify(this.basic) })</Card.Header>
          <Radio v-model={this.basic} name="a">Basic</Radio>
        </Card>
        <Card shadow divider>
          <Card.Header>Icon ({ JSON.stringify(this.basic) })</Card.Header>
          <Radio
            v-model={this.basic}
            checkedIcon={CheckFilled}
            unCheckedIcon={null}>Icon</Radio>
        </Card>
        <Card shadow divider>
          <Card.Header>Color ({ JSON.stringify(this.basic) })</Card.Header>
          <Radio v-model={this.basic} name="good" color="#36b365" unCheckedColor="#36b365">Basic</Radio>
        </Card>
        <Card shadow divider>
          <Card.Header>Disabled</Card.Header>
          <Radio v-model={this.basic} disabled name="a">Disabled</Radio>
        </Card>

      </div>
    );
  },
});


export const group = () => Vue.extend({
  data() {
    return {
      value: '数学',
      disabled: false,
    };
  },
  render() {
    return (
      <div class="demo">
        <Card shadow>
          <Checkbox v-model={this.disabled}>Group Disabled</Checkbox>
        </Card>
        <Card shadow divider>
          <Card.Header>RadioGroup({ JSON.stringify(this.value) })</Card.Header>
          <RadioGroup disabled={this.disabled} v-model={this.value}>
            <Radio value="思政">思政</Radio>
            <Radio value="历史">历史</Radio>
            <Radio value="地理">地理</Radio>
            <Radio value="数学">数学</Radio>
          </RadioGroup>
        </Card>
        <Card shadow divider>
          <Card.Header>RadioGroup Icon({ JSON.stringify(this.value) })</Card.Header>
          <RadioGroup checkedIcon={CheckboxOutlined} unCheckedIcon={CheckboxBlankOutlined} disabled={this.disabled} v-model={this.value}>
            <Radio disabled value="思政">思政</Radio>
            <Radio value="历史">历史</Radio>
            <Radio value="地理">地理</Radio>
            <Radio value="数学">数学</Radio>
          </RadioGroup>
        </Card>
        <Card shadow divider>
          <Card.Header>RadioTag ({ JSON.stringify(this.value) })</Card.Header>
          <RadioGroup disabled={this.disabled} v-model={this.value} name="subject">
            <Grid row>
              <Grid.Item span={3}>
                <Grid x="center">
                  <RadioTag value="思政">思政</RadioTag>
                </Grid>
              </Grid.Item>
              <Grid.Item span={3}>
                <Grid x="center">
                  <RadioTag value="历史">历史</RadioTag>
                </Grid>
              </Grid.Item>
              <Grid.Item span={3}>
                <Grid x="center">
                  <RadioTag value="地理">地理</RadioTag>
                </Grid>
              </Grid.Item>
              <Grid.Item span={3}>
                <Grid x="center">
                  <RadioTag value="数学">数学</RadioTag>
                </Grid>
              </Grid.Item>
            </Grid>
          </RadioGroup>
        </Card>
        <Card shadow divider>
          <Card.Header>Use Options({ JSON.stringify(this.value) })</Card.Header>
          <RadioGroup
            disabled={this.disabled}
            v-model={this.value}
            options={[
              { label: '思政', value: '思政' },
              { label: '历史', value: '历史' },
              { label: '地理', value: '地理' },
              { label: '数学', value: '数学' },
            ]} />
        </Card>
      </div>
    );
  },
});


export const list = () => Vue.extend({
  data() {
    return {
      value: '思政',
    };
  },
  render() {
    return (
      <div class="demo">
        <Card shadow divider>
          <Card.Header>CheckList Use Options({ JSON.stringify(this.value) })</Card.Header>
          <RadioList
            v-model={this.value}
            options={[
              { label: '思政', value: '思政' },
              { label: '历史', value: '历史' },
              { label: '地理', value: '地理' },
              { label: '数学', value: '数学' },
            ]} />
        </Card>
        <Card shadow divider>
          <Card.Header>CheckList Collapse({ JSON.stringify(this.value) })</Card.Header>
          <RadioList
            v-model={this.value}
            options={[
              { label: '思政', value: '思政' },
              {
                label: '历史',
                value: '历史',
                children: [
                  { label: '中国史', value: '中国史' },
                  { label: '世界史', value: '世界史' },
                  { label: '地球史', value: '地球史' },
                ],
              },
              { label: '地理', value: '地理' },
              { label: '数学', value: '数学' },
            ]} />
        </Card>
      </div>
    );
  },
});
