
 import ListFilter from './components/ListFilter';
 import ListFilterItem from './components/ListFilterItem';
 import ListFilterMultipleItem from './components/ListFilterMultipleItem';
	

const clbet = {
	ListFilter,
	ListFilterItem,
	ListFilterMultipleItem
};
const install = function(Vue, opts = {}) {
        Vue.component(ListFilter.name, ListFilter);
        Vue.component(ListFilterItem.name, ListFilterItem);
        Vue.component(ListFilterMultipleItem.name, ListFilterMultipleItem);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default Object.assign(clbet, {install}); 
