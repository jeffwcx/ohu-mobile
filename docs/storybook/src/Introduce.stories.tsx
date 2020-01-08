import docs from '../../../README.md';
import MarkdownIt from 'markdown-it';
import props from 'vue-strict-prop';
import { component } from 'vue-tsx-support';

export default {
  title: 'Overview|Introduce',
  parameters: {
    options: {
      showPanel: false,
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

const Markdown = component({
  props: {
    source: props(String).required,
  },
  data() {
    return {
      instance: null,
    } as {
      instance: MarkdownIt | null;
    };
  },
  computed: {
    html() {
      const i = this.instance as any;
      if (i) {
        return i.render(this.source);
      }
      return '';
    },
  },
  created() {
    const md = new MarkdownIt();
    this.$on('hook:mounted', () => {
      this.instance = md;
    });
  },
  render() {
    return (
      <div style={{ padding: '30px' }} domPropsInnerHTML={this.html}></div>
    );
  },
});



export const README = () => ({
  render() {
    return (
      <Markdown source={docs}></Markdown>
    );
  },
});
