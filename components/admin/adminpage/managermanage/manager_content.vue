<template>
  <div>
    <Modal
      v-model="modal1"
      style="width:800px"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div style="width:100%;height:400px">
        <no-ssr>
          <cropper
            ref="cropper"
            :img="fileSrc"
            :canMoveBox="true"
            :outputSize="1"
            :fixed="true"
            :canScale="true"
            :fixedNumber="[5, 5]"
            :autoCrop="true"
            :centerBox="true"
          >
          </cropper>
        </no-ssr>
      </div>
    </Modal>
    <Drawer
      :title="changeadminFormTitle"
      width="600"
      :closable="false"
      v-model="value2"
    >
      <Form
        :model="changeadminForm"
        :label-width="80"
        :rules="managerruleValidate"
        ref="managerValidate"
      >
        <FormItem label="ID">
          <Input
            v-model="changeadminForm.id"
            disabled
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="姓名"
          prop="name"
        >
          <Input
            v-model="changeadminForm.name"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="邮箱账号"
          prop="email"
        >
          <Input
            v-model="changeadminForm.email"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="手机号码"
          prop="phonenumber"
        >
          <Input
            v-model="changeadminForm.phonenumber"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="工资"
          prop="wages"
        >
          <Input
            v-model="changeadminForm.wages"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem
          label="性别"
          prop="radio"
        >
          <RadioGroup v-model="changeadminForm.radio">
            <Radio label="1">男</Radio>
            <Radio label="0">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="密码"
        >
          <Input
            v-model="changeadminForm.password"
            placeholder="不填默认密码：123456789"
          ></Input>
        </FormItem>
        <FormItem
          label="照骗"
          prop="photo"
        >
          <Upload
            :before-upload="before"
            v-model="changeadminForm.photo"
            action=""
          >
            <Avatar
              shape="square"
              style="width: 180px; height: 180px"
              :src="fileSrc"
            >
              <Icon
                type="ios-cloud-upload"
                size="100"
                style="color: #fff; padding: 20px 0"
              ></Icon>
              <h3>点击此处上传图片</h3>
            </Avatar>
          </Upload>
          <Button
            icon="ios-close"
            @click="deletepic()"
          >删除</Button>
        </FormItem>
        <Divider></Divider>
        <FormItem>
          <Button
            type="primary"
            @click="changeadminSubmit()"
          >题交</Button>
        </FormItem>
      </Form>
    </Drawer>
    <Card class="manage_card">
      <Tabs>
        <TabPane label="查询管理员">
          <Input
            v-model="searchadminForm.inputphonenumber"
            search
            enter-button
            @on-search="searchadminSubmit"
            placeholder="基于手机号查询哦"
            style="margin:20px 0"
          />
        </TabPane>
      </tabs>
      <Table
        border
        height="700"
        :columns="peopleColumns"
        :data="admins"
      >
        <template
          slot-scope="{ row }"
          slot="id"
        >
          <strong>{{ row.id }}</strong>
        </template>
        <template
          slot-scope="{ row, index }"
          slot="action"
        >
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="changeForm(index)"
          >修改信息</Button>
          <Button
            type="error"
            size="small"
            :disabled="!ismyself(index)"
            @click="remove(index)"
          >删除</Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import axios from 'axios'
