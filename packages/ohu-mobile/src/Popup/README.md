# Popup
## Usage

```tsx
import { Popup, component } from 'ohu-mobile';

component({
  data() {
    return {
      visible: false,
    };
  },
  render() {
    return (
      <Popup v-model={this.visible}></Popup>
    );
  },
})
```

## Function Call

```ts
Popup.open();
```



# TODO

+ dymanic width and height in anchor mode.
+ round radius + gesture suport.
+ bounce build animation.


