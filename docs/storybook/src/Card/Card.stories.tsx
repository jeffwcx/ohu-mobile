import Card, { CardHeader } from '.';
import Button from '../Button';
import DetailItem from '../DetailItem';
import docs from './README.md';

export default {
  title: 'Components|DataDisplay/Card',
  parameters: {
    component: Card,
    notes: { markdown: docs }
  },
};

export const basic = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card style="margin-bottom: 10px;">
          simple card
        </Card>
      </div>
    );
  }
});

export const withHeader = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider>
          <CardHeader extra="extra">title</CardHeader>
          simple content
        </Card>
      </div>
    );
  },
});

export const headerStatus = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider style="margin-bottom: 10px;">
          <CardHeader extra="已取消">订单状态</CardHeader>
          <DetailItem title="预约医生" content="芬兰 副主任医生" unactive></DetailItem>
        </Card>
        <Card divider style="margin-bottom: 10px;">
          <CardHeader status="error" extra="未支付">订单状态</CardHeader>
          <DetailItem title="预约医生" content="芬兰 副主任医生" unactive></DetailItem>
        </Card>
        <Card divider style="margin-bottom: 10px;">
          <CardHeader status="success" extra="已支付">订单状态</CardHeader>
          <DetailItem title="预约医生" content="芬兰 副主任医生" unactive></DetailItem>
        </Card>
      </div>
    );
  },
});

export const boldHeader = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider style="margin-bottom: 10px;" borderless>
          <CardHeader status="success" bold>
            常用工具
            <Button type="link" slot="extra" size="sm">更多 > </Button>
          </CardHeader>
          这就是内容部分了。
        </Card>
      </div>
    );
  }
});

export const withShadow = () => ({
  render() {
    return (
      <div style="padding: 10px; background: #F5F5F5;">
        <Card divider style="margin-bottom: 10px;" shadow>
          <CardHeader status="success" extra="已支付">订单状态</CardHeader>
          <DetailItem title="预约医生" content="芬兰 副主任医生" unactive></DetailItem>
        </Card>
      </div>
    );
  }
});
