import Vue from 'vue';
import Button from '@/Button';
import '@/Button/style';
import docs from '@/Button/README.md';
import { SaveOutlined, ArrowLeftSOutlined, CheckOutlined } from '@ohu-mobile/icons';


export default {
  title: 'Components|Basic/Button',
  parameters: {
    component: Button,
    notes: { markdown: docs }
  },
};

export const basic = () => ({
  components: { Button },
  template: `
    <div style="padding: 10px;">
      <Button style="margin-bottom: 10px;">normal</Button>
      <Button round style="margin-bottom: 10px;">round</Button>
      <Button type="primary" style="margin-bottom: 10px;">primary</Button>
      <Button type="primary" round style="margin-bottom: 10px;">round + primary</Button>
      <Button disabled round style="margin-bottom: 10px;">disabled</Button>
      <Button type="primary" disabled round style="margin-bottom: 10px;">disabled + primary</Button>
    </div>
  `,
});


export const inline = () => ({
  components: { Button },
  template: `
    <div style="padding: 10px;">
      <Button style="margin-bottom: 10px;" inline>inline normal</Button>
      <Button style="margin-bottom: 10px;" inline round>inline round</Button>
      <Button style="margin-bottom: 10px;" type="primary" inline round>inline round primary</Button>
      <Button style="margin-bottom: 10px;" size="md">md</Button>
      <Button style="margin-bottom: 10px;" type="primary" size="md">md + primary</Button>
      <Button style="margin-bottom: 10px;" type="primary" size="md" round>md + round</Button>
      <Button style="margin-bottom: 10px;" size="sm">small</Button>
      <Button style="margin-bottom: 10px;" type="primary" size="sm">small + primary</Button>
      <Button style="margin-bottom: 10px;" type="primary" size="sm" round>small + round</Button>
    </div>
  `,
});

export const plain = () => ({
  components: { Button },
  template: `
    <div style="padding: 10px;">
      <Button style="margin-bottom: 10px;" type="primary" plain>plain</Button>
      <Button style="margin-bottom: 10px;" type="primary" plain disabled>plain + disabled</Button>
      <Button style="margin-bottom: 10px;" type="primary" plain round>plain + round</Button>
      <Button style="margin-bottom: 10px;" type="primary" plain round inline>plain + round + inline</Button>
      <Button style="margin-bottom: 10px;" type="primary" plain round inline size="sm">plain small</Button>
    </div>
  `,
});

export const translucent = () => ({
  components: { Button },
  template: `
    <div style="padding: 10px;">
      <Button style="margin-bottom: 10px;" type="translucent" size="sm">translucent</Button>
      <Button style="margin-bottom: 10px;" type="translucent" size="md" round>translucent + round + md</Button>
      <Button style="margin-bottom: 10px;" type="translucent" size="sm" disabled>translucent + disabled</Button>
    </div>
  `,
});


export const link = () => ({
  render() {
    return (
      <div style="padding: 10px;">
        <Button style="margin-bottom: 10px;" link size="sm">link</Button>
        <Button style="margin-bottom: 10px;" type="primary" link size="md" round>link + round + md</Button>
        <Button style="margin-bottom: 10px;" link size="sm" disabled>link + disabled</Button>
      </div>
    );
  },
});

export const withIcon = () => Vue.extend({
  render() {
    return (
      <div style="padding: 10px;">
        <p>lg</p>
        <Button type="primary" icon={SaveOutlined}>保存</Button>
        <Button type="primary" icon={SaveOutlined} round></Button>
        <p>md</p>
        <Button type="link" icon={ArrowLeftSOutlined} size="md">返回</Button>
        <Button type="primary" icon={ArrowLeftSOutlined} size="md" round></Button>
        <p>sm</p>
        <Button type="link" icon={ArrowLeftSOutlined} size="sm">返回</Button>
        <Button type="primary" icon={CheckOutlined} size="sm" round></Button>
      </div>
    );
  }
});

export const loading = () => Vue.extend({
  data() {
    return {
      loading: false,
    };
  },
  render() {
    return (
      <div style="padding: 10px;">
        <p>lg</p>
        <Button type="primary"
          loading={this.loading}
          onClick={e => { this.loading = !this.loading }}>
          { this.loading ? 'loading...' : 'click to load' }
        </Button>
        <p>md</p>
        <Button type="translucent"
          size="md"
          loading={this.loading}
          onClick={e => { this.loading = !this.loading }}>
          { this.loading ? 'loading...' : 'click to load' }
        </Button>
        <p>sm</p>
        <Button type="primary"
          size="sm"
          loading={this.loading}
          onClick={e => { this.loading = !this.loading }}>
          { this.loading ? 'loading...' : 'click to load' }
        </Button>
        <Button type="link"
          size="sm"
          loading={this.loading}
          onClick={e => { this.loading = !this.loading }}>
          { this.loading ? 'loading...' : 'click to load' }
        </Button>
      </div>
    );
  }
});
