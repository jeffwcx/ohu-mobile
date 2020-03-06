import Vue from 'vue';
import docs from '@/Form/README.md';
import Form, { FormAlign, FormTrigger } from '@/Form';
import '@/Form/style';
import CheckboxGroup from '@/CheckboxGroup';
import Checkbox from '@/Checkbox';
import '@/Checkbox/style';
import RadioGroup from '@/RadioGroup';
import Radio from '@/Radio';
import '@/Radio/style';
import Agree from '@/Agree';
import '@/Agree/style';
import Button from '@/Button';
import '@/Button/style';
import Dialog from '@/Dialog';
import '@/Dialog/style';
import * as yup from 'yup';
import Input from '@/Input';
import '@/Input/style';
import Card from '@/Card';
import '@/Card/style';
import Select from '@/Select';
import '@/Select/style';


export default {
  title: 'Components|Form/Form',
  parameters: {
    component: Form,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};


export const basic = () => Vue.extend({
  render() {
    return (
      <Form
        inline={false}
        onValuesChange={({ prop, value }) => {
          console.log(prop, value);
        }}
        initialValues={{
          hobby: ['coding', 'sport'],
          gendar: 'man',
          username: '',
          password: '',
          note: '',
          verifyCode: '',
          subject: '艺术',
        }}
        validateSchema={{
          hobby: yup.array().min(2, '需要最少选2个').required(),
          username: yup.string().required('请输入用户名'),
          password: yup.string().required('请输入密码'),
        }}
        scopedSlots={{
          default: ({ model, reset, validate }) => {
            return (
              <div>
                <Form.Field label="爱好" name="hobby">
                  <CheckboxGroup>
                    <Checkbox value="coding">编程</Checkbox>
                    <Checkbox value="reading">阅读</Checkbox>
                    <Checkbox value="sport">运动</Checkbox>
                    <Checkbox value="movie">电影</Checkbox>
                  </CheckboxGroup>
                </Form.Field>
                <Form.Field label="性别" name="gendar">
                  <RadioGroup>
                    <Radio value="man">男</Radio>
                    <Radio value="woman">女</Radio>
                    <Radio value="unknown">未知</Radio>
                  </RadioGroup>
                </Form.Field>
                <Form.Field label="科目" name="subject">
                  <Select
                    style="min-width: 165px;"
                    title="选择科目"
                    placeholder="选择科目" options={[
                      { label: '艺术', value: '艺术' },
                      { label: '体育', value: '体育' },
                      { label: '科学', value: '科学' },
                      { label: '物理', value: '物理' },
                      { label: '计算机', value: '计算机' },
                      { label: '化学', value: '化学' },
                    ]} />
                </Form.Field>
                <Form.Field label="用户名" name="username">
                  <Input  placeholder="请输入用户名" allowClear />
                </Form.Field>
                <Form.Field label="验证码" name="verifyCode">
                  <Input type="number" placeholder="请输入验证码">
                    <Button slot="endAdornment" type="primary" size="sm">获取验证码</Button>
                  </Input>
                </Form.Field>
                <Form.Field label="密码" name="password">
                  <Input type="password" placeholder="请输入密码" />
                </Form.Field>
                <Form.Field label="备注" name="note">
                  <Input type="textarea" placeholder="请输入备注" rows={4} />
                </Form.Field>
                <div style="padding: 10px;">
                  <Agree disabled={!(!!model.gendar && model.hobby.length > 0)}>您仔细阅读以下条款，如果您对本协议的任何条款表示异议，意味着您（即「用户」）完全接受本协议项下的全部条款。</Agree>
                </div>
                <div style="padding: 10px 10px 0 10px;">
                  <Button type="primary" onClick={async () => {
                    try {
                      const result = await validate();
                      if(result) {
                        Dialog.alert({
                          content: JSON.stringify(result),
                          targetStyle: { 'height': '180px' },
                        });
                      }
                    } catch (error) {
                      console.log(error.errors);
                    }
                  }}>提交</Button>
                </div>
                <div style="padding: 10px;">
                  <Button onClick={reset}>重置</Button>
                </div>
              </div>
            );
          },
        }}>
      </Form>
    );
  },
});


export const inline = () => Vue.extend({
  data() {
    return {
      config: {
        contentAlign: 'left' as FormAlign,
        labelAlign: 'left' as FormAlign,
        validateFirst: false,
        trigger: 'blur' as FormTrigger,
      },
    };
  },
  render() {
    return (
      <div style="background: rgba(245, 246, 250, 1); height: auto">
        <Card shadow style="margin-bottom: 20px;">
          <Card.Header>config</Card.Header>
          <Form initialValues={this.config} onValuesChange={({prop, value}) => {
            this.$set(this.config, prop, value);
          }}>
            <Form.Field label="labelAlign" name="labelAlign">
              <RadioGroup>
                <Radio value="left">left</Radio>
                <Radio value="right">right</Radio>
                <Radio value="center">center</Radio>
              </RadioGroup>
            </Form.Field>
            <Form.Field label="contentAlign" name="contentAlign">
              <RadioGroup>
                <Radio value="left">left</Radio>
                <Radio value="right">right</Radio>
                <Radio value="center">center</Radio>
              </RadioGroup>
            </Form.Field>
            <Form.Field label="validateFirst" name="validateFirst">
              <RadioGroup>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </RadioGroup>
            </Form.Field>
            <Form.Field label="trigger" name="trigger">
              <RadioGroup>
                <Radio value="blur">blur</Radio>
                <Radio value="change">change</Radio>
              </RadioGroup>
            </Form.Field>
          </Form>
        </Card>
        <Form
          trigger={this.config.trigger}
          contentAlign={this.config.contentAlign}
          labelAlign={this.config.labelAlign}
          validateFirst={this.config.validateFirst}
          initialValues={{
            hobby: ['coding', 'sport'],
            gendar: 'man',
            username: '',
            password: '',
            note: '',
            verifyCode: '',
            subject: '',
          }}
          validateSchema={{
            hobby: yup.array().min(2, '需要最少选2个').required(),
            username: yup.string().min(8, '最少8个字符').max(20, '最多20个字符').required('请输入用户名'),
            password: yup.string().trim().min(8, '最少8个字符').required('请输入密码'),
          }}
          scopedSlots={{
            default: ({ model, reset, validate }) => {
              return (
                <div>
                  <Form.Field label="爱好" name="hobby" trigger="change">
                    <CheckboxGroup>
                      <Checkbox value="coding">编程</Checkbox>
                      <Checkbox value="reading">阅读</Checkbox>
                      <Checkbox value="sport">运动</Checkbox>
                      <Checkbox value="movie">电影</Checkbox>
                    </CheckboxGroup>
                  </Form.Field>
                  <Form.Field label="性别" name="gendar" trigger="change">
                    <RadioGroup>
                      <Radio value="man">男</Radio>
                      <Radio value="woman">女</Radio>
                      <Radio value="unknown">未知</Radio>
                    </RadioGroup>
                  </Form.Field>
                  <Form.Field label="科目" name="subject">
                    <Select
                      noBorder
                      outline
                      title="选择科目"
                      allowClear
                      placeholder="选择科目" options={[
                        { label: '艺术', value: '艺术' },
                        { label: '体育', value: '体育' },
                        { label: '科学', value: '科学' },
                        { label: '物理', value: '物理' },
                        { label: '计算机', value: '计算机' },
                        { label: '化学', value: '化学' },
                      ]} />
                  </Form.Field>
                  <Form.Field label="用户名" name="username">
                    <Input noBorder outline  placeholder="请输入用户名" allowClear />
                  </Form.Field>
                  <Form.Field label="验证码" name="verifyCode">
                    <Input noBorder outline type="number" placeholder="请输入验证码">
                      <Button slot="endAdornment" type="primary" size="sm">获取验证码</Button>
                    </Input>
                  </Form.Field>
                  <Form.Field label="密码" name="password">
                    <Input noBorder outline type="password" placeholder="请输入密码" allowClear />
                  </Form.Field>
                  <Form.Field label="备注" name="note">
                    <Input type="textarea" noBorder outline placeholder="请输入备注" rows={4} />
                  </Form.Field>
                  <div style="padding: 10px;">
                    <Agree disabled={!(!!model.gendar && model.hobby.length > 0)}>您仔细阅读以下条款，如果您对本协议的任何条款表示异议，意味着您（即「用户」）完全接受本协议项下的全部条款。</Agree>
                  </div>
                  <div style="padding: 10px 10px 0 10px;">
                    <Button type="primary" onClick={async () => {
                      try {
                        const result = await validate();
                        if(result) {
                          Dialog.alert({
                            content: JSON.stringify(result),
                            targetStyle: { 'height': '180px' },
                          });
                        }
                      } catch (error) {
                        console.log(error.errors);
                      }
                    }}>提交</Button>
                  </div>
                  <div style="padding: 10px;">
                    <Button onClick={reset}>重置</Button>
                  </div>
                </div>
              );
            },
          }}>
        </Form>
      </div>
    );
  },
});
