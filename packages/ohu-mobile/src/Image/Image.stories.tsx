import { component } from 'vue-tsx-support';
import Image from './index';
import './style';
import Result from '../Result';
import '../Result/style';
import Button from '../Button';
import '../Button/style';
import Loading from '../Loading';
import '../Loading/style';
import Grid from '../Grid';
import '../Grid/style';

export default {
  title: 'Components/Basic/Image',
  parameters: {
    component: Image,
    options: {
      showPanel: true,
    },
  },
};

export const Basic = () =>
  component({
    render() {
      return <Image src="http://via.placeholder.com/375X275/FF2244/FFFFFF" />;
    },
  });

export const ErrorAndReload = () =>
  component({
    data() {
      return {
        src: 'http://via.placeholder.c',
      };
    },
    render() {
      return (
        <Image
          width="100px"
          reload
          errorTip
          style="border-radius: 100px;"
          round
          height="100px"
          src={this.src}
          onReload={() => {
            this.src = 'http://via.placeholder.com/375X275/FF2244/FFFFFF';
          }}
        />
      );
    },
  });

export const ErrorScopedSlot = () =>
  component({
    data() {
      return {
        src: 'http://via.placeholder.c',
      };
    },
    render() {
      return (
        <Image
          width="300px"
          height="150px"
          src={this.src}
          scopedSlots={{
            error: ({ reload }) => {
              return (
                <Result status="network-broken">
                  <template slot="extra">
                    <Button
                      inline
                      round
                      type="primary"
                      onClick={() => {
                        this.src =
                          'http://via.placeholder.com/375X275/FF2244/FFFFFF';
                        reload();
                      }}
                    >
                      重新加载
                    </Button>
                  </template>
                </Result>
              );
            },
          }}
        />
      );
    },
  });

export const PlaceholderSlot = () =>
  component({
    data() {
      return {
        src: 'http://via.placeholder.com/300X150/FF2244/FFFFFF',
      };
    },
    render() {
      return (
        <Image width="300px" height="150px" src={this.src}>
          <div
            style="width: 300px; height: 150px; background: #EEE; display: flex; justify-content: center; align-items: center;"
            slot="placeholder"
          >
            <Loading />
          </div>
        </Image>
      );
    },
  });

export const Lazy = () =>
  component({
    render() {
      return (
        <div style="overflow: hidden;">
          <Grid row wrap gap={2}>
            {new Array(99).fill('').map((_, index) => {
              const str = index.toString().padEnd(2, '2');
              const color = new Array(3).fill(str).join('');
              return (
                <Grid.Item span={6}>
                  <Image
                    height="120px"
                    width="100%"
                    lazy
                    src={`http://via.placeholder.com/240X144/${color}`}
                  ></Image>
                </Grid.Item>
              );
            })}
          </Grid>
        </div>
      );
    },
  });

export const Fit = () =>
  component({
    render() {
      return (
        <div>
          <Image
            width="240px"
            height="240px"
            fit="contain"
            src="http://via.placeholder.com/240X144/F5F5F5/000000?text=contain"
          />
          <Image
            width="240px"
            height="240px"
            fit="cover"
            src="http://via.placeholder.com/240X144/E2E2E2/333333?text=cover"
          />
          <Image
            width="240px"
            height="240px"
            fit="fill"
            src="http://via.placeholder.com/240X144/909090/FFFFFF?text=fill"
          />
          <Image
            width="240px"
            height="240px"
            fit="scale-down"
            src="http://via.placeholder.com/240X144/8E8E8E/FFFFFF?text=scale-down"
          />
        </div>
      );
    },
  });
