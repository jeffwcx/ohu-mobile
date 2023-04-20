import docs from '../../../README.md';
import * as variables from '@/_config/variables';
import MarkdownIt from 'markdown-it';
import hightlight from 'highlight.js';
import 'highlight.js/styles/paraiso-dark.css';
import props from 'vue-strict-prop';
import { component } from 'vue-tsx-support';
import 'post-style';

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
    const md: MarkdownIt = new MarkdownIt({
      html: true,
      highlight: (str, lang) => {
        if (lang && hightlight.getLanguage(lang)) {
          try {
            return `<pre class="hljs"><code>${hightlight.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
          } catch (__) {}
        }
        return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`;
      },
    });
    this.$on('hook:mounted', () => {
      this.instance = md;
    });
  },
  render() {
    return (
      <div class="markdown-body theme-blue" style={{ padding: '30px' }} domPropsInnerHTML={this.html}></div>
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
## Theme Customization

Users can customize their own theme through the following variables.

\`\`\`scss
${varstr}
\`\`\`
    `;
    return (
      <Markdown source={source}></Markdown>
    );
  }
});
