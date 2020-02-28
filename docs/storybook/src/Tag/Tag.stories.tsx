import Vue from 'vue';
import docs from '@/Tag/README.md';
import Tag from '@/Tag';
import '@/Tag/style';
import Card from '@/Card';
import Toast from '@/Toast';
import '@/Card/style';
import '@/Toast/style';
import './style.scss';

export default {
  title: 'Components|Basic/Tag',
  parameters: {
    component: Tag,
    options: {
      showPanel: true,
    },
    notes: {
      markdown: docs,
    },
  },
};


export const basic = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Tag>标签</Tag>
        <Tag color="orange">标签</Tag>
      </div>
    );
  },
});

export const size = () => Vue.extend({
  render() {
    return (
      <div class="margin-tags" style="padding: 10px;">
        <Card shadow divider>
          <Card.Header>sm</Card.Header>
          <Tag size="sm">sm</Tag>
          <Tag size="sm" color="primary">sm blue</Tag>
          <Tag size="sm" color="orange">sm orange</Tag>
          <Tag size="sm" color="red">sm red</Tag>
          <Tag size="sm" color="green">sm green</Tag>
          <br />
          <Tag size="sm" outline>sm outline</Tag>
          <Tag size="sm" color="primary" outline>sm outline</Tag>
          <Tag size="sm" color="orange" outline>sm outline</Tag>
          <Tag size="sm" color="red" outline>sm outline</Tag>
          <Tag size="sm" color="green" outline>sm outline</Tag>
          <br/>
          <Tag size="sm" deleteable>sm deleteable</Tag>
          <Tag size="sm" deleteable outline>sm deleteable</Tag>
        </Card>
        <Card shadow divider>
          <Card.Header>md</Card.Header>
          <Tag size="md">md</Tag>
          <Tag size="md" color="primary">md primary</Tag>
          <Tag size="md" color="orange">md orange</Tag>
          <Tag size="md" color="red">md red</Tag>
          <Tag size="md" color="green">md green</Tag>
          <br />
          <Tag size="md" outline>md outline</Tag>
          <Tag size="md" color="primary" outline>md outline</Tag>
          <Tag size="md" color="orange" outline>md outline</Tag>
          <Tag size="md" color="red" outline>md outline</Tag>
          <Tag size="md" color="green" outline>md outline</Tag>
          <br/>
          <Tag size="md" deleteable onClick={(e: Event) => {
            Toast.info('delete md');
          }}>md deleteable</Tag>
          <Tag size="md" outline deleteable onClick={(e: Event) => {
            Toast.info('delete md');
          }}>md deleteable</Tag>
        </Card>
        <Card shadow divider>
          <Card.Header>lg</Card.Header>
          <Tag size="lg">lg</Tag>
          <Tag size="lg" color="primary">lg primary</Tag>
          <Tag size="lg" color="orange">lg orange</Tag>
          <Tag size="lg" color="red">lg orange</Tag>
          <Tag size="lg" color="green">lg orange</Tag>
          <br/>
          <Tag size="lg" outline>lg outline</Tag>
          <Tag size="lg" color="primary" outline>lg outline</Tag>
          <Tag size="lg" color="orange" outline>lg outline</Tag>
          <Tag size="lg" color="red" outline>lg outline</Tag>
          <Tag size="lg" color="green" outline>lg outline</Tag>
          <br/>
          <Tag size="lg" deleteable>lg deleteable</Tag>
          <Tag size="lg" color="green" outline deleteable>lg outline</Tag>
        </Card>
      </div>
    );
  },
});

export const colorful = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Tag color="linear-gradient(225deg,rgba(219,180,110,1) 0%,rgba(206,171,114,1) 100%)" fontColor="white" size="md">color</Tag>
        <Tag color="red" fontColor="white" size="md">color</Tag>
      </div>
    );
  },
});
