<template>
  <div class="list-filter-multiple" :class="isShow?'show':'hide'" >
  <div class="list-filter-query" >
    <div class="row select-operate">
      <span class="colum-5  color-gray1" v-on:click="cancel">取消</span>
      <span class="col color-gray1" v-on:click="clear">重置</span>
      <span class="colum-5 color-main" v-on:click="confirm">确定</span>
    </div>
    <div class="row ">
      <ul class="colum-3 select-type text-left font14">
        <li v-for="(item,key) in multiple" 
            :class="lefActive === key?'active':''" 
            v-on:click="lefClick(key)" >{{item.title}} <span :class="point[key]?'point':''"></span></li>
      </ul>
      <div class="col select-list filterDetail font14">
        <ul v-for="(item,key) in multiple" :class="rigActive === key?'show':'hide' "  class="pad-left10">
          <li >
            <label class="list-filter-title">不限
             <span class="cl-checkbox"><input  type="checkbox"  class="cl-checkbox-input" v-model="noCheckItem" v-on:click="noCheckFun(key,$event)" :value="key"   > <span class="cl-checkbox-core"></span></span>
            </label>
           </li>
           <li v-for="per in item.items"  >
           <label class="list-filter-title">
              {{per}}
              <span class="cl-checkbox"><input  type="checkbox"  v-model="checkItem"  class="cl-checkbox-input"  v-on:click="checkItemFun(key+'_'+per,$event)" :value="key+'_'+per" > <span class="cl-checkbox-core"></span></span>
           </label>
          </li>
        </ul>
      </div>
  </div>
</div>
</div>
</template>
<script>
import "../../styles/base.css"
export default {
  name: 'list-filter-multiple-item',
  props: {
    multiple:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      lefActive:"",
      rigActive:"",
      isShow:false,
      checkItem:[],
      noCheckItem:[],
      point:{}
    }
  },
  created () {
    
  },
  mounted(){
     
  },
  methods:{
    lefClick:function(key){
      this.rigActive = key;
      this.lefActive=key;
    },
    cancel:function(){
      this.isShow = false;
    },
    clear:function(){
      this.checkItem = [];
      this.noCheckItem = Object.keys(this.multiple);
    },
    confirm:function(){
      this.isShow = false;
      this.$parent.$emit('multipleConfirm','multiple',this.checkItem);
    },
    noCheckFun:function(key){
      let checkItemTmp = [];
      let that = this;
      let state = event.currentTarget.checked;
      if(state){
		    this.noCheckItem.push(key);
        this.checkItem.forEach(function(item){
          if(item.indexOf(key) === -1){
            checkItemTmp.push(item);
          }
        });
         this.checkItem = checkItemTmp;
      }else{
        this.noCheckItem.push(key);
      }

      // 小点初始化
      for(var key in this.point){
        if(this.noCheckItem.join(",").indexOf(key)>-1){
          this.point[key]=false;
        }else{
          this.point[key]=true;
        }
      }
    },
    checkItemFun:function(key){
      let map = {},
          noCheckItemTmp = [],
          state = event.currentTarget.checked;
     
      if(state){
	    this.checkItem.push(key);
        this.noCheckItem.forEach(function(item){
          if(key.indexOf(item)===-1){
            noCheckItemTmp.push(item);
          }
        });
        this.noCheckItem = noCheckItemTmp;
      }else{
		for(let i = 0,len =this.checkItem.length;i<len;i++ ){
			if(this.checkItem[i] === key){
				this.checkItem.splice(i,1);
				break;
			}
		}
		
      if(!this.checkItem.find((n) => n!==key&&n.indexOf(key.split('_')[0])>-1)){
          this.noCheckItem.push(key.split("_")[0]);
        };
      }

      // 小点初始化
      for(var key in this.point){
        if(this.noCheckItem.join(",").indexOf(key)>-1){
          this.point[key]=false;
        }else{
          this.point[key]=true;
        }
      }
     

    }
  },
  watch:{
    multiple(){
         this.lefActive = Object.keys(this.multiple)[0];
         this.rigActive = Object.keys(this.multiple)[0];
         this.noCheckItem = Object.keys(this.multiple);
         var that = this;
         Object.keys(this.multiple).forEach(function(item){
            that.point[item] = false;
         });
    }
  }
};
</script>

