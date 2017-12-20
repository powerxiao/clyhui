<template>
  <a class="list-filter-item"
    @click="itemClick"
    :class="{ 'is-selected': $parent.value === options.id }">
    <div class="list-filter-item-icon"><img :src="(sortLabel === options.id+'0')? options.icon:options.actIcon"></div>
    <div class="list-filter-item-label">
        <span v-for="(item,i) in options.item"   :class="[sortLabel===(options.id+i) ? 'show' : 'hide']">{{item}}</span>
    </div>
  </a>
</template>
<script>
export default {
  name: "list-filter-item",
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return { sortLabel: "" };
  },
  created() {
    this.sortLabel = this.options.id + "0";
  },
  mounted() {},
  methods: {
    itemClick: function() {
      let lastChar = "0";
	  if(this.options.id !=="multiple"){
		  let itemLen = this.options.item.length;
		  if (this.$parent.value === this.options.id) {
			    lastChar = this.sortLabel.substr(this.sortLabel.length - 1);
		  } else {
			
			  var that = this;
			  this.$parent.$children.forEach(function(item) {
				if(typeof item.options!=="undefined"){
					if (item.options.id !== that.options.id) {
					item.sortLabel = item.options.id + "0";
					}
				}
			  });
		  }
		  let index = (parseInt(lastChar) + 1) % itemLen;
		  this.sortLabel = this.options.id + (index===0?1:index);
	  }else{
		this.sortLabel = "multiple0";
	  }
	  
      this.$parent.$emit("singleConfirm", this.options.id,this.sortLabel);

    }
  }
};
</script>

<style>
.list-filter-item {
  display: block;
  padding: 7px 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-decoration: none;
}
.list-filter-item-icon {
  width: 24px;
  height: 24px;
  margin: 0 auto 5px;
}
.list-filter-item-icon > * {
  display: block;
  width: 100%;
  height: 100%;
}
.list-filter-item-label {
  color: inherit;
  font-size: 12px;
  line-height: 1;
}
.show {
  display: block;
}
.hide {
  display: none;
}
</style>
