import Divider from './index';
import './style';

export default {
  title: 'Components/DataDisplay/Divider',
  parameters: {
    component: Divider,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider></Divider>
      </div>
    );
  },
});

export const WithText = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider text="hairline with text"></Divider>
      </div>
    );
  },
});

export const Color = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider color="#ff9434"></Divider>
      </div>
    );
  },
});

export const SelfDefined = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider style="border-color: #2d7eff; border-style: dashed;"></Divider>
      </div>
    );
  },
});

export const Vertical = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Divider vertical style="height: 100px;"></Divider>
      </div>
    );
  },
});
