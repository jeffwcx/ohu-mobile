import Card from '@/Card';
import '@/Card/style';
import Button from '@/Button';
import '@/Button/style';
import DetailItem from '@/DetailItem';
import '@/DetailItem/style';
import docs from '@/Card/README.md';

export default {
  title: 'Components|DataDisplay/Card',
  parameters: {
    component: Card,
    options: {
      showPanel: true,
    },
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
          <Card.Header extra="extra">title</Card.Header>
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
          <Card.Header extra="已取消">订单状态</Card.Header>
          <DetailItem title="预约医生" content="芬兰 副主任医生" unactive></DetailItem>
        </Card>
        <Card divider style="margin-bottom: 10px;">
          <Card.Header status="error" extra="未支付">订单状态</Card.Header>
          <DetailItem title="预约医生" content="芬兰 副主任医生" unactive></DetailItem>
        </Card>
        <Card divider style="margin-bottom: 10px;">
          <Card.Header status="success" extra="已支付">订单状态</Card.Header>
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
          <Card.Header status="success" bold>
            常用工具
            <Button type="link" slot="extra" size="sm">更多 > </Button>
          </Card.Header>
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
          <Card.Header status="success" extra="已支付">订单状态</Card.Header>
          <DetailItem title="预约医生" content="芬兰 副主任医生" unactive></DetailItem>
        </Card>
      </div>
    );
  }
});
