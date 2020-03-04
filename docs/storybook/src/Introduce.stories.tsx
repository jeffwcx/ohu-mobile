import docs from '../../../README.md';
import * as variables from '@/_config/variables';
import MarkdownIt from 'markdown-it';
import props from 'vue-strict-prop';
import { component } from 'vue-tsx-support';
import 'post-style/lib/post.min.css';

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
    const md = new MarkdownIt({
      html: true,
    });
    this.$on('hook:mounted', () => {
      this.instance = md;
    });
  },
  render() {
    return (
      <div class="markdown" style={{ padding: '30px' }} domPropsInnerHTML={this.html}></div>
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

let vars: Record<string, string | number> = variables;
let varstr = Object.keys(vars).map((key) => `${key}: ${vars[key]};`).join('\n\n');
export const theme = () => ({

  render() {
    const source = `
\`\`\`
${varstr}
\`\`\`
    `;
    return (
      <Markdown source={source}></Markdown>
    );
  }
});
