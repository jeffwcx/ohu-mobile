import Vue from 'vue';
import docs from '@/NoticeBar/README.md';
import NoticeBar from '@/NoticeBar';
import '@/NoticeBar/style';
import Card from '@/Card';
import '@/Card/style';
import Icon from '@/Icon';
import '@/Icon/style';
import { VolumeDownOutlined, LockFilled } from '~/icons/index';

export default {
  title: 'Components|FeedBack/NoticeBar',
  parameters: {
    component: NoticeBar,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <div>
        <Card divider shadow>
          <Card.Header>Basic</Card.Header>
          <NoticeBar>初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>icon</Card.Header>
          <NoticeBar icon={VolumeDownOutlined} speed={30}>初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>closable</Card.Header>
          <NoticeBar icon={VolumeDownOutlined} delay={2000} action="closable">初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>scrollable</Card.Header>
          <NoticeBar scrollable icon={VolumeDownOutlined} action="link">初次使用，您有15分钟体验时间。For the first time, you have 15 minutes to experience.</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>offset 67%</Card.Header>
          <NoticeBar offset="67%" icon={VolumeDownOutlined} action="link">初次使用，您有15分钟体验时间。For the first time, you have 15 minutes to experience.</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>offset 50% scrollable</Card.Header>
          <NoticeBar scrollable offset="50%" icon={VolumeDownOutlined} action="link">初次使用，您有15分钟体验时间。For the first time, you have 15 minutes to experience.</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>multiline</Card.Header>
          <NoticeBar icon={VolumeDownOutlined} action="closable" multiline>longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>link</Card.Header>
          <NoticeBar icon={VolumeDownOutlined} action="link">初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>slot: icon</Card.Header>
          <NoticeBar icon={VolumeDownOutlined} action="link">
            <Icon type={LockFilled} slot="icon" color="red" />
            初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间
          </NoticeBar>
        </Card>
      </div>
    );
  },
});

export const warning = () => Vue.extend({
  render() {
    return (
      <div>
        <Card divider shadow>
          <Card.Header>Basic</Card.Header>
          <NoticeBar type="warning">初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>icon</Card.Header>
          <NoticeBar type="warning" icon={VolumeDownOutlined}>初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>closable</Card.Header>
          <NoticeBar type="warning" icon={VolumeDownOutlined} action="closable">初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>multiline</Card.Header>
          <NoticeBar type="warning" icon={VolumeDownOutlined} action="closable" multiline>初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
        <Card divider shadow>
          <Card.Header>link</Card.Header>
          <NoticeBar type="warning" icon={VolumeDownOutlined} action="link">初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间, 初次使用，您有15分钟体验时间</NoticeBar>
        </Card>
      </div>
    );
  },
});
