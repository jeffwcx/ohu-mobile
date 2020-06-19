import docs from '@/Fab/README.md';
import { component } from 'vue-tsx-support';
import Fab, { FabPositions } from '@/Fab';
import '@/Fab/style';
import Button from '@/Button';
import '@/Button/style';
import Icon from '@/Icon';
import '@/Icon/style';
import {
  UserSmileOutlined, MapPinOutlined,
  EmotionOutlined, StarOutlined,
  WalletOutlined, CouponOutlined,
  ReplyOutlined, CustomerServiceOutlined,
  QuestionOutlined,
  HomeOutlined,
  InboxOutlined,
  CheckOutlined,
  UserOutlined,
  MessageOutlined,
} from '~/icons/index';


export default {
  title: 'Components|Navigation/Fab',
  parameters: {
    component: Fab,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};


export const noAction = () => component({
  render() {
    return (
      <Fab style="bottom: 50px;" label="标签" onClick={() => {
        console.log('hello');
      }}></Fab>
    );
  },
});


export const basic = () => component({
  data() {
    return {
      expand: false,
      x: ['left', 'right', 'center'],
      y: ['top', 'bottom', 'center'],
    };
  },
  render() {
    return (
      <div class="demo" style="background: #eee; height: 100vh;">
        {
          this.x.map((xd) => {
            return this.y.map((yd) => {
              const d = (xd + '-' + yd) as FabPositions;
              return (
                <Fab mask label="标签" maskClosable position={d} direction={yd === 'center' && xd === 'right' ? 'left' : undefined}>
                  <Fab.Action icon={UserSmileOutlined} label="笑脸"></Fab.Action>
                  <Fab.Action icon={CustomerServiceOutlined} label="客服"></Fab.Action>
                  <Fab.Action icon={HomeOutlined} label="首页"></Fab.Action>
                  <Fab.Action icon={QuestionOutlined} label="问题"></Fab.Action>
                </Fab>
              );
            })
          })
        }
      </div>
    );
  },
});
