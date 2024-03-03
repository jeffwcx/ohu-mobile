import Vue from 'vue';
import docs from './README.md?raw';
import Form, { FormAlign, FormTrigger } from './index';
import './style';
import CheckboxGroup from '../CheckboxGroup';
import Checkbox from '../Checkbox';
import '../Checkbox/style';
import RadioGroup from '../RadioGroup';
import Radio from '../Radio';
import '../Radio/style';
import Agree from '../Agree';
import '../Agree/style';
import Button from '../Button';
import '../Button/style';
import Dialog from '../Dialog';
import '../Dialog/style';
import Input from '../Input';
import '../Input/style';
import Card from '../Card';
import '../Card/style';
import Select from '../Select';
import '../Select/style';
import Ajv from 'ajv';
import { FormError } from './FormError';

export default {
  title: 'Components/Form/Form',
  parameters: {
    component: Form,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs },
  },
};

export const Basic = () =>
  Vue.extend({
    render() {
      return (
        <Form
          inline={false}
          onValuesChange={({ prop, value }) => {
            console.log(prop, value);
          }}
          autocomplete="off"
          initialValues={{
            hobby: ['coding', 'sport'],
            gendar: 'man',
            username: '',
            password: '',
            note: '',
            verifyCode: '',
            subject: '艺术',
          }}
          validateSchema={(yup) => ({
            hobby: yup.array().min(2, '需要最少选2个').required(),
            username: yup.string().required('请输入用户名'),
            password: yup.string().required('请输入密码'),
          })}
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
                      placeholder="选择科目"
                      options={[
                        { label: '艺术', value: '艺术' },
                        { label: '体育', value: '体育' },
                        { label: '科学', value: '科学' },
                        { label: '物理', value: '物理' },
                        { label: '计算机', value: '计算机' },
                        { label: '化学', value: '化学' },
                      ]}
                    />
                  </Form.Field>
                  <Form.Field label="用户名" name="username">
                    <Input placeholder="请输入用户名" allowClear />
                  </Form.Field>
                  <Form.Field label="验证码" name="verifyCode">
                    <Input type="number" placeholder="请输入验证码">
                      <Button slot="endAdornment" type="primary" size="sm">
                        获取验证码
                      </Button>
                    </Input>
                  </Form.Field>
                  <Form.Field label="密码" name="password">
                    <Input type="password" placeholder="请输入密码" />
                  </Form.Field>
                  <Form.Field label="备注" name="note">
                    <Input type="textarea" placeholder="请输入备注" rows={4} />
                  </Form.Field>
                  <div style="padding: 10px;">
                    <Agree
                      disabled={!(!!model.gendar && model.hobby.length > 0)}
                    >
                      您仔细阅读以下条款，如果您对本协议的任何条款表示异议，意味着您（即「用户」）完全接受本协议项下的全部条款。
                    </Agree>
                  </div>
                  <div style="padding: 10px 10px 0 10px;">
                    <Button
                      type="primary"
                      onClick={async () => {
                        try {
                          const result = await validate();
                          if (result) {
                            Dialog.alert({
                              content: JSON.stringify(result),
                              targetStyle: { height: '180px' },
                            });
                          }
                        } catch (error) {
                          console.log((error as FormError).errors);
                        }
                      }}
                    >
                      提交
                    </Button>
                  </div>
                  <div style="padding: 10px;">
                    <Button onClick={reset}>重置</Button>
                  </div>
                </div>
              );
            },
          }}
        ></Form>
      );
    },
  });

