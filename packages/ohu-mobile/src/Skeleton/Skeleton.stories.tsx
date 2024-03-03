import Vue from 'vue';

import Skeleton from './index';
import './style';
import Card from '../Card';
import '../Card/style';

export default {
  title: 'Components/DataDisplay/Skeleton',
  parameters: {
    component: Skeleton,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () => ({
  render() {
    return (
      <Card>
        <Skeleton rows={3}></Skeleton>
      </Card>
    );
  },
});

export const BlinkAnimate = () => ({
  render() {
    return (
      <Card>
        <Skeleton
          avatar
          title
          rows={6}
          rowWidth={['100%', '50%']}
          animate="blink"
        ></Skeleton>
      </Card>
    );
  },
});

export const NoAnimate = () => ({
  render() {
    return (
      <Card>
        <Skeleton
          avatar
          avatarSize="100px"
          title
          titleWidth="90%"
          rows={3}
          animateDisable
        ></Skeleton>
      </Card>
    );
  },
});

export const Loading = () =>
  Vue.extend({
    data() {
      return {
        loading: true,
        id: -1 as any,
      };
    },
    mounted() {
      this.id = setInterval(() => {
        this.loading = !this.loading;
      }, 2000);
    },
    beforeDestroy() {
      if (this.id >= 0) {
        clearInterval(this.id);
      }
    },
    render() {
      return (
        <Card>
          <Card.Header>
            {this.loading ? 'show content in 2s' : 'loading in 2s'}
          </Card.Header>
          <Skeleton avatar title rows={3} loading={this.loading}>
            This is Ohu-Mobile UI Kit
          </Skeleton>
        </Card>
      );
    },
  });

export const SelfDefined = () =>
  Vue.extend({
    render() {
      return (
        <Card>
          <Card>
            <Skeleton title rows={3}>
              <Skeleton
                style="width: 120px; height: 72px;"
                slot="left"
              ></Skeleton>
              <div slot="content">
                <Skeleton row></Skeleton>
                <Skeleton row></Skeleton>
                <Skeleton row rowWidth="30%"></Skeleton>
              </div>
            </Skeleton>
          </Card>
          <Card>
            <Skeleton title rows={3}>
              <Skeleton
                shape="circle"
                style="width: 72px; height: 72px;"
                slot="left"
              ></Skeleton>
              <div slot="content">
                <Skeleton row></Skeleton>
                <Skeleton row></Skeleton>
                <Skeleton row rowWidth="30%"></Skeleton>
              </div>
            </Skeleton>
          </Card>
        </Card>
      );
    },
  });

export const Duration = () =>
  Vue.extend({
    render() {
      return (
        <Card>
          <Skeleton rows={3} duration={3000}></Skeleton>
        </Card>
      );
    },
  });
