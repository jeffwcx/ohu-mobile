import { componentFactoryOf } from 'vue-tsx-support';
import { prefix } from '../_utils/shared';


const baseSearchName = `${prefix}search`;
const Search = componentFactoryOf().create({
  name: baseSearchName,
  render() {
    return (
      <div></div>
    );
  },
});

export default Search;
