import Vue from 'vue';
import docs from '@/Tabbar/README.md';
import Tabbar from '@/Tabbar';
import '@/Tabbar/style';
import Button from '@/Button';
import '@/Button/style';
import Icon from '@/Icon';
import '@/Icon/style';
import Card from '@/Card';
import '@/Card/style';
import { UserSmileOutlined, MailOutlined, PieChartOutlined, StarFilled, FireFilled, RocketFilled } from '~/icons/index';

export default {
  title: 'Components|Navigation/Tabbar',
  parameters: {
    component: Tabbar,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const basic = () => Vue.extend({
  data() {
    return {
      active: 2,
    } as { active: string | number };
  },
  methods: {
    onChange(key: number | string) {
      this.active = key;
    },
    setActive() {
      this.active = 0;
    },
  },
  render() {
    const style: Partial<CSSStyleDeclaration> = {
      width: '100%',
    };
    if (this.active === 0) {
      style.boxShadow = '0px 0px 20px 0px rgba(47,131,255,0.14)';
    }
    return (
      <div style="background: #fff;">
        <p style="text-align: center;">
          <p>index: {this.active}</p>
          <Button size="md" inline type="primary" onClick={this.setActive}>go to index 0</Button>
        </p>
        <Tabbar value={this.active} onInput={this.onChange}>
          <Tabbar.Item iconAreaSize="lg">
            <img slot="icon" style={style} src={require('../assets/logo.svg')} />
          </Tabbar.Item>
          <Tabbar.Item textSize="xsm" icon={MailOutlined}>邮箱</Tabbar.Item>
          <Tabbar.Item textSize="xsm" icon={PieChartOutlined}>统计</Tabbar.Item>
          <Tabbar.Item textSize="xsm" icon={UserSmileOutlined} badge={{ type: 'dot' }}>我的</Tabbar.Item>
        </Tabbar>
      </div>
    );
  }
});

export const noBorder = () => Vue.extend({
  render() {
    return (
      <div style="background: #fff;">
        <p style="text-align: center;">
          content
        </p>
        <Tabbar border={false}>
          <Tabbar.Item name="1" iconAreaSize="lg">
            <img slot="icon" style="width: 100%; box-shadow:0px 0px 20px 0px rgba(47,131,255,0.14);" src={require('../assets/logo.svg')} />
          </Tabbar.Item>
          <Tabbar.Item name="2" icon={MailOutlined}>邮箱</Tabbar.Item>
          <Tabbar.Item name="3" icon={PieChartOutlined}>统计</Tabbar.Item>
          <Tabbar.Item name="4" icon={UserSmileOutlined}>我的</Tabbar.Item>
        </Tabbar>
      </div>
    );
  },
});

export const activeColor = () => Vue.extend({
  render() {
    return (
      <Tabbar activeColor="#ff9434" inActiveColor="#000" value="2">
        <Tabbar.Item name="1" iconAreaSize="lg">
          <img slot="icon" style="width: 100%; box-shadow:0px 0px 20px 0px rgba(47,131,255,0.14);" src={require('../assets/logo.svg')} />
        </Tabbar.Item>
        <Tabbar.Item name="2" icon={MailOutlined} badge={999}>邮箱</Tabbar.Item>
        <Tabbar.Item name="3" icon={PieChartOutlined}>统计</Tabbar.Item>
        <Tabbar.Item name="4" icon={UserSmileOutlined}>我的</Tabbar.Item>
      </Tabbar>
    );
  }
});

export const hasIndicator = () => Vue.extend({
  render() {
    return (
      <div class="demo">
        <Card shadow divider>
          <Card.Header>Basic</Card.Header>
          <Tabbar style={{ background: 'rgb(245, 245, 245)' }} border={false} hasIndicator value="1">
            <Tabbar.Item name="1" textSize="md">关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md">推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md">热榜</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>ActiveColor</Card.Header>
          <Tabbar style={{ background: 'rgb(245, 245, 245)' }} activeColor="red" border={false} hasIndicator value="1">
            <Tabbar.Item name="1" textSize="md">关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md">推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md" badge={{ type: 'dot' }}>热榜</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>Inline Icon</Card.Header>
          <Tabbar style={{ background: 'rgb(245, 245, 245)' }} indicatorInverse border={false} hasIndicator value="1">
            <Tabbar.Item name="1" textSize="md"><Icon type={StarFilled}></Icon>关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md">推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md">热榜</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>Vertical Icon</Card.Header>
          <Tabbar style={{ background: 'rgb(245, 245, 245)' }} border={false} hasIndicator value="1">
            <Tabbar.Item name="1" textSize="md" icon={StarFilled} badge={{ type: 'dot' }}>关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md" icon={RocketFilled}>推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md" icon={FireFilled}>热榜</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>Indicator Width</Card.Header>
          <Tabbar style={{ background: 'rgb(245, 245, 245)' }} border={false} hasIndicator indicatorWidth={30} value="1">
            <Tabbar.Item name="1" textSize="md">关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md">推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md">热榜</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>Scroll</Card.Header>
          <Tabbar style={{ background: 'rgb(245, 245, 245)' }} scroll activeColor="red" border={false} hasIndicator value="6">
            <Tabbar.Item name="1" textSize="md" style={{minWidth: '80px'}}>关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md" style={{minWidth: '80px'}}>推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md" style={{minWidth: '80px'}}>热榜</Tabbar.Item>
            <Tabbar.Item name="4" textSize="md" style={{minWidth: '80px'}}>新闻</Tabbar.Item>
            <Tabbar.Item name="5" textSize="md" style={{minWidth: '80px'}}>汽车</Tabbar.Item>
            <Tabbar.Item name="6" textSize="md" style={{minWidth: '80px'}}>娱乐</Tabbar.Item>
            <Tabbar.Item name="7" textSize="md" style={{minWidth: '80px'}}>金融</Tabbar.Item>
            <Tabbar.Item name="8" textSize="md" style={{minWidth: '80px'}}>军事</Tabbar.Item>
            <Tabbar.Item name="9" textSize="md" style={{minWidth: '80px'}}>文化</Tabbar.Item>
            <Tabbar.Item name="10" textSize="md" style={{minWidth: '80px'}}>纪录片</Tabbar.Item>
            <Tabbar.Item name="11" textSize="md" style={{minWidth: '80px'}}>电影</Tabbar.Item>
            <Tabbar.Item name="12" textSize="md" style={{minWidth: '80px'}}>电视剧</Tabbar.Item>
            <Tabbar.Item name="13" textSize="md" style={{minWidth: '80px'}}>综艺</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>Vertical</Card.Header>
          <Tabbar style={{ background: 'rgb(245, 245, 245)' }} vertical hasIndicator value="1">
            <Tabbar.Item name="1" textSize="md" icon={StarFilled}>关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md" icon={RocketFilled}>推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md" icon={FireFilled}>热榜</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>Vertical Indicator Inverse</Card.Header>
          <Tabbar indicatorInverse style={{ background: 'rgb(245, 245, 245)' }} border={false} vertical hasIndicator value="1">
            <Tabbar.Item name="1" textSize="md" icon={StarFilled}>关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md" icon={RocketFilled}>推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md" icon={FireFilled}>热榜</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>Vertical No Icon</Card.Header>
          <Tabbar indicatorInverse style={{ background: 'rgb(245, 245, 245)' }} border={false} vertical hasIndicator value="1">
            <Tabbar.Item name="1" textSize="md"><Icon type={StarFilled}></Icon>关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md"><Icon type={RocketFilled}></Icon>推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md"><Icon type={FireFilled}></Icon>热榜</Tabbar.Item>
          </Tabbar>
        </Card>
        <Card shadow divider>
          <Card.Header>Vertical Scroll</Card.Header>
          <Tabbar indicatorInverse scroll style={{ background: 'rgb(245, 245, 245)', height: '400px' }} border={false} vertical hasIndicator value="9">
            <Tabbar.Item name="1" textSize="md">关注</Tabbar.Item>
            <Tabbar.Item name="2" textSize="md">推荐</Tabbar.Item>
            <Tabbar.Item name="3" textSize="md">热榜</Tabbar.Item>
            <Tabbar.Item name="4" textSize="md">新闻</Tabbar.Item>
            <Tabbar.Item name="5" textSize="md">汽车</Tabbar.Item>
            <Tabbar.Item name="6" textSize="md">娱乐</Tabbar.Item>
            <Tabbar.Item name="7" textSize="md">金融</Tabbar.Item>
            <Tabbar.Item name="8" textSize="md" >军事</Tabbar.Item>
            <Tabbar.Item name="9" textSize="md">文化</Tabbar.Item>
            <Tabbar.Item name="10" textSize="md">纪录片</Tabbar.Item>
            <Tabbar.Item name="11" textSize="md">电影</Tabbar.Item>
            <Tabbar.Item name="12" textSize="md">电视剧</Tabbar.Item>
            <Tabbar.Item name="13" textSize="md">综艺</Tabbar.Item>
          </Tabbar>
        </Card>
      </div>
    );
  },
});
