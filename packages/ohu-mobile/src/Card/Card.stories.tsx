import Card from './index';
import './style';
import Button from '../Button';
import '../Button/style';
import DetailItem from '../DetailItem';
import '../DetailItem/style';
import docs from './README.md?raw';

export default {
  title: 'Components/DataDisplay/Card',
  parameters: {
    component: Card,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const Basic = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card style="margin-bottom: 10px;">simple card</Card>
      </div>
    );
  },
});

export const WithHeader = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider>
          <Card.Header extra="extra">title</Card.Header>
          simple content
        </Card>
      </div>
    );
  },
});

export const HeaderStatus = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider style="margin-bottom: 10px;">
          <Card.Header extra="已取消">订单状态</Card.Header>
          <DetailItem
            title="预约医生"
            content="芬兰 副主任医生"
            unactive
          ></DetailItem>
        </Card>
        <Card divider style="margin-bottom: 10px;">
          <Card.Header status="error" extra="未支付">
            订单状态
          </Card.Header>
          <DetailItem
            title="预约医生"
            content="芬兰 副主任医生"
            unactive
          ></DetailItem>
        </Card>
        <Card divider style="margin-bottom: 10px;">
          <Card.Header status="success" extra="已支付">
            订单状态
          </Card.Header>
          <DetailItem
            title="预约医生"
            content="芬兰 副主任医生"
            unactive
          ></DetailItem>
        </Card>
      </div>
    );
  },
});

export const BoldHeader = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider style="margin-bottom: 10px;" borderless>
          <Card.Header status="success" bold>
            常用工具
            <Button link slot="extra" size="sm">
              更多&gt;{' '}
            </Button>
          </Card.Header>
          这就是内容部分了。
        </Card>
      </div>
    );
  },
});

export const WithShadow = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider style="margin-bottom: 10px;" shadow>
          <Card.Header status="success" extra="已支付">
            订单状态
          </Card.Header>
          <DetailItem
            title="预约医生"
            content="芬兰 副主任医生"
            unactive
          ></DetailItem>
        </Card>
      </div>
    );
  },
});

export const NoPadding = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider style="margin-bottom: 10px;" shadow padding={false}>
          <Card.Header status="success" extra="已支付">
            订单状态
          </Card.Header>
          you see
        </Card>
      </div>
    );
  },
});
