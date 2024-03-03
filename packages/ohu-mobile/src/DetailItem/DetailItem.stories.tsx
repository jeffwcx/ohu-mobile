import DetailItem from './index';
import './style';
import Card from '../Card';
import '../Card/style';
import Button from '../Button';
import '../Button/style';

export default {
  title: 'Components/DataDisplay/DetailItem',
  parameters: {
    component: DetailItem,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () => ({
  render() {
    return (
      <div style="background: #F5F5F5; padding: 8px;">
        <Card shadow>
          <DetailItem title="预约医生" content="芬兰 副主任医生"></DetailItem>
          <DetailItem title="就诊科室" content="呼吸内科">
            <Button type="link" size="sm">
              呼吸内科
            </Button>
          </DetailItem>
          <DetailItem
            title="预估就诊时间"
            content="14:50:00 - 15:00:00"
            extra="实际就诊时间已医院为准"
          ></DetailItem>
        </Card>
      </div>
    );
  },
});

export const Unactive = () => ({
  render() {
    return (
      <div style="background: #F5F5F5; padding: 8px;">
        <Card shadow>
          <DetailItem
            title="预约医生"
            content="芬兰 副主任医生"
            unactive
          ></DetailItem>
          <DetailItem title="就诊科室" content="呼吸内科" unactive></DetailItem>
          <DetailItem
            title="预估就诊时间"
            content="14:50:00 - 15:00:00"
            extra="实际就诊时间已医院为准"
            unactive
          ></DetailItem>
        </Card>
      </div>
    );
  },
});
