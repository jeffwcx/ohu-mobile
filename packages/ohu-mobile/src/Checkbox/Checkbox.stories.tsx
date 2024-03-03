import Vue from 'vue';
import docs from './README.md?raw';
import Checkbox from './index';
import './style';
import CheckTag from '../CheckTag';
import '../CheckTag/style';
import CheckboxGroup from '../CheckboxGroup';
import '../CheckboxGroup/style';
import '../Button/style';
import Card from '../Card';
import '../Card/style';
import Grid from '../Grid';
import '../Grid/style';
import CheckList from '../CheckList';
import '../CheckList/style';

import {
  CheckboxCircleFilled,
  CheckboxBlankCircleOutlined,
  IndeterminateCircleFilled,
} from '@ohu-mobile/icons';

export default {
  title: 'Components/Form/Checkbox',
  parameters: {
    component: Checkbox,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const Basic = () =>
  Vue.extend({
    data() {
      return {
        basic: false,
      };
    },
    render() {
      return (
        <div class="demo">
          <Card shadow divider>
            <Card.Header>Basic ({JSON.stringify(this.basic)})</Card.Header>
            <Checkbox v-model={this.basic} name="a">
              Basic
            </Checkbox>
          </Card>
          <Card shadow divider>
            <Card.Header>Icon ({JSON.stringify(this.basic)})</Card.Header>
            <Checkbox
              v-model={this.basic}
              checkedIcon={CheckboxCircleFilled}
              unCheckedIcon={CheckboxBlankCircleOutlined}
              indeterminateIcon={IndeterminateCircleFilled}
            >
              Icon
            </Checkbox>
          </Card>
          <Card shadow divider>
            <Card.Header>Color ({JSON.stringify(this.basic)})</Card.Header>
            <Checkbox
              v-model={this.basic}
              name="good"
              color="#36b365"
              unCheckedColor="#36b365"
            >
              Basic
            </Checkbox>
          </Card>
          <Card shadow divider>
            <Card.Header>Disabled</Card.Header>
            <Checkbox v-model={this.basic} disabled name="a">
              Disabled
            </Checkbox>
          </Card>
          <Card shadow divider>
            <Card.Header>
              Indeterminate ({JSON.stringify(this.basic)})
            </Card.Header>
            <Checkbox indeterminate>Indeterminate</Checkbox>
          </Card>
        </div>
      );
    },
  });

export const Group = () =>
  Vue.extend({
    data() {
      return {
        value: ['数学'],
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
            <Card.Header>
              CheckboxGroup({JSON.stringify(this.value)})
            </Card.Header>
            <CheckboxGroup disabled={this.disabled} v-model={this.value}>
              <Checkbox disabled value="思政">
                思政
              </Checkbox>
              <Checkbox disabled value="历史">
                历史
              </Checkbox>
              <Checkbox value="地理">地理</Checkbox>
              <Checkbox value="数学">数学</Checkbox>
            </CheckboxGroup>
          </Card>
          <Card shadow divider>
            <Card.Header>Icon({JSON.stringify(this.value)})</Card.Header>
            <CheckboxGroup
              checkedIcon={CheckboxCircleFilled}
              disabled={this.disabled}
              v-model={this.value}
            >
              <Checkbox value="思政">思政</Checkbox>
              <Checkbox value="历史">历史</Checkbox>
              <Checkbox value="地理">地理</Checkbox>
              <Checkbox value="数学">数学</Checkbox>
            </CheckboxGroup>
          </Card>
          <Card shadow divider>
            <Card.Header>CheckTag ({JSON.stringify(this.value)})</Card.Header>
            <CheckboxGroup
              disabled={this.disabled}
              v-model={this.value}
              name="subject"
            >
              <Grid row>
                <Grid.Item span={6}>
                  <CheckTag value="思政">思政</CheckTag>
                </Grid.Item>
                <Grid.Item span={6}>
                  <CheckTag value="历史">历史</CheckTag>
                </Grid.Item>
                <Grid.Item span={6}>
                  <CheckTag value="地理">地理</CheckTag>
                </Grid.Item>
                <Grid.Item span={6}>
                  <CheckTag value="数学">数学</CheckTag>
                </Grid.Item>
              </Grid>
            </CheckboxGroup>
          </Card>
          <Card shadow divider>
            <Card.Header>Use Options({JSON.stringify(this.value)})</Card.Header>
            <CheckboxGroup
              disabled={this.disabled}
              v-model={this.value}
              options={[
                { label: '思政', value: '思政' },
                { label: '历史', value: '历史' },
                { label: '地理', value: '地理' },
                { label: '数学', value: '数学' },
              ]}
            />
          </Card>
          <Card shadow divider>
            <Card.Header>Max({JSON.stringify(this.value)})</Card.Header>
            <CheckboxGroup
              disabled={this.disabled}
              v-model={this.value}
              max={2}
              options={[
                { label: '思政', value: '思政' },
                { label: '历史', value: '历史' },
                { label: '地理', value: '地理' },
                { label: '数学', value: '数学' },
              ]}
            />
          </Card>
        </div>
      );
    },
  });

export const List = () =>
  Vue.extend({
    data() {
      return {
        value: [],
      };
    },
    render() {
      return (
        <div class="demo">
          <Card shadow divider>
            <Card.Header>
              CheckList Use Options({JSON.stringify(this.value)})
            </Card.Header>
            <CheckList
              v-model={this.value}
              options={[
                { label: '思政', value: '思政' },
                { label: '历史', value: '历史' },
                { label: '地理', value: '地理' },
                { label: '数学', value: '数学' },
              ]}
            />
          </Card>
          <Card shadow divider>
            <Card.Header>
              CheckList Collapse({JSON.stringify(this.value)})
            </Card.Header>
            <CheckList
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
              ]}
            />
          </Card>
        </div>
      );
    },
  });
