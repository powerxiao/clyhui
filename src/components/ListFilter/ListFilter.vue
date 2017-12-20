<template>
    <div class="list-filter is-fixed"  >
    <slot></slot>
    </div>
</template>

<script>
 export default {
    name: 'list-filter',
    props:['multiple'],
    data(){
        return {
            value:""
        }
    },
    created () {
        this.$on('singleConfirm', (id,val) => {
            if(id === "multiple"){
                this.$children[this.$children.length-1].isShow = true;
            }else{
                this.value = id;
				this.$parent.$emit("listFilterOut", id,val.substr(val.length-1));
            }
        });

        this.$on('multipleConfirm', (id,multipleSel) => {
             this.$parent.$emit("listFilterOut", id,multipleSel);
        });
    }

 }
</script>

<style>
.list-filter.is-fixed {
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 1;
}
.list-filter {
    border-top:1px solid #D7D7D7;
    background-position: 0 0;
    position: relative;
    background-color: #fafafa;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    text-align: center;
}

.list-filter>.list-filter-item.is-selected {
    background-color: #eaeaea;
    color: #26a2ff;
}

.list-filter>.list-filter-item {
    color: #999;
}
</style>
