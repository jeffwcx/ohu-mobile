import { defineComponent, props } from '../_utils/defineComponent';
import {
  CascaderProps,
  CascaderEvents,
  CascaderOption,
  CascaderLoadDataFunction,
  CascaderShouldLoadDataFunction,
} from './types';
import RadioList from '../RadioList';
import { CSSProperties } from 'vue';

type FlattenOption = CascaderOption & { name?: string };

function transformToFlattenData(option: CascaderOption): FlattenOption {
  const { children, ...flattenOption } = option;
  const others: { name?: string; children?: CascaderOption[] } = {
    name: option.label,
  };
  if (option.useCollapse) {
    others.children = option.children;
  }
  return Object.assign(flattenOption, others);
}

function getFlattenData(selectedValues: any[], options: CascaderOption[]) {
  // 若value为空，默认加载一层
  const flattenData: FlattenOption[][] = [];
  let currentOptions: CascaderOption[] | null | undefined = options;
  let valueIndex = 0;
  while (currentOptions) {
    const currentValue = selectedValues[valueIndex];
    flattenData.push(currentOptions.map(transformToFlattenData));
    if (currentValue === undefined) {
      currentOptions = null;
    } else {
      const result: CascaderOption | undefined = currentOptions.find(
        (option) => {
          return option.value === currentValue;
        },
      );
      if (!result?.useCollapse) {
        currentOptions = result?.children;
      } else {
        currentOptions = null;
      }
    }
    valueIndex += 1;
  }
  return flattenData;
}

export default defineComponent<CascaderProps, CascaderEvents>(
  'cascader',
).create({
  props: {
    value: props.ofArray<any>().default(() => []),
    options: props<CascaderOption[]>(Array).default(() => []),
    loadData: props<CascaderLoadDataFunction>(Function).optional,
    shouldLoadData: props<CascaderShouldLoadDataFunction>(Function).optional,
    max: props(Number).default(Infinity),
    columns: props(Number).default(2),
  },
  watch: {
    value(current) {
      this.selectedValues = current;
    },
    selectedValues(current) {
      this.currentFlattenData = getFlattenData(current, this.options);
    },
  },
  data() {
    return {
      selectedValues: this.value,
      currentFlattenData: getFlattenData(this.value, this.options),
    };
  },
  methods: {
    handleChange(value: any, index: number) {
      if (this.selectedValues[index] === undefined) {
        this.selectedValues.push(value);
      } else {
        this.selectedValues.splice(index + 1);
        this.$set(this.selectedValues, index, value);
      }
    },
  },
  render() {
    const root = this.$rootCls();
    const panel = root.element('panel');
    const panelStyle: CSSProperties = {
      width: `${100 / this.columns}%`,
    };
    return (
      <div class={root}>
        {this.currentFlattenData.map((options, index) => {
          return (
            <div class={panel} style={panelStyle}>
              <RadioList
                name={`${index}`}
                unCheckedIcon={null}
                value={this.selectedValues[index]}
                options={options}
                paddingDivider={false}
                onChange={(value: any) => {
                  this.handleChange(value, index);
                }}
              ></RadioList>
            </div>
          );
        })}
      </div>
    );
  },
});
