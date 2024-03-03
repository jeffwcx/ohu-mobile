import Vue from 'vue';
import docs from './README.md?raw';
import Sticky from './index';
import './style';
import Card from '../Card';
import '../Card/style';
import Toast from '../Toast';
import '../Toast/style';

export default {
  title: 'Components/Utils/Sticky',
  parameters: {
    component: Sticky,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const Top = () =>
  Vue.extend({
    data() {
      return {
        tip1: '',
        tip2: '',
      };
    },
    render() {
      return (
        <div style="padding: 20px;">
          <div style="height: 100vh; position: relative;">
            <Sticky
              onFixed={() => {
                this.tip1 = '我吸住了';
              }}
              onStuck={() => {
                this.tip1 = '我卡住了';
              }}
              onNormal={() => {
                this.tip1 = '我正常了';
              }}
            >
              <Card shadow>这是个卓越的卡片 {this.tip1}</Card>
            </Sticky>
          </div>
          <div style="height: 120vh; position: relative;">
            <Sticky
              onFixed={() => {
                this.tip2 = '我吸住了';
              }}
              onStuck={() => {
                this.tip2 = '我卡住了';
              }}
              onNormal={() => {
                this.tip2 = '我正常了';
              }}
            >
              <Card shadow>这是个卓越的卡片 {this.tip2}</Card>
            </Sticky>
          </div>
        </div>
      );
    },
  });

export const Bottom = () =>
  Vue.extend({
    render() {
      return (
        <div style="height: 200vh;">
          <div style="height: position: relative; height: 80vh;"></div>
          <div style="height: position: relative; height: 200vh;">
            <div style="height: 50vh;"></div>
            <Sticky
              onFixed={() => Toast.info('我被吸住了')}
              onNormal={() => Toast.info('我正常了')}
              onStuck={() => Toast.info('我卡住了')}
              bottom={50}
            >
              <Card shadow>我位于底部</Card>
            </Sticky>
          </div>
        </div>
      );
    },
  });
