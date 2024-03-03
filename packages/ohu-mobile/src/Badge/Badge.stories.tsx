import Vue from 'vue';

import Badge from './index';
import './style';
import Card from '../Card';
import '../Card/style';
import Icon from '../Icon';
import '../Icon/style';
import { UserOutlined, HomeOutlined } from '@ohu-mobile/icons';

export default {
  title: 'Components/Basic/Badge',
  parameters: {
    component: Badge,
    options: {
      showPanel: true,
    },
  },
};

export const Position = () =>
  Vue.extend({
    render() {
      const container = (
        <div style="width: 200px;height: 80px;border: 1px solid #eee;"></div>
      );
      return (
        <div>
          <Badge
            type="corner"
            color="gold"
            text="推荐"
            style="border-radius: 6px;"
          >
            {container}
          </Badge>
          <Badge type="corner" color="blue" position="up-left" text="听诊">
            {container}
          </Badge>
          <Badge type="corner" color="red" position="down-left" text="已满">
            {container}
          </Badge>
          <Badge
            type="corner"
            position="down-right"
            text="已满"
            fontColor="yellow"
            color="red"
          >
            {container}
          </Badge>
        </div>
      );
    },
  });

export const Basic = () =>
  Vue.extend({
    render() {
      return (
        <div style="padding: 10px;">
          <Card shadow>
            <Badge type="tag" text="New"></Badge>
          </Card>
          <Card shadow>
            <Card.Header>Tag</Card.Header>
            <Badge
              type="tag"
              color="orange"
              text="1"
              style="margin-right: 30px;"
            >
              <div style="width: 40px; height: 40px; background: #eee;"></div>
            </Badge>
            <Badge
              type="tag"
              text={999}
              style="font-size: 24px; margin-right: 30px;"
            >
              <Icon type={UserOutlined}></Icon>
            </Badge>
            <Badge type="tag" color="blue" text={999} style="font-size: 24px;">
              <Icon type={HomeOutlined}></Icon>
            </Badge>
          </Card>
          <Card shadow>
            <Card.Header>Dot</Card.Header>
            <Badge type="dot" color="red">
              <div style="width: 40px; height: 40px; background: #eee;"></div>
            </Badge>
          </Card>
          <Card shadow>
            <Card.Header>Corner</Card.Header>
            <Badge type="corner" color="primary" text="New">
              <div style="width: 100px; height: 80px; background: #eee;"></div>
            </Badge>
            <br />
            <Badge type="corner" color="red" text="New">
              <div style="width: 100px; height: 80px; background: #eee;"></div>
            </Badge>
            <br />
            <Badge type="corner" color="gold" text="New">
              <div style="width: 100px; height: 80px; background: #eee;"></div>
            </Badge>
            <br />
            <Badge type="corner" color="grey" text="New">
              <div style="width: 100px; height: 80px; background: #eee;"></div>
            </Badge>
            <br />
            <Badge type="corner" color="orange" text="New">
              <div style="width: 100px; height: 80px; background: #eee;"></div>
            </Badge>
          </Card>
        </div>
      );
    },
  });
