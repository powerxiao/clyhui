<template>
  <div class="hello">
 <list-filter>
       <list-filter-item :options="{id:'time',icon:'static/listFilter/time.png',actIcon:'static/listFilter/timeActive.png',item:['时间排序','时间早到晚','时间晚到早']}"></list-filter-item>
        <list-filter-item :options="{id:'price',icon:'static/listFilter/price.png',actIcon:'static/listFilter/priceActive.png',item:['价格排序','价格低到高','价格高到低']}"></list-filter-item>
        <list-filter-item :options="{id:'multiple',icon:'static/listFilter/filter.png',indie:true,item:['筛选']}"></list-filter-item>
        <list-filter-multiple-item :multiple="multiple"></list-filter-multiple-item>
    </list-filter>
  </div>
</template>

<script>
export default {
  name: 'listFilterTest',
  data () {
    return {
      msg: 'listFilterTest',
       multiple:{
         }
    }
  },
  mounted(){

    this.multiple = {
         "transfer":{"title":"直飞/中转","items":["直飞","中转"]},
         "flightTime":{"title":"起飞时段","items":["06:00-11:59","12:00-17:59","18:00-23:59"]},
         "airWays":{"title":"航空公司","items":["东航","国航","川航","西藏","上航"]},
         "cabins":{"title":"舱位","items":["经济舱"]}
         };

  },
  created(){
       this.$on('listFilterOut', (id,val) => {
         console.log("id",id);
         console.log("val",val);
       })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
