import Tag from '.';
import docs from './README.md';

export default {
  title: 'Components|Basic/Tag',
  parameters: {
    component: Tag,
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
        <Tag type="warning">标签</Tag>
      </div>
    );
  },
});

export const size = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Tag type="gradient" size="md" shape="fillet">直播中</Tag>
      </div>
    );
  },
});

export const colorful = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Tag color="white" fillColor="linear-gradient(225deg,rgba(219,180,110,1) 0%,rgba(206,171,114,1) 100%)" size="md">color</Tag>
        <Tag color="white" fillColor="red" size="md">color</Tag>
      </div>
    );
  },
});
