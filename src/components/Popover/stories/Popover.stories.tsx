import Popover from '..';
import Vue from 'vue';
import docs from '../README.md';
import Button from '../../Button';
import Icon from '../../Icon';

export default {
  title: 'Components|FeedBack/Popover',
  parameters: {
    component: Popover,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <div style="height: 1600px; display: flex; flex-flow: column nowrap; justify-content: space-around; align-items: center;">
        <Popover position="left">
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>

        <Popover position="right">
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>
        <Popover position="top">
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>

        <Popover position="bottom">
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>
        <Popover position={{ vertical: 'top', horizontal: 'left' }}>
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>
        <Popover position={{ vertical: 'top', horizontal: 'right' }}>
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>
        <Popover position={{ vertical: 'bottom', horizontal: 'left' }}>
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>
        <Popover position={{ vertical: 'bottom', horizontal: 'right' }}>
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>
        <Popover position={{ vertical: 'top', horizontal: 'left' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>
        <Popover position={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
          <template slot="content">
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item1</div>
            <div style="height: 40px; line-height: 40px; padding: 0 10px;"><Icon type="message"></Icon> Item2</div>
          </template>
          <Button icon="menu-f" inline size="md" type="primary"></Button>
        </Popover>
      </div>
    );
  },
});
