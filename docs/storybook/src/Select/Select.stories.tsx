import Vue from 'vue';
import docs from '@/Select/README.md';
import Select from '@/Select';
import '@/Select/style';
import Tag from '@/Tag';
import '@/Tag/style';
import Card from '@/Card';
import '@/Card/style';
import Dialog from '@/Dialog';
import '@/Dialog/style';
import Toast from '@/Toast';
import '@/Toast/style';
import { ArrowLeftOutlined, ArrowRightSOutlined } from '~/icons/index';


export default {
  title: 'Components|Form/Select',
  parameters: {
    component: Select,
    options: {
      showPanel: true,
    },
    notes: {
      markdown: docs,
    },
  },
};


export const basic = () => Vue.extend({
  data() {
    return {
      v1: '艺术',
      v2: ['体育', '科学'],
      v3: '计算机',
    };
  },
  methods: {
    removeV2(value: string) {
      const index = this.v2.indexOf(value);
      if (index >= 0) {
        this.v2.splice(index, 1);
      }
    },
  },
  render() {
    return (
      <div class="demo">
        <Card shadow>
          <Card.Header>basic</Card.Header>
          <Select v-model={this.v1}
            style="min-width: 165px;"
            title="选择科目"
            placeholder="选择科目"
            maxHeight="30vh"
            options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>confirm</Card.Header>
          <Select v-model={this.v1}
            style="width: 100%;"
            title="选择科目"
            confirm
            allowClear
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>multiple</Card.Header>
          <Select v-model={this.v2}
            style="min-width: 165px;"
            title="选择科目"
            multiple
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>disabled</Card.Header>
          <Select v-model={this.v2}
            disabled
            style="min-width: 165px;"
            title="选择科目"
            multiple
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>scopedSlots: control</Card.Header>
          <Select v-model={this.v2}
            style="min-width: 165px;"
            title="选择科目"
            multiple
            scopedSlots={{
              control: (selectedOptions) => {
                if (selectedOptions instanceof Array) {
                  return selectedOptions.map(({ label, value }) => {
                    return (
                      <Tag
                        onClick={(e) => {
                          e.stopPropagation();
                          Dialog.confirm({
                            title: `是否删除${label}`,
                            onOk: () => {
                              this.removeV2(value);
                            },
                          });
                        }}
                        style="margin-right: 5px;"
                        deleteable>
                        {label}
                      </Tag>
                    );
                  });
                }
                return <Tag deleteable>{selectedOptions.label}</Tag>
              },
            }}
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>native</Card.Header>
          <Select v-model={this.v1}
            style="min-width: 165px;"
            title="选择科目"
            native
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术', disabled: true },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>popup custom</Card.Header>
          <Select v-model={this.v1}
            style="min-width: 165px;"
            title="选择科目"
            icon={ArrowRightSOutlined}
            popupProps={{
              position: 'right',
              fullscreen: true,
              mask: false,
            }}
            headerProps={{
              closeIcon: ArrowLeftOutlined,
              center: true,
              closeIconPosition: 'left',
            }}
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术', disabled: true },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
      </div>
    );
  },
});

export const outline = () => Vue.extend({
  data() {
    return {
      v1: '艺术',
      v2: ['体育', '科学'],
      v3: '计算机',
      v: false,
    };
  },
  methods: {
    removeV2(value: string) {
      const index = this.v2.indexOf(value);
      if (index >= 0) {
        this.v2.splice(index, 1);
      }
    },
  },
  render() {
    return (
      <div class="demo">
        <Card shadow>
          <Card.Header>basic</Card.Header>
          <Select outline v-model={this.v1}
            style="min-width: 165px;"
            title="选择科目"
            visible={this.v}
            placeholder="选择科目"
            maxHeight="30vh"
            options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>confirm</Card.Header>
          <Select outline v-model={this.v1}
            style="min-width: 165px;"
            title="选择科目"
            confirm
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>confirm</Card.Header>
          <Select outline v-model={this.v1}
            style="min-width: 165px;"
            title="选择科目"
            confirm
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>multiple</Card.Header>
          <Select outline v-model={this.v2}
            style="min-width: 165px;"
            title="选择科目"
            multiple
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>beforeOpen</Card.Header>
          <Select outline
            beforeOpen={() => {
              return new Promise((resolve, reject) => {
                const instance = Toast.loading('延时打开');
                setTimeout(() => {
                  instance.close();
                  resolve(true);
                }, 2000);
              });
            }}
            style="min-width: 165px;"
            title="选择科目"
            placeholder="选择科目"
            maxHeight="30vh"
            options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>scopedSlots: control</Card.Header>
          <Select outline v-model={this.v2}
            style="min-width: 165px;"
            title="选择科目"
            multiple
            scopedSlots={{
              control: (selectedOptions) => {
                if (selectedOptions instanceof Array) {
                  return selectedOptions.map(({ label, value }) => {
                    return (
                      <Tag
                        onClick={(e) => {
                          e.stopPropagation();
                          Dialog.confirm({
                            title: `是否删除${label}`,
                            onOk: () => {
                              this.removeV2(value);
                            },
                          });
                        }}
                        style="margin-right: 5px;"
                        deleteable>
                        {label}
                      </Tag>
                    );
                  });
                }
                return <Tag deleteable>{selectedOptions.label}</Tag>
              },
            }}
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术' },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>native</Card.Header>
          <Select outline v-model={this.v1}
            style="min-width: 165px;"
            title="选择科目"
            native
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术', disabled: true },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
        <Card shadow>
          <Card.Header>fullscreen</Card.Header>
          <Select outline v-model={this.v1}
            style="min-width: 165px;"
            title="选择科目"
            icon={ArrowRightSOutlined}
            fullScreen
            placeholder="选择科目" options={[
              { label: '艺术', value: '艺术', disabled: true },
              { label: '体育', value: '体育' },
              { label: '科学', value: '科学' },
              { label: '物理', value: '物理' },
              { label: '计算机', value: '计算机' },
              { label: '化学', value: '化学' },
            ]} />
        </Card>
      </div>
    );
  },
});

