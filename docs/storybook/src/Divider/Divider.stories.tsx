import docs from '@/Divider/README.md';
import Divider from '@/Divider';
import '@/Divider/style';


export default {
  title: 'Components|DataDisplay/Divider',
  parameters: {
    component: Divider,
    notes: { markdown: docs }
  },
};

export const basic = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider></Divider>
      </div>
    );
  },
});


export const withText = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider text="hairline with text"></Divider>
      </div>
    );
  }
});

export const color = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider color="#ff9434"></Divider>
      </div>
    );
  }
});

export const selfDefined = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider style="border-color: #2d7eff; border-style: dashed;"></Divider>
      </div>
    );
  }
});

export const vertical = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider vertical style="height: 100px;"></Divider>
      </div>
    );
  },
});

