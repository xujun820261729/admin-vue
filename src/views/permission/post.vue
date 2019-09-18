<template>
  <div class="app-container">
      <el-form :inline="true" :model="formInline" class="form-inline" ref="formInline">
        <el-form-item label="岗位编码:"  prop="name">
            <el-input v-model="formInline.name" placeholder="登陆名称" ></el-input>
        </el-form-item>
        <el-form-item label="岗位名称:"  prop="moblie">
            <el-input v-model="formInline.moblie" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="岗位状态:" prop="status">
            <el-select v-model="formInline.status" placeholder="活动区域">
                <el-option label="所有" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="停用" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="success" round >查询</el-button>
            <el-button type="info" round>重置</el-button>
        </el-form-item>
    </el-form>

  <article class="table">
     <el-button type="success">新增</el-button>
    <el-table :data="rolesList"  class="table-list">
      <el-table-column align="center" label="岗位编号">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="岗位编码">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="岗位名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
       <el-table-column align="center" label="显示顺序">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
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

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Role Description"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'

const defaultRole = {
    key: '',
    name: '',
    description: '',
    routes: []
}

export default {
    name: 'PostPermission',
    data() {
        return {
            role: Object.assign({}, defaultRole),
            routes: [],
            rolesList: [],
            dialogVisible: false,
            dialogType: 'new',
            checkStrictly: false,
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            numberValidateForm: {
            age: ''
          },
            formInline: {
          name: '',
          moblie:'',
          status: '',
          time:''
        },
        }
    },
    computed: {
        routesData() {
            return this.routes
        }
    },
    created() {
    // Mock: get all routes and roles list from server
        this.getRoutes()
        this.getRoles()
    },
    methods: {
        async getRoutes() {
            const res = await getRoutes()
            this.serviceRoutes = res.data
            this.routes = this.generateRoutes(res.data)
        },
        async getRoles() {
            const res = await getRoles()
            this.rolesList = res.data
        },
        
              submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
        // Reshape the routes structure so that it looks the same as the sidebar
        generateRoutes(routes, basePath = '/') {
            const res = []

            for (let route of routes) {
                // skip some route
                if (route.hidden) { continue }

                const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

                if (route.children && onlyOneShowingChild && !route.alwaysShow) {
                    route = onlyOneShowingChild
                }

                const data = {
                    path: path.resolve(basePath, route.path),
                    title: route.meta && route.meta.title

                }

                // recursive child routes
                if (route.children) {
                    data.children = this.generateRoutes(route.children, data.path)
                }
                res.push(data)
            }
            return res
        },
        generateArr(routes) {
            let data = []
            routes.forEach(route => {
                data.push(route)
                if (route.children) {
                    const temp = this.generateArr(route.children)
                    if (temp.length > 0) {
                        data = [...data, ...temp]
                    }
                }
            })
            return data
        },
        handleAddRole() {
            this.role = Object.assign({}, defaultRole)
            if (this.$refs.tree) {
                this.$refs.tree.setCheckedNodes([])
            }
            this.dialogType = 'new'
            this.dialogVisible = true
        },
        handleEdit(scope) {
            this.dialogType = 'edit'
            this.dialogVisible = true
            this.checkStrictly = true
            this.role = deepClone(scope.row)
            this.$nextTick(() => {
                const routes = this.generateRoutes(this.role.routes)
                this.$refs.tree.setCheckedNodes(this.generateArr(routes))
                // set checked state of a node not affects its father and child nodes
                this.checkStrictly = false
            })
        },
        handleDelete({ $index, row }) {
            this.$confirm('Confirm to remove the role?', 'Warning', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                .then(async() => {
                    await deleteRole(row.key)
                    this.rolesList.splice($index, 1)
                    this.$message({
                        type: 'success',
                        message: 'Delete succed!'
                    })
                })
                .catch(err => { console.error(err) })
        },
        generateTree(routes, basePath = '/', checkedKeys) {
            const res = []

            for (const route of routes) {
                const routePath = path.resolve(basePath, route.path)

                // recursive child routes
                if (route.children) {
                    route.children = this.generateTree(route.children, routePath, checkedKeys)
                }

                if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
                    res.push(route)
                }
            }
            return res
        },
        async confirmRole() {
            const isEdit = this.dialogType === 'edit'

            const checkedKeys = this.$refs.tree.getCheckedKeys()
            this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

            if (isEdit) {
                await updateRole(this.role.key, this.role)
                for (let index = 0; index < this.rolesList.length; index++) {
                    if (this.rolesList[index].key === this.role.key) {
                        this.rolesList.splice(index, 1, Object.assign({}, this.role))
                        break
                    }
                }
            } else {
                const { data } = await addRole(this.role)
                this.role.key = data.key
                this.rolesList.push(this.role)
            }

            const { description, key, name } = this.role
            this.dialogVisible = false
            this.$notify({
                title: 'Success',
                dangerouslyUseHTMLString: true,
                message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
                type: 'success'
            })
        },
        // reference: src/view/layout/components/Sidebar/SidebarItem.vue
        onlyOneShowingChild(children = [], parent) {
            let onlyOneChild = null
            const showingChildren = children.filter(item => !item.hidden)

            // When there is only one child route, the child route is displayed by default
            if (showingChildren.length === 1) {
                onlyOneChild = showingChildren[0]
                onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
                return onlyOneChild
            }

            // Show parent if there are no child route to display
            if (showingChildren.length === 0) {
                onlyOneChild = { ... parent, path: '', noShowingChildren: true }
                return onlyOneChild
            }

            return false
        }
    }
}
</script>

<style lang="scss" scoped>
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

.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
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
}
</style>
