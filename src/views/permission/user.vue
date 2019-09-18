<template>
  <el-row class="main">
    <el-col :span="4" class="left" > 
        <el-row class="heard-icon">
            <el-col :span="18">组织机构</el-col>
            <el-col :span="3">
                 <i class="el-icon-arrow-down pointer"></i>
            </el-col>
            <el-col :span="3">
                 <i class="el-icon-refresh pointer"></i>
            </el-col>
        </el-row>
        <el-tree
            class="app-container"
            :props="defaultProps"
            @node-expand="treeExpand"
            @node-collapse="treeCollapse"
            @node-click='nodeClick'
            :data="data"
            node-key="id"
            :expand-on-click-node="false"
            :render-content="renderContent"
        >
        </el-tree>
    </el-col>
    <el-col :span="20"  class="app-container">
    <el-form :inline="true" :model="formInline" class="form-inline" ref="formInline">
        <el-form-item label="登陆名称:"  prop="name">
            <el-input v-model="formInline.name" placeholder="登陆名称" ></el-input>
        </el-form-item>
        <el-form-item label="手机号码:"  prop="moblie">
            <el-input v-model="formInline.moblie" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="用户状态:" prop="status">
            <el-select v-model="formInline.status" placeholder="活动区域">
                <el-option label="所有" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="停用" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="创建时间:" prop="time">
            <el-date-picker
                v-model="formInline.time"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']"
                style="width: 325px;"
            >
            </el-date-picker>
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
      <el-table-column align="center" label="用户ID">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录名称" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="部门">
       <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="手机">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户状态">
        <template slot-scope="scope">
            <el-switch
                v-model='scope.row.name'
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </template>
      </el-table-column>
         <el-table-column align="header-center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="操作">
        <template slot-scope="scope">
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
import SeachHeard from './components/SeachHeard'
import _ from 'lodash'

export default {
    name: 'UserPermission',
    components: { SeachHeard },
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
          id:'1',
          icon:"closefile",
          children: [{
            label: '组长',
            id:'1-2',
                      icon:"closefile",
            children: [{
              label: '成员',
                id:'1-2-1',
            }]
          }]
        }, {
          label: '市场',
           id:'2',
                     icon:"closefile",
          children: [{
            label: '销售',
                      icon:"closefile",
               id:'2-1',
            children: [{
              label: '买西瓜',
                id:'2-1-1',
              isLeaf:true
            }]
          }, {
            label: '2层销售',
                      icon:"closefile",
               id:'2-2',
            children: [{
              label: '卖香瓜',
                id:'2-2-1',
            }]
          }]
        }, {
          label: '经理',
                    icon:"closefile",
            id:'3',
          children: [{
            label: '注释',
               id:'3-1',
                         icon:"closefile",
            children: [{
              label: '阿源',
                id:'3-1-1',
            }]
          }, {
            label: '效果',
                      icon:"closefile",
              id:'3-2',
            children: [{
              label: '阿萨',
               id:'3-2-1',
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
    /**
      * 自定义树形中间数据
      */
      renderContent(h, { node, data, store }){
        let icon ='closefile';
        if(node.data.icon){
          icon=node.data.icon;
        }
        
         return (
              <span class="custom-tree-node">
                <svg-icon icon-class={node.data.icon?node.data.icon:'file'} />
                <span style="margin-left:5px;">{node.label}</span>
              </span>
            );
      },

      /*
      * 递归更改数据
      */
      recursion(data,id,param){
          data.forEach(item=>{
            let icon =param
            if(item && item.children && item.children.length>0){
              // 递归更改自己数据(全量查询)
              this.recursion(item.children,id,icon) 
            }

            if(item.isLeaf){
              icon='file'
            }

  
            if(item.id === id){
              // vue 中存在无法识别的的种类, 此处用vue内部的方法处理
              this.$set(item, 'icon', icon);
              item.icon=param;
            }
           
          })
      },

     /**
      * 树节点点击事件
      */
      nodeClick(ob,node,e){
        console.log('nodeClick',ob,node,e);
      },

      /** 
       * 树展开事件
       * @description ob 数组中的指定对象; Node:当前节点; key:event对象
      */
      treeExpand(ob,Node,key){
        const id=ob.id;
        const orileData =this.data;
        this.recursion(orileData,id,'openfile');
      },

      /*
      * 树展开事件
      */
      treeCollapse(ob,Node,key){
        const id=ob.id;
        const orileData =this.data;
        this.recursion(orileData,id,'closefile')

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
