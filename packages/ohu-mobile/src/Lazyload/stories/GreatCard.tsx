import { componentFactoryOf } from 'vue-tsx-support';
import Card from '../../Card';
import '../../Card/style';
import List from '../../List';
import '../../List/style';

export default componentFactoryOf().create({
  data() {
    return {
      list: [
        {
          text: '门诊体检套餐1',
          minorText: '本套餐主要针对心、肝、胆、胃…',
          img: 'http://photocdn.sohu.com/20161221/vrsa_hor9271114.jpg',
        },
        {
          text: '门诊体检套餐2',
          minorText: '本套餐主要针对心、肝、胆、胃…',
          img: 'http://photocdn.sohu.com/20161221/vrsa_hor9271114.jpg',
        },
        {
          text: '门诊体检套餐3',
          minorText: '本套餐主要针对心、肝、胆、胃、甲…',
          img: 'http://photocdn.sohu.com/20161221/vrsa_hor9271114.jpg',
        },
      ],
    };
  },
  render() {
    return (
      <Card>
        <Card.Header bold>医直播</Card.Header>
        <List>
          {this.list.map((item: any) => {
            return (
              <List.Item button text={item.text} minorText={item.minorText}>
                <img
                  slot="thumb"
                  style="object-fit: contain; width: 120px;"
                  src={item.img}
                />
              </List.Item>
            );
          })}
        </List>
      </Card>
    );
  },
});