<style>

.cl-checkbox{
    position: absolute;
    right: 8%;
}
.cl-checkbox-input {
    display: none;
}

.cl-checkbox-input:checked+.cl-checkbox-core {
    background-color: #26a2ff;
    border-color: #26a2ff;
}
.cl-checkbox-core {
    display: inline-block;
    background-color: #fff;
    border-radius: 100%;
    border: 1px solid #ccc;
    position: relative;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    transition: border-color .2s ease-in-out,background-color .2s ease-in-out;
}

.cl-checkbox-core:after {
   content: "";
    display: table;
    width: 5px;
    height: 10px;
    position: absolute;
    top: 2px;
    left: 6px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(1);
    transition: all .2s ease-in-out;

}

.list-filter-multiple{
  position: absolute;
  z-index: 999999;
  background: #ffffff;
   width: 100%;
   bottom: 0px;
}

.list-filter-multiple .filterDetail{
	height: 204px;
    overflow: auto;
    position: relative;
}
.list-filter-query {
    font-size: 16px;
    line-height: 50px;
    min-height: 100%;
    max-width: 768px;
    min-width: 300px;
    margin: 0 auto;
    position: relative;
    overflow-x: hidden;
}
.list-filter-title{
  width:100%;
  display: block;
}

.list-filter-query .select-operate {
    text-align: center;
    border-bottom: 1px solid #DEDEDE;
    border-top: 1px solid #DEDEDE;
    line-height: 50px;
    justify-content: flex-start;
    -moz-box-align: flex-start;
    -webkit-box-align: flex-start;
    align-items: flex-start;
}

.list-filter-query .row {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    width: 100%;
}

.list-filter-query .color-main {
    color: #119DEE;
}

.list-filter-query .colum-5 {
    width: 20%;
    -webkit-box-flex: 0 0 20%;
    -moz-box-flex: 0 0 20%;
    -webkit-flex: 0 0 20%;
    -ms-flex: 0 0 20%;
    flex: 0 0 20%;
    display: block;
}
.list-filter-query .row {
    -moz-box-align: start;
    -webkit-box-align: start;
    align-items: flex-start;
}

.list-filter-query .select-type {
    background-color: #F0F0F0;  
}
.list-filter-query .colum-3 {
    width: 33.33333%;
    -webkit-box-flex: 0 0 33.33333%;
    -moz-box-flex: 0 0 33.33333%;
    -webkit-flex: 0 0 33.33333%;
    -ms-flex: 0 0 33.33333%;
    flex: 0 0 33.33333%;
    display: block;
}

.list-filter-query .select-type li {
    padding-left: 12%;
    position: relative;
}

.list-filter-query .select-type .active {
    background-color: #fff;
    border-top: 1px solid #ECECEC;
    border-bottom: 1px solid #ECECEC;
}

.list-filter-query .select-type li:first-child.active {
    border-top: 0;
}

.list-filter-query .select-type {
    background-color: #F0F0F0;
}

.list-filter-query .select-list {
    background-color: #fff;
    padding-left: 8%;
}
.list-filter-query .col {
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: block;
}
.list-filter-query .select-list input[type=checkbox] {
    position: absolute;
    right: 10%;
    margin-top: 12px;
    width: 22px;
    height: 22px;
    z-index: 1;
    border: 2px solid #4CA4FF;
}

.list-filter-query .select-list li {
    text-align: left;
    border-bottom: 1px solid #ECECEC;
    padding-left: 5px;
}


.list-filter-query  .point{
    width: 5px;
    height: 5px;
    border-radius: 3px;
    display: block;
    background: #119DEE;
    top: 23px;
    right: 12%;
    position: absolute;
}
</style>
