import { componentFactory } from 'vue-tsx-support';
import props from 'vue-strict-prop';


const Icon = componentFactory.create({
  name: 'icon',
  props: {
    type: props(String).required,
    color: String,
    theme: props.ofStringLiterals('outlined').default('outlined'),
    spin: props(Boolean).default(false),
    rotate: props(Number).default(0),
  },
  render(h) {
    return (
      <svg>
        <use xlinkHref={`#${this.type}`}></use>
      </svg>
    );
  },
});

export default Icon;