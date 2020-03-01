import { VueConstructor } from 'vue';
import locale from './locale';
import Icon from './Icon';
import Button from './Button';
import Lazyload from './Lazyload';
import Grid from './Grid';
import Image from './Image';
import Tag from './Tag';
import Sticky from './Sticky';
import Card from './Card';
import Carousel from './Carousel';
import Badge from './Badge';
import DetailItem from './DetailItem';
import Divider from './Divider';
import List from './List';
import Skeleton from './Skeleton';
import Dialog from './Dialog';
import DropMenu from './DropMenu';
import Loading from './Loading';
import Popover from './Popover';
import Result from './Result';
import Toast from './Toast';
import Agree from './Agree';
import Checkbox from './Checkbox';
import Form from './Form';
import Radio from './Radio';
import EntryItem from './EntryItem';
import NavBar from './NavBar';
import Tabbar from './Tabbar';
import Popup from './Popup';
import CheckList from './CheckList';
import RadioList from './RadioList';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';
import Collapse from './Collapse';
import ActionBar from './ActionBar';
import Bottom from './Bottom';
import Select from './Select';
import NoticeBar from './NoticeBar';
import Input from './Input';
import Cascader from './Cascader';
import Tabs from './Tabs';

const components = [
  Icon,
  Button,
  Grid,
  Lazyload,
  Image,
  Tag,
  Sticky,
  Card,
  Carousel,
  Badge,
  DetailItem,
  Divider,
  List,
  Skeleton,
  Dialog,
  DropMenu,
  Loading,
  Popup,
  Popover,
  Result,
  Toast,
  Agree,
  Checkbox,
  Form,
  Radio,
  EntryItem,
  NavBar,
  Tabbar,
  CheckList,
  RadioList,
  CheckboxGroup,
  RadioGroup,
  Collapse,
  ActionBar,
  Bottom,
  Select,
  NoticeBar,
  Input,
  Cascader,
  Tabs,
];

// global use ui library
const install = (Vue: VueConstructor) => {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

export {
  locale,
  Icon,
  Button,
  Grid,
  Lazyload,
  Image,
  Tag,
  Sticky,
  Card,
  Carousel,
  Badge,
  DetailItem,
  Divider,
  List,
  Dialog,
  DropMenu,
  Loading,
  Popover,
  Popup,
  Result,
  Toast,
  Agree,
  Checkbox,
  Radio,
  Form,
  EntryItem,
  NavBar,
  Tabbar,
  CheckList,
  RadioList,
  CheckboxGroup,
  RadioGroup,
  Skeleton,
  Collapse,
  ActionBar,
  Bottom,
  Select,
  NoticeBar,
  Input,
  Cascader,
  Tabs,
};

export * from './Icon';
export * from './Button';
export * from './Grid';
export * from './Lazyload';
export * from './Image';
export * from './Tag';
export * from './Sticky';
export * from './Card';
export * from './Carousel';
export * from './Badge';
export * from './DetailItem';
export * from './Divider';
export * from './List';
export * from './Dialog';
export * from './DropMenu';
export * from './Loading';
export * from './Popup';
export * from './Popover';
export * from './Toast';
export * from './Radio';
export * from './Checkbox';
export * from './Agree';
export * from './Form';
export * from './EntryItem';
export * from './NavBar';
export * from './Tabbar';
export * from './CheckList';
export * from './RadioList';
export * from './CheckboxGroup';
export * from './RadioGroup';
export * from './Skeleton';
export * from './Collapse';
export * from './ActionBar';
export * from './Bottom';
export * from './Select';
export * from './NoticeBar';
export * from './Input';
export * from './Cascader';
export * from './Tabs';
export * from './types';
export * from './vueTypes';

export default {
  install,
}

