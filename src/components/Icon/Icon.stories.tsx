import Icon from '.';
import docs from './README.md';



export default {
  title: 'Components|Basic/Icon',
  parameters: {
    component: Icon,
    notes: {
      markdown: docs,
    },
  },
};

const filledIcons = [
  'up-filled',
  'down-filled',
  'left-filled',
  'right-filled',
  'check-filled',
  'menu-filled',
  'sync-filled',
  'circle-check-filled',
  'circle-close-filled',
  'loading-filled',
  'medical-filled',
  'play-filled',
  'round-play-filled',
  'star-filled',
];

const outlinedIcons = [
  'up-outlined',
  'down-outlined',
  'left-outlined',
  'right-outlined',
  'check-outlined',
  'menu-outlined',
  'sync-outlined',
  'star-outlined',
  'share-outlined',
  'loading-outlined',
  'scan-code-outlined',
  'help-outlined',
  'config-outlined',
  'circle-outlined',
  'location-outlined',
  'phone-outlined',
  'search-outlined',
  'user-outlined',
  'message-outlined',
  'save-outlined',
  'back-home-outlined',
  'beaker-outlined',
  'car-outlined',
  'checkup-outlined',
  'customer-service-outlined',
  'doctor-outlined',
  'earth-outlined',
  'forward-outlined',
  'home-outlined',
  'medical-box-outlined',
  'medical-message-outlined',
  'medical-outlined',
  'scales-outlined',
  'smile-face-outlined',
  'step-outlined',
  'ticket-outlined',
  'wallet-outlined',
  'water-drop-outlined',
];

const multiColorIcons = [
  'eye-multi-color',
  'fire-multi-color',
  'intestine-multi-color',
  'kid-multi-color',
  'pregnancy-multi-color',
  'report-multi-color',
  'skin-multi-color',
  'stomach-multi-color',
];

export const outlined = () => ({
  render() {
    return (
      <div>
        <div style="font-size: 36px; display: flex; flex-flow: row wrap;">
          {
            outlinedIcons.map((name) => {
              return (
                <div style="box-sizing: border-box; padding: 10px; text-align: center; width: 25%;">
                  <Icon type={name}></Icon>
                  <div style="font-size: 14px; text-align: center;">{name}</div>
                </div>
              );
            })
          }
        </div>
        <p style="text-align: center; font-size: 18px;">共{outlinedIcons.length}个</p>
      </div>
    );
  },
});

export const filled = () => ({
  render() {
    return (
      <div>
        <div style="font-size: 36px; display: flex; flex-flow: row wrap;">
          {
            filledIcons.map((name) => {
              return (
                <div style="box-sizing: border-box; padding: 10px; text-align: center; width: 25%;">
                  <Icon type={name}></Icon>
                  <div style="font-size: 14px; text-align: center;">{name}</div>
                </div>
              );
            })
          }
        </div>
        <p style="text-align: center; font-size: 18px;">共{filledIcons.length}个</p>
      </div>
    );
  },
});

export const multiColor = () => ({
  render() {
    return (
      <div>
        <div style="font-size: 36px; display: flex; flex-flow: row wrap;">
          {
            multiColorIcons.map((name) => {
              return (
                <div style="box-sizing: border-box; padding: 10px; text-align: center; width: 25%;">
                  <Icon type={name}></Icon>
                  <div style="font-size: 14px; text-align: center;">{name}</div>
                </div>
              );
            })
          }
        </div>
        <p style="text-align: center; font-size: 18px;">共{multiColorIcons.length}个</p>
      </div>
    );
  },
});

export const color = () => ({
  render() {
    return (
      <div style="font-size: 36px; display: flex; flex-flow: row wrap;">
        <div style="box-sizing: border-box; padding: 10px; text-align: center; width: 25%;">
          <Icon type="share" color="#2d7eff"></Icon>
        </div>
        <div style="box-sizing: border-box; padding: 10px; text-align: center; width: 25%;">
          <Icon type="circle-close-f" color="#999"></Icon>
        </div>
        <div style="box-sizing: border-box; padding: 10px; text-align: center; width: 25%;">
          <Icon type="star" color="#ff9434"></Icon>
        </div>
        <div style="box-sizing: border-box; padding: 10px; text-align: center; width: 25%;">
          <Icon type="help" color="#ff2d31"></Icon>
        </div>
      </div>
    );
  },
});

export const spin = () => ({
  render() {
    return (
      <div style="font-size: 36px; padding: 10px;">
        <Icon type="loading-f" spin color="#999"></Icon>
      </div>
    );
  },
});

export const rotate = () => ({
  render() {
    return (
      <div style="font-size: 36px; padding: 10px;">
        <Icon type="kid-m" rotate={90}></Icon>
      </div>
    );
  }
});