export const Inline = () =>
  Vue.extend({
    data() {
      return {
        config: {
          contentAlign: 'left' as FormAlign,
          labelAlign: 'left' as FormAlign,
          validateFirst: false,
          trigger: 'blur' as FormTrigger,
          scrollToError: true,
          validateFunc: false,
          inline: true,
        },
      };
    },
    render() {
      return (
        <div style="background: rgba(245, 246, 250, 1); height: auto">
          <Card shadow style="margin-bottom: 20px;">
            <Card.Header>config</Card.Header>
            <Form
              initialValues={this.config}
              onValuesChange={({ prop, value }) => {
                this.$set(this.config, prop, value);
              }}
            >
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
                  <Radio value={true}>true</Radio>
                  <Radio value={false}>false</Radio>
                </RadioGroup>
              </Form.Field>
              <Form.Field label="trigger" name="trigger">
                <RadioGroup>
                  <Radio value="blur">blur</Radio>
                  <Radio value="change">change</Radio>
                </RadioGroup>
              </Form.Field>
              <Form.Field label="scrollToError" name="scrollToError">
                <RadioGroup>
                  <Radio value={true}>true</Radio>
                  <Radio value={false}>false</Radio>
                </RadioGroup>
              </Form.Field>
              <Form.Field label="validateFunc" name="validateFunc">
                <RadioGroup>
                  <Radio value={true}>true</Radio>
                  <Radio value={false}>false</Radio>
                </RadioGroup>
              </Form.Field>
              <Form.Field label="inline" name="inline">
                <RadioGroup>
                  <Radio value={true}>true</Radio>
                  <Radio value={false}>false</Radio>
                </RadioGroup>
              </Form.Field>
            </Form>
          </Card>
          <Form
            inline={this.config.inline}
            onSubmit={(result: any) => {
              Dialog.alert({
                content: JSON.stringify(result),
                targetStyle: { height: '180px' },
              });
            }}
            onFail={(errors) => {
              console.log(errors);
            }}
            validateFunc={
              this.config.validateFunc
                ? (values, props) => {
                    const ajv = new Ajv({ allErrors: !props.validateFirst });

                    const validator = ajv.compile({
                      required: ['hobby', 'username', 'password'],
                      properties: {
                        hobby: { type: 'array', maxItems: 2 },
                        username: { type: 'string', maxLength: 8 },
                        password: { type: 'string', maxLength: 8 },
                      },
                    });
                    const errors: Record<string, string> = {};
                    const valid = validator(values);
                    if (!valid) {
                      return (validator.errors || []).reduce(
                        (acc, { schemaPath, message }) => {
                          if (schemaPath && message) {
                            acc[schemaPath.replace('.', '')] = message;
                          }
                          return acc;
                        },
                        errors,
                      );
                    }
                    return errors;
                  }
                : undefined
            }
            trigger={this.config.trigger}
            contentAlign={this.config.contentAlign}
            labelAlign={this.config.labelAlign}
            validateFirst={this.config.validateFirst}
            scrollToError={this.config.scrollToError}
            initialValues={{
              hobby: ['coding', 'sport'],
              gendar: 'man',
              username: 'jeffwcx',
              password: '',
              subject: '艺术',
            }}
            excludeFields={['confirmPassword']}
            validateSchema={(yup) => {
              return {
                hobby: yup.array().min(2, '需要最少选2个').required(),
                username: yup
                  .string()
                  .min(8, '最少8个字符')
                  .max(20, '最多20个字符')
                  .required('请输入用户名'),
                password: yup
                  .string()
                  .trim()
                  .min(8, '最少8个字符')
                  .required('请输入密码'),
              };
            }}
            scopedSlots={{
              default: ({ model, reset, submit, getFieldValue }) => {
                return (
                  <div>
                    <Form.Field label="爱好" name="hobby" required>
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
                        noBorder={this.config.inline}
                        outline={this.config.inline}
                        title="选择科目"
                        allowClear
                        placeholder="选择科目"
                        options={[
                          { label: '艺术', value: '艺术' },
                          { label: '体育', value: '体育' },
                          { label: '科学', value: '科学' },
                          { label: '物理', value: '物理' },
                          { label: '计算机', value: '计算机' },
                          { label: '化学', value: '化学' },
                        ]}
                      />
                    </Form.Field>
                    <Form.Field label="用户名" name="username" required>
                      <Input
                        noBorder={this.config.inline}
                        outline={this.config.inline}
                        placeholder="请输入用户名"
                        allowClear
                      />
                    </Form.Field>
                    <Form.Field
                      label="验证码"
                      name="verifyCode"
                      initialValue="123"
                    >
                      <Input
                        noBorder={this.config.inline}
                        outline={this.config.inline}
                        type="number"
                        placeholder="请输入验证码"
                      >
                        <Button slot="endAdornment" type="primary" size="sm">
                          获取验证码
                        </Button>
                      </Input>
                    </Form.Field>
                    <Form.Field label="密码" name="password" required>
                      <Input
                        noBorder={this.config.inline}
                        outline={this.config.inline}
                        type="password"
                        placeholder="请输入密码"
                        allowClear
                      />
                    </Form.Field>
                    <Form.Field
                      label="确认密码"
                      name="confirmPassword"
                      validate={(value) => {
                        const password = getFieldValue('password');
                        if (!value) return '请输入确认密码';
                        if (value !== password) return '确认密码与密码不一致';
                        return '';
                      }}
                    >
                      <Input
                        noBorder={this.config.inline}
                        outline={this.config.inline}
                        type="password"
                        placeholder="请输入密码"
                        allowClear
                      />
                    </Form.Field>
                    <Form.Field label="备注" name="note">
                      <Input
                        type="textarea"
                        noBorder={this.config.inline}
                        outline={this.config.inline}
                        placeholder="请输入备注"
                        rows={4}
                        onEnter={() => {
                          submit();
                        }}
                      />
                    </Form.Field>
                    <div style="padding: 10px;">
                      <Agree
                        disabled={!(!!model.gendar && model.hobby.length > 0)}
                      >
                        您仔细阅读以下条款，如果您对本协议的任何条款表示异议，意味着您（即「用户」）完全接受本协议项下的全部条款。
                      </Agree>
                    </div>
                    <div style="padding: 10px 10px 0 10px;">
                      <Button type="primary" htmlType="submit">
                        提交
                      </Button>
                    </div>
                    <div style="padding: 10px;">
                      <Button onClick={reset}>重置</Button>
                    </div>
                  </div>
                );
              },
            }}
          ></Form>
        </div>
      );
    },
  });
