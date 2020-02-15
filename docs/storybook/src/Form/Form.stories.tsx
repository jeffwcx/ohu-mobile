import Vue from 'vue';
import docs from '@/Form/README.md';
import Form from '@/Form';
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


export default {
  title: 'Components|Form/Form',
  parameters: {
    component: Form,
    notes: { markdown: docs }
  },
};

export const basic = () => Vue.extend({
  render() {
    return (
      <Form
        style="padding: 10px; font-size: 16px;"
        onValuesChange={({ prop, value }) => {
          console.log(prop, value);
        }}
        initialValues={{
          hobby: ['coding', 'sport'],
          gendar: 'man',
          isAgree: true,
        }}
        validateSchema={{
          hobby: yup.array().min(2, '需要最少选2个').required(),
        }}
        scopedSlots={{
          default: ({ errors, model, reset, validate }) => {
            return (
              <div>
                <Form.Field label="爱好" name="hobby">
                  <CheckboxGroup>
                    <Checkbox value="coding">编程</Checkbox>
                    <Checkbox value="reading">阅读</Checkbox>
                    <Checkbox value="sport">运动</Checkbox>
                  </CheckboxGroup>
                </Form.Field>
                <span style="color: red;">{ errors?.hobby?.message }</span>
                <Form.Field label="性别" name="gendar">
                  <RadioGroup>
                    <Radio value="man">男</Radio>
                    <Radio value="woman">女</Radio>
                    <Radio value="unknown">未知</Radio>
                  </RadioGroup>
                </Form.Field>
                <Form.Field name="isAgree">
                  <Agree disabled={!(!!model.gendar && model.hobby.length > 0)}>您仔细阅读以下条款，如果您对本协议的任何条款表示异议，意味着您（即「用户」）完全接受本协议项下的全部条款。</Agree>
                </Form.Field>
                <Form.Field>
                  <Button type="primary" onClick={async () => {
                    try {
                      const result = await validate();
                      if(result) {
                        Dialog.alert({ content: JSON.stringify(result) });
                      }
                    } catch (error) {
                      console.log(error.errors);
                    }

                  }}>提交</Button>
                </Form.Field>
                <Form.Field>
                  <Button onClick={reset}>重置</Button>
                </Form.Field>
              </div>
            );
          },
        }}>
      </Form>
    );
  },
});
