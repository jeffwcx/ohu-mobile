import Vue from 'vue';
import docs from '@/Input/README.md';
import Card from '@/Card';
import '@/Card/style';
import Input from '@/Input';
import '@/Input/style';
import { EditOutlined } from '~/icons/index';
import Button from '@/Button';
import '@/Button/style';


export default {
  title: 'Components|Form/Input',
  parameters: {
    component: Input,
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
      basic: 'hello',
      adornment: '',
      password: '',
    };
  },
  render() {
    return (
      <div>
        <Card shadow divider>
          <Card.Header>Basic</Card.Header>
          <Input v-model={this.basic} allowClear placeholder="please input" />
          <p>{this.basic}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Readonly</Card.Header>
          <Input readonly v-model={this.basic} allowClear />
          <p>{this.basic}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Disabled</Card.Header>
          <Input disabled v-model={this.basic} allowClear />
          <p>{this.basic}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Adornment</Card.Header>
          <Input v-model={this.adornment} startAdornment={EditOutlined} endAdornment="kg"  />
          <p>{this.adornment}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>ButtonAdornment</Card.Header>
          <Input v-model={this.adornment} startAdornment={EditOutlined}>
            <Button slot="endAdornment" type="primary" size="sm">获取验证码</Button>
          </Input>
          <p>{this.adornment}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Password</Card.Header>
          <Input v-model={this.password} type="password" allowClear style="width: 100%" placeholder="please input password" />
          <p>{this.password}</p>
        </Card>
      </div>
    );
  },
});

export const outline = () => Vue.extend({
  data() {
    return {
      basic: '',
      adornment: '',
      password: '',
    };
  },
  render() {
    return (
      <div>
        <Card shadow divider>
          <Card.Header>Basic</Card.Header>
          <Input outline v-model={this.basic} allowClear placeholder="please input" />
          <p>{this.basic}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Readonly</Card.Header>
          <Input outline readonly v-model={this.basic} allowClear />
          <p>{this.basic}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Disabled</Card.Header>
          <Input outline disabled v-model={this.basic} allowClear />
          <p>{this.basic}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Adornment</Card.Header>
          <Input outline v-model={this.adornment} startAdornment={EditOutlined} endAdornment="kg"  />
          <p>{this.adornment}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>ButtonAdornment</Card.Header>
          <Input v-model={this.adornment} outline startAdornment={EditOutlined}>
            <Button slot="endAdornment" type="primary" size="sm">获取验证码</Button>
          </Input>
          <p>{this.adornment}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Password</Card.Header>
          <Input outline v-model={this.password} type="password" allowClear style="width: 100%" placeholder="please input password" />
          <p>{this.password}</p>
        </Card>
      </div>
    );
  },
});


export const textarea = () => Vue.extend({
  data() {
    return {
      value: ''
    };
  },
  render() {
    return (
      <div>
        <Card shadow divider>
          <Card.Header>Basic</Card.Header>
          <Input v-model={this.value} type="textarea" rows={3} cols={30} />
          <p>{this.value}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Readonly</Card.Header>
          <Input v-model={this.value} readonly type="textarea" rows={3} cols={30} />
          <p>{this.value}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>Disabled</Card.Header>
          <Input v-model={this.value} disabled readonly type="textarea" rows={3} cols={30} />
          <p>{this.value}</p>
        </Card>
        <Card shadow divider>
          <Card.Header>outline</Card.Header>
          <Input v-model={this.value} outline type="textarea" rows={3} cols={30} />
          <p>{this.value}</p>
        </Card>
      </div>
    );
  },
});
