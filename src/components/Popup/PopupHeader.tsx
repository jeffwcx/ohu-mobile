import { component } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';
import './styles/popup-header.scss';
import Button from '../Button';
import { CloseCircleFilled } from '../../icons';
import Divider from '../Divider';


export const basePopupHeaderName = `${prefix}popup-header`;
const popupHeaderTextCls = `${basePopupHeaderName}__text`;
const popupHeaderTextTitleCls = `${popupHeaderTextCls}__title`;
const popupHeaderTextMinorTitleCls = `${popupHeaderTextCls}__minor-title`;
export default component({
  name: basePopupHeaderName,
  props: {
    minorText: String,
  },
  methods: {
    closeParent() {
      const parent = this.$parent as any;
      if (parent.close) {
        parent.close();
      }
    },
  },
  render() {
    const { $slots, minorText } = this;
    return (
      <div>
        <div class={basePopupHeaderName}>
          <div class={popupHeaderTextCls}>
            <div class={popupHeaderTextTitleCls}>{$slots.default}</div>
            {
              minorText
              &&
              <div class={popupHeaderTextMinorTitleCls}>{minorText}</div>
            }
          </div>
          <Button type="link"
            size="md"
            inline
            icon={CloseCircleFilled}
            onClick={this.closeParent}>
          </Button>
        </div>
        <Divider></Divider>
      </div>
    );
  },
});
