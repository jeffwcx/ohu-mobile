import Divider from '.';
import docs from './README.md';



export default {
  title: '🧩Components|DataDisplay/Divider',
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

