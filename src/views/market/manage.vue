<template>
  <el-row class="main">
    <el-col :span="4" class="left" > 
        <el-row class="heard-icon">
            <el-col :span="18">所属分类</el-col>
            <el-col :span="3">
                 <i class="el-icon-arrow-down pointer"></i>
            </el-col>
            <el-col :span="3">
                 <i class="el-icon-refresh pointer"></i>
            </el-col>
        </el-row>
        <el-tree
            class="app-container"
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
        ></el-tree>
    </el-col>
    <el-col :span="20"  class="app-container">
    <el-form :inline="true" :model="formInline" class="form-inline" ref="formInline">
        <el-form-item label="商品编号:"  prop="name">
            <el-input v-model="formInline.name" placeholder="登陆名称" ></el-input>
        </el-form-item>
        <el-form-item label="商品名称:"  prop="moblie">
            <el-input v-model="formInline.moblie" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="success" round @click="hanldeClick">查询</el-button>
            <el-button type="info" round @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
    </el-form>
    <article class="table">
    <el-button type="success">新增</el-button>
    <el-table :data="rolesList" class="table-list">
        <el-button type="primary">主要按钮</el-button>
      <el-table-column align="center" label="商品编号">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="品牌">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存">
       <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="市场价(零售价)">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="本店价(供货价)">
        <template slot-scope="scope">
            <el-switch
                v-model='scope.row.name'
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </template>
      </el-table-column>
         <el-table-column align="header-center" label="是否上架">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
        <el-table-column align="header-center" label="商品排序">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
        <el-table-column align="header-center" label="是否推荐">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
         <el-table-column align="header-center" label="是否新品">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="操作">
        <template slot-scope="scope">
             <el-button type="primary" size="small" @click="handleEdit(scope)">规格属性</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </article>
    </el-col>
  </el-row>
</template>


<script>

export default {
        data() {
      return {
        formInline: {
          name: '',
          moblie:'',
          status: '',
          time:''
        },
        rolesList: [{key:'01001'}],
          data: [{
          label: '主管',
          children: [{
            label: '组长',
            children: [{
              label: '成员'
            }]
          }]
        }, {
          label: '市场',
          children: [{
            label: '销售',
            children: [{
              label: '买西瓜'
            }]
          }, {
            label: '2层销售',
            children: [{
              label: '卖香瓜'
            }]
          }]
        }, {
          label: '经理',
          children: [{
            label: '注释',
            children: [{
              label: '阿源'
            }]
          }, {
            label: '效果',
            children: [{
              label: '阿萨'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }

      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      hanldeClick(){
          
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.$message('重置成功');
      }

    }
}
</script>


<style scoped>
    .heard-icon{
        padding: 14px;  
        border-bottom: 1px solid #eee;
    }

    .main{
        min-width: 1300px;
    }

    .pointer{
        cursor: pointer;
    }

    .form-inline{
        width: 100%;
        background: #fff;
        border-radius: 6px;
        margin-top: 10px;
        padding-top: 12px;
        padding-left: 15px;
        padding-bottom: 8px;
        box-shadow: 1px 1px 3px rgba(0,0,0,.2);
    }

    .left{
        border: 1px solid #eee;
        min-height: calc(100vh - 100px);
        box-shadow: 4px 4px 40px #f5f5f5;
    }

    .table{
        min-height: calc(80vh - 138px);
        padding: 11px 10px 12px 10px;
        margin-top: 10px;
        box-shadow: 1px 1px 3px rgba(0,0,0,.2);
    }

    .table-list{
        margin-top: 10px;
    }
    .container{
        display: flex;
    }

</style>
