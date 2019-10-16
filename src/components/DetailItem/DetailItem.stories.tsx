import mdx from './DetailItem.mdx';
import DetailItem from '.';
import Card from '../Card';
import Button from '../Button';


export default {
  title: '🧩Components|DataDisplay/DetailItem',
  parameters: {
    component: DetailItem,
    docs: {
      page: mdx,
    },
  },
};


export const basic = () => ({
  render() {
    return (
      <div style="background: #F5F5F5; padding: 8px;">
        <Card shadow>
          <DetailItem title="预约医生" content="芬兰 副主任医生"></DetailItem>
          <DetailItem title="就诊科室" content="呼吸内科"><Button type="link" size="sm">呼吸内科</Button></DetailItem>
          <DetailItem title="预估就诊时间" content="14:50:00 - 15:00:00" extra="实际就诊时间已医院为准"></DetailItem>
        </Card>
      </div>
    );
  },
});

export const unactive = () => ({
  render() {
    return (
      <div style="background: #F5F5F5; padding: 8px;">
        <Card shadow>
          <DetailItem title="预约医生" content="芬兰 副主任医生" unactive></DetailItem>
          <DetailItem title="就诊科室" content="呼吸内科" unactive></DetailItem>
          <DetailItem title="预估就诊时间" content="14:50:00 - 15:00:00" extra="实际就诊时间已医院为准" unactive></DetailItem>
        </Card>
      </div>
    );
  }
});
