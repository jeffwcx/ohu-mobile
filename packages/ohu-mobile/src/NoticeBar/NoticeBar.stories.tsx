import Vue from 'vue';

import NoticeBar from './index';
import './style';
import Card from '../Card';
import '../Card/style';
import Icon from '../Icon';
import '../Icon/style';
import Button from '../Button';
import '../Button/style';
import VueRouter from 'vue-router';
import { VolumeDownOutlined, LockFilled } from '@ohu-mobile/icons';

export default {
  title: 'Components/FeedBack/NoticeBar',
  parameters: {
    component: NoticeBar,
    options: {
      showPanel: true,
    },
  },
};

Vue.use(VueRouter);

const A = Vue.extend({
  render() {
    return (
      <div>
        <NoticeBar
          scrollable
          offset="50%"
          icon={VolumeDownOutlined}
          action="link"
        >
          初次使用，您有15分钟体验时间。For the first time, you have 15 minutes
          to experience.
        </NoticeBar>
        <Button type="primary" to="/b">
          打开B
        </Button>
      </div>
    );
  },
});

const B = Vue.extend({
  render() {
    return (
      <div class="demo">
        <Button type="primary" to="/a">
          打开A
        </Button>
      </div>
    );
  },
});

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/a', component: A, alias: '/' },
    { path: '/b', component: B },
  ],
});

export const Basic = () =>
  Vue.extend({
    router,
    render() {
      return (
        <div>
          <Card divider shadow>
            <Card.Header>Basic</Card.Header>
            <NoticeBar>初次使用，您有15分钟体验时间</NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>icon</Card.Header>
            <NoticeBar icon={VolumeDownOutlined} speed={30}>
              初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间,
              初次使用，您有15分钟体验时间
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>closable</Card.Header>
            <NoticeBar icon={VolumeDownOutlined} delay={2000} action="closable">
              初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间,
              初次使用，您有15分钟体验时间
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>scrollable</Card.Header>
            <NoticeBar scrollable icon={VolumeDownOutlined} action="link">
              初次使用，您有15分钟体验时间。For the first time, you have 15
              minutes to experience.
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>offset 67%</Card.Header>
            <NoticeBar offset="67%" icon={VolumeDownOutlined} action="link">
              初次使用，您有15分钟体验时间。For the first time, you have 15
              minutes to experience.
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>offset 50% scrollable</Card.Header>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </Card>
          <Card divider shadow>
            <Card.Header>multiline</Card.Header>
            <NoticeBar icon={VolumeDownOutlined} action="closable" multiline>
              longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>link</Card.Header>
            <NoticeBar icon={VolumeDownOutlined} action="link">
              初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间,
              初次使用，您有15分钟体验时间
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>slot: icon</Card.Header>
            <NoticeBar icon={VolumeDownOutlined} action="link">
              <Icon type={LockFilled} slot="icon" color="red" />
              初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间,
              初次使用，您有15分钟体验时间
            </NoticeBar>
          </Card>
        </div>
      );
    },
  });

export const Warning = () =>
  Vue.extend({
    render() {
      return (
        <div>
          <Card divider shadow>
            <Card.Header>Basic</Card.Header>
            <NoticeBar type="warning">初次使用，您有15分钟体验时间</NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>icon</Card.Header>
            <NoticeBar type="warning" icon={VolumeDownOutlined}>
              初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间,
              初次使用，您有15分钟体验时间
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>closable</Card.Header>
            <NoticeBar
              type="warning"
              icon={VolumeDownOutlined}
              action="closable"
            >
              初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间,
              初次使用，您有15分钟体验时间
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>multiline</Card.Header>
            <NoticeBar
              type="warning"
              icon={VolumeDownOutlined}
              action="closable"
              multiline
            >
              初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间,
              初次使用，您有15分钟体验时间
            </NoticeBar>
          </Card>
          <Card divider shadow>
            <Card.Header>link</Card.Header>
            <NoticeBar type="warning" icon={VolumeDownOutlined} action="link">
              初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间,
              初次使用，您有15分钟体验时间
            </NoticeBar>
          </Card>
        </div>
      );
    },
  });
