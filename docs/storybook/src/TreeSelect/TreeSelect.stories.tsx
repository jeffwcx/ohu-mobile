import docs from '@/TreeSelect/README.md';
import Vue from 'vue';
import Card from '@/Card';
import '@/Card/style';
import Toast from '@/Toast';
import '@/Toast/style';
import TreeSelect, { TreeNode, InternalTreeNode } from '@/TreeSelect';
import '@/TreeSelect/style';
// import {  } from '~/icons/index';


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
          title: '法学',
          value: '法学',
          children: [
            {
              title: '法学类',
              value: '法学类',
              hasChildren: true,
            },
            { title: '公安学类', value: '公安学类' },
            { title: '马克思主义理论类', value: '马克思主义理论类' },
            { title: '社会学类', value: '社会学类' },
            { title: '民族学类', value: '民族学类', isLeaf: true },
            { title: '政治学类', value: '政治学类' },
          ],
        },
        {
          title: '工学',
          value: '工学',
          children: [
            { title: '兵器类', value: '兵器类' },
            { title: '材料类', value: '材料类', isLeaf: true },
            { title: '测绘类', value: '测绘类', isLeaf: true },
          ],
        },
        {
          title: '管理学',
          value: '管理学',
          hasChildren: true,
        },
        {
          title: '理学',
          value: '理学',
        },
      ] as TreeNode[],
    };
  },
  methods: {
    loadData(node: InternalTreeNode): Promise<TreeNode[]> {
      return new Promise((resolve, reject) => {
        const random = Math.random() * 10;
        if (random > 8) {
          return reject('失败了，请重新点击');
        }
        setTimeout(() => {
          resolve([
            {
              title: '法学',
              value: '法学',
              children: [
                { title: '刑法', value: '刑法', isLeaf: true },
              ],
            },
            { title: '监狱学', value: '监狱学', isLeaf: true },
          ]);
        }, 100);
      });
    },
  },
  render() {
    return (
      <div class="demo">
        <Card shadow padding={false}>
          <Card.Header>Basic ({this.value})</Card.Header>
          <TreeSelect value={this.value} style="height: 500px" loadData={this.loadData} treeData={this.treeData} onLoadError={(error) => {
            Toast.fail(error.toString());
          }}></TreeSelect>
        </Card>
        <Card shadow padding={false}>
          <Card.Header>Multiple</Card.Header>
          <TreeSelect value={['材料类', '监狱学']} style="height: 500px" loadData={this.loadData} multiple treeData={this.treeData}></TreeSelect>
        </Card>
        <Card shadow padding={false}>
          <Card.Header>Icon</Card.Header>
          <TreeSelect value={this.value} unCheckedIcon={null} style="height: 500px" treeData={this.treeData}></TreeSelect>
        </Card>
      </div>
    );
  },
});
