import docs from '@/TreeSelect/README.md';
import Vue from 'vue';
import Card from '@/Card';
import '@/Card/style';
import Toast from '@/Toast';
import '@/Toast/style';
import TreeSelect, { TreeNode, InternalTreeNode } from '@/TreeSelect';
import '@/TreeSelect/style';
import Skeleton from '@/Skeleton';
import '@/Skeleton/style';


export default {
  title: 'Components|Form/TreeSelect',
  parameters: {
    component: TreeSelect,
    options: {
      showPanel: true,
    },
    notes: {
      markdown: docs,
    },
  },
};

export const basic = () => Vue.extend({
  data() {
    return {
      value: '材料类',
      treeData: [
        {
          key: '法学',
          title: '法学',
          value: '法学',
          hasChildren: true,
        },
        {
          title: '工学',
          value: '工学',
          key: '工学',
          children: [
            { key: '兵器类', title: '兵器类', value: '兵器类', isLeaf: true },
            { key: '材料类', title: '材料类', value: '材料类', isLeaf: true },
            { key: '测绘类', title: '测绘类', value: '测绘类', isLeaf: true },
          ],
        },
        {
          key: '管理学',
          title: '管理学',
          value: '管理学',
          hasChildren: true,
        },
        {
          key: '理学',
          title: '理学',
          value: '理学',
          hasChildren: true,
        },
      ] as TreeNode[],
    };
  },
  methods: {
    loadData(node: InternalTreeNode): Promise<TreeNode[]> {
      return new Promise((resolve, reject) => {
        if (node.key === '法学') {
          return resolve([
            {
              key: '法学类',
              title: '法学类',
              value: '法学类',
              hasChildren: true,
            },
            { key: '公安学类', title: '公安学类', value: '公安学类' },
            { key: '马克思主义理论类', title: '马克思主义理论类', value: '马克思主义理论类' },
            { key: '社会学类', title: '社会学类', value: '社会学类' },
            { key: '民族学类', title: '民族学类', value: '民族学类', isLeaf: true },
            { key: '政治学类', title: '政治学类', value: '政治学类' },
          ]);
        }
        if (node.key === '法学2' || node.key === '政治') {
          return setTimeout(() => {
            resolve([
              { key: '刑法', title: '刑法', value: '刑法', isLeaf: true },
            ]);
          }, 2000);
        }
        if (node.key === '管理学') {
          return setTimeout(() => {
            resolve([
              { key: '政治', title: '政治', value: '政治', hasChildren: true },
            ]);
          }, 1400);
        }
        const random = Math.random() * 10;
        if (random > 8) {
          return reject('失败了，请重新点击');
        }
        setTimeout(() => {
          resolve([
            {
              key: '法学2',
              title: '法学2',
              value: '法学2',
              hasChildren: true,
            },
            { key: '监狱学', title: '监狱学', value: '监狱学', isLeaf: true },
          ]);
        }, 1200);
      });
    },
  },
  render() {
    return (
      <div class="demo">
        <Card shadow padding={false}>
          <Card.Header>Basic ({this.value})</Card.Header>
          <TreeSelect
            style="height: 500px"
            value="刑法"
            keyPath={['管理学', '政治', '刑法']}
            loadData={this.loadData} treeData={this.treeData} onLoadError={(error) => {
              Toast.fail(error.toString());
            }}>
            <Skeleton slot="loading" style={{ padding: '10px' }} row rows={3} rowWidth={['100%', '100%', '100%']} />
          </TreeSelect>
        </Card>
        <Card shadow padding={false}>
          <Card.Header>Multiple</Card.Header>
          <TreeSelect
            value={['监狱学', '兵器类']}
            keyPath={['法学', '法学类', '监狱学']}
            onChange={(values: any, params: any) => {
              console.log(values, params);
            }}
            style="height: 500px"
            loadData={this.loadData}
            multiple
            max={2}
            treeData={this.treeData} />
        </Card>
        <Card shadow padding={false}>
          <Card.Header>Icon</Card.Header>
          <TreeSelect
            style="height: 200px"
            keyPath={['法学', '法学类', '法学2', '刑法']}
            value="民族学类"
            unCheckedIcon={null}
            loadData={this.loadData}
            treeData={this.treeData} />
        </Card>
      </div>
    );
  },
});
