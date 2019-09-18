<template>
    <div class="filter-container">
      <el-input placeholder="Title" style="width: 200px;" class="filter-item" />

      <el-button  class="filter-item" type="primary" icon="el-icon-search" >
        查询
      </el-button>

      <el-button  class="filter-item" type="info" icon="el-icon-refresh" >
        重置
      </el-button>
    </div>
</template>

<script>
// 封装一个简单的查询
export default {
   data() {
     return{
        seach:{
            input:[{label:'角色名称',value:'',placeholder:'title'}],
            select:[{label:'角色名称',value:'',placeholder:'title',list:[]}],
        }
     }
   },
}
</script>