import rules from '../rules'
import expandRow from './managerexpand';
export default {
  components: {
    expandRow
  },
  mixins: [rules],
  props: {
    admins: Array,
    infos: Array
  },
  data () {
    return {
      changeadminForm: {
        name: '',
        wages: null,
        email: '',
        phonenumber: '',
        radio: '',
        photo: ''
      },
      searchadminForm: {

      },
      peopleColumns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '性别',
          key: 'sex',
          render: (h, params) => {
            if (params.row.sex) {
              return h('p', '男')
            } else {
              return h('p', '女')
            }
          }
        },
        {
          title: '工作日期（月/日/年）',
          key: 'workdate'
        },
        {
          title: '薪资',
          key: 'wages'
        },
        {
          title: '是否为超级管理员',
          key: 'type'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 250,
          align: 'center'
        }
      ],
      value2: false,
      changeadminFormTitle: '',
      file: null,
      fileSrc: null,
      isself: false,
      modal1: false
    }
  },
  methods: {
    ismyself (index) {
      if (this.infos[0].id === this.admins[index].id) {
        return false
      } else {
        return true
      }
    },
    cancel () {
      this.changeadminForm.photo = null
      this.fileSrc = null
      this.modal1 = false
    },
    ok () {
      this.$refs.cropper.getCropData((data) => {
        this.fileSrc = data
        this.changeadminForm.photo = data
      })
    },
    async remove (index) {
      let formData = new FormData()
      formData.append('submitID', this.admins[index].id)
      let { status, data: { code, msg, removeID } } = await this.$axios.post(`/manager/manager_manage/removeadmin`, formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      if (status === 200 & code === 0) {
        this.admins.splice(index, 1)
        this.$Message.success('删除成功')
      }
    },
    searchadminSubmit: async function () {
      let self = this
      let formData = new FormData()
      formData.append('adminphonenumber', self.searchadminForm.inputphonenumber)
      this.$emit('searchAdminSubmit', formData)
    },
    changeForm (index) {
      this.value2 = true
      this.changeadminFormTitle = `${this.admins[index].name}` + '的信息修改'
      this.changeadminForm.id = this.admins[index].id
      this.changeadminForm.name = this.admins[index].name
      this.changeadminForm.phonenumber = this.admins[index].phonenumber
      this.changeadminForm.email = this.admins[index].email
      this.changeadminForm.wages = this.admins[index].wages
      this.changeadminForm.radio = this.admins[index].sex ? '1' : '0'
      this.changeadminForm.photo = this.admins[index].photo
      this.fileSrc = this.admins[index].photo
    },
    before (file) {
      this.file = file
      const FileExt = this.file.name.replace(/.+\./, '');//取得文件的后缀名
      if (file.size > 2097152) {
        this.$Message.error(file.name + '大小超过2M!')
        this.file = null //超过大小将文件清空
      } else if (!/image\/\w+/.test(file.type)) { //判断文件
        this.$Message.error('请上传图片老铁');
        this.file = null
      } else {
        const reader = new FileReader() //读取文件的字符流
        reader.readAsDataURL(file)//将文件读取为 DataURL 以data:开头的字符串
        reader.onload = e => {
          // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
          const code = e.target.result;
          console.log(code)
          this.changeadminForm.photo = code
          this.fileSrc = code
          this.modal1 = true
        }
      }
      return false
    },
    deletepic () {
      this.changeadminForm.photo = null
      this.fileSrc = null
    },
    changeadminSubmit: async function () {
      this.$refs.managerValidate.validate(async valid => {
        if (!valid) {
          this.$Message.error('请仔细检查人员信息')
        } else {
          let formData = new FormData()
          let changePassword = ''
          if (!this.changeadminForm.password) {
            changePassword = '123456789'
          } else {
            changePassword = this.changeadminForm.password
          }
          formData.append('adminid', this.changeadminForm.id)
          formData.append('adminname', this.changeadminForm.name)
          formData.append('adminemail', this.changeadminForm.email)
          formData.append('adminphonenumber', this.changeadminForm.phonenumber)
          formData.append('admintype', this.changeadminForm.type)
          formData.append('adminsex', this.changeadminForm.radio)
          formData.append('adminpassword', CryptoJS.MD5(changePassword).toString())
          formData.append('adminwages', parseInt(this.changeadminForm.wages))
          formData.append('adminphoto', this.changeadminForm.photo)
          let { status, data: { code, msg, admin } } = await this.$axios.post(`/manager/manager_manage/changeadmin`, formData, {
            headers: { 'content-type': 'multipart/form-data' }
          })
          if (status === 200 & code === 0) {
            const i = this.admins.findIndex(x => x.id === admin.id)
            if (i !== -1) {
              this.admins.splice(i, 1, admin)
            }
            this.$Message.success('修改成功')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
@import "@/assets/admin/adminmanage.css";
</style>