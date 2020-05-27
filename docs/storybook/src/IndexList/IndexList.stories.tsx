import docs from '@/IndexList/README.md';
import { component } from 'vue-tsx-support';
import IndexList from '@/IndexList';
import '@/IndexList/style';
import Icon from '@/Icon';
import '@/Icon/style';
import Dialog from '@/Dialog';
import '@/Dialog/style';
import { MapPinOutlined } from '~/icons/index';
import Checkbox from '@/Checkbox';
import '@/Checkbox/style';

export default {
  title: 'Components|Navigation/IndexList',
  parameters: {
    component: IndexList,
    options: {
      showPanel: true,
    },
    notes: { markdown: docs }
  },
};


export const basic = () => component({
  data() {
    return {
      data: [
        { text: '人工智能', minorText: '南京大学', key: '1'  },
        { text: '科技与创新设计试验班', minorText: '浙江大学', key: '2'  },
        { text: '经济管理试验班', minorText: '南京大学', key: '3'   },
        { text: '国际经济与贸易', minorText: '上海财经大学', key: '4'   },
        { text: '软件工程', minorText: '南京大学', key: '5'   },
        { text: '建筑学', minorText: '华南理工大学', key: '6'   },
        { text: '会计学', minorText: '厦门大学', key: '7'   },
        { text: '社会科学试验班', minorText: '浙江大学', key: '8'   },
        { text: '法学', minorText: '武汉大学', key: '9'  },
        { text: '人工智能', minorText: '南京大学', key: '10'  },
        { text: '科技与创新设计试验班', minorText: '浙江大学', key: '11'  },
        { text: '经济管理试验班', minorText: '南京大学', key: '12'  },
        { text: '国际经济与贸易', minorText: '上海财经大学', key: '13'  },
        { text: '软件工程', minorText: '南京大学', key: '14'  },
        { text: '建筑学', minorText: '华南理工大学', key: '15'  },
        { text: '会计学', minorText: '厦门大学', key: '16'  },
        { text: '社会科学试验班', minorText: '浙江大学', key: '17'  },
        { text: '法学', minorText: '武汉大学', key: '18'  },
        { text: '人工智能', minorText: '南京大学', key: '19'  },
        { text: '科技与创新设计试验班', minorText: '浙江大学', key: '20'  },
        { text: '经济管理试验班', minorText: '南京大学', key: '21'  },
        { text: '国际经济与贸易', minorText: '上海财经大学', key: '22'  },
        { text: '软件工程', minorText: '南京大学', key: '23'  },
        { text: '建筑学', minorText: '华南理工大学', key: '24'  },
        { text: '会计学', minorText: '厦门大学', key: '25'  },
        { text: '社会科学试验班', minorText: '浙江大学', key: '26'  },
        { text: '法学', minorText: '武汉大学', key: '27'  },
      ],
      enableIndex: true,
    };
  },
  methods: {
    remove(index: number) {
      this.data.splice(index, 1);
    },
  },
  render() {
    const chunks = Math.ceil(this.data.length / 5);
    return (
      <div class="demo">
        <Checkbox v-model={this.enableIndex}>enableIndex</Checkbox>
        <IndexList
          onSelect={({ index, group }) => {
            console.log(index, group);
          }}
          enableIndex={this.enableIndex}
          scopedSlots={{
            anchor: ({ index }) => {
              if (index === -1) {
                return <Icon type={MapPinOutlined} />
              }
              return index.toString();
            },
          }}>
          <IndexList.Group subheader={false} index={-1} title="快速定位">
            <p>前置内容</p>
          </IndexList.Group>
          {
            new Array(chunks).fill(0).map((_, index) => {
              const currentIndex = index * 5 + 1;
              const currentStr = currentIndex.toString().padStart(2, '0');
              const endIndex = currentIndex + 4;
              const endStr = endIndex.toString().padStart(2, '0');
              return (
                <IndexList.Group
                  index={currentStr}
                  title={currentStr + '-' + endStr}>
                  {
                    this.data.slice(currentIndex - 1, currentIndex + 4).map((item, index) => {
                      return (
                        <IndexList.Item
                          key={item.key}
                          onClick={() => {
                            Dialog.confirm({
                              title: '确认删除',
                              onOk: () => {
                                this.remove(currentIndex - 1);
                              },
                            });
                          }}
                          button
                          text={item.text} minorText={item.minorText}>
                        </IndexList.Item>
                      );
                    })
                  }
                </IndexList.Group>
              );
            })
          }
        </IndexList>
      </div>
    );
  },
});
