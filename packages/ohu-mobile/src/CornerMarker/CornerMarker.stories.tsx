import CornerMarker from '.';
import { CreateElement } from 'vue';
import docs from './README.md';

export default {
  title: 'Components|DataDisplay/CornerMarker',
  parameters: {
    component: CornerMarker,
    notes: { markdown: docs }
  },
};


export const basic = () => ({
  render(h: CreateElement) {
    const container = (
      <div style="width: 200px;height: 80px;border: 1px solid #eee; position: relative; border-radius: 6px; overflow: hidden; margin: 10px auto;">
      </div>
    );
    return (
      <div>
        <CornerMarker theme="gold" text="推荐">
          {container}
        </CornerMarker>
        <CornerMarker theme="grey" text="听诊">
          {container}
        </CornerMarker>
        <CornerMarker theme="red" text="已满">
          {container}
        </CornerMarker>
      </div>
    );
  },
});


export const position = () => ({
  render(h: CreateElement) {
    const container = (
      <div style="width: 200px;height: 80px;border: 1px solid #eee; position: relative; border-radius: 6px; overflow: hidden; margin: 10px auto;">
      </div>
    );
    return (
      <div>
        <CornerMarker theme="gold" text="推荐">
          {container}
        </CornerMarker>
        <CornerMarker theme="grey" position="up-left" text="听诊">
          {container}
        </CornerMarker>
        <CornerMarker theme="red" position="down-left" text="已满">
          {container}
        </CornerMarker>
        <CornerMarker theme="gold" position="down-right" text="已满" color="yellow" fillColor="red">
          {container}
        </CornerMarker>
      </div>
    );
  }
});
