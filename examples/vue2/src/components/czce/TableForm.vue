<template>
  <div class="table-form-wrapper">
    <el-form
      ref="tableForm"
      :model="form"
      label-width="0px"
      size="mini"
      style="width: 100%;"
    >
      <div style="text-align: right; margin: 10px 0;">
        <el-button
          v-if="!isDetail"
          size="mini"
          icon="el-icon-plus"
          @click="handleAdd"></el-button>
        <el-button
          type="primary"
          size="mini"
          :disabled="form.list.length === 0"
          :loading="exportLoading"
          @click="handleExport">导出</el-button>
      </div>
      <el-table
        border
        show-summary
        size="mini"
        :data="form.list"
        :header-cell-style="{background: '#f5f7fa'}"
        :summary-method="getSummaries"
        style="width: 100%"
      >
        <el-table-column
          fix1ed
          type="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="variety"
          label="对应品种"
          align="center">
          <template slot="header">
            <span class="header-label">对应品种</span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.variety'"
              :rules="{ required: true, message: '请输入对应品种', trigger: ['blur', 'change'] }">
              <el-input
                v-model="scope.row.variety"
                placeholder="请输入" 
                :disabled="isDetail"
                style="width: 100%"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="product_name"
          label="商品名称"
          width="140"
          align="center">
          <template slot="header">
            <span class="header-label">商品名称</span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.product_name'"
              :rules="{ required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }">
              <el-input
                :ref="`productName${scope.$index}`"
                v-model="scope.row.product_name"
                type="textarea"
                autosize
                placeholder="请输入" 
                :disabled="isDetail"
                style="width: 100%" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract_buyer"
          label="合同买方"
          width="140"
          align="center">
          <template slot="header">
            <span class="header-label">合同买方</span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.contract_buyer'"
              :rules="{ required: true, message: '请输入合同买方', trigger: ['blur', 'change'] }">
              <el-autocomplete
                :ref="`contractBuyer${scope.$index}`"
                v-model.trim="scope.row.contract_buyer"
                type="textarea"
                autosize
                placeholder="请输入"
                :disabled="isDetail"
                :fetch-suggestions="queryBuyerSearchName"
                style="width: 100%">
              </el-autocomplete>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract_seller"
          label="合同卖方"
          width="140"
          align="center">
          <template slot="header">
            <span class="header-label">合同卖方</span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.contract_seller'"
              :rules="{ required: true, message: '请输入合同卖方', trigger: ['blur', 'change'] }">
              <el-autocomplete
                :ref="`contractSeller${scope.$index}`"
                v-model.trim="scope.row.contract_seller"
                type="textarea"
                autosize
                placeholder="请输入"
                :disabled="isDetail"
                :fetch-suggestions="querySellerSearchName"
                style="width: 100%">
              </el-autocomplete>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="hedge_item_num"
          label="保值商品数量(吨)"
          width="170"
          align="center">
          <template slot="header">
            <span class="header-label">保值商品数量(吨)</span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.hedge_item_num'"
              :rules="{ required: true, message: '请输入保值商品数量', trigger: ['blur', 'change'] }">
              <el-input
                v-model="scope.row.hedge_item_num"
                placeholder="请输入" 
                :disabled="isDetail"
                style="width: 100%"
                @focus="handleFocus(scope.row, 'hedge_item_num')"
                @blur="handleHedgeItemNumBlur(scope.row, 'hedge_item_num')" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="合同单价(元/吨)"
          align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.price'"
              :rules="{ required: false, message: '请输入合同单价', trigger: ['blur', 'change'] }">
              <el-input
                v-model="scope.row.price"
                placeholder="请输入" 
                :disabled="isDetail"
                style="width: 100%" 
                @focus="handleFocus(scope.row, 'price')"
                @blur="handlePriceBlur(scope.row, 'price')" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="delivery_date"
          label="交货日期"
          width="170"
          align="center">
          <template slot="header">
            <span class="header-label">交货日期</span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.delivery_date'"
              :rules="{ required: true, message: '请选择交货日期', trigger: 'change' }">
              <el-date-picker
                v-model="scope.row.delivery_date"
                type="date"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                placeholder="请选择"
                :disabled="isDetail"
                style="width: 100%;"
                :append-to-body="true"
                :offset="0"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="sign_date"
          label="合同签订日期"
          width="170"
          align="center">
          <template slot="header">
            <span class="header-label">合同签订日期</span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.sign_date'"
              :rules="{ required: true, message: '请选择合同签订日期', trigger: 'change' }">
              <el-date-picker
                v-model="scope.row.sign_date"
                type="date"
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                placeholder="请选择"
                :disabled="isDetail"
                style="width: 100%;"
                :append-to-body="true"
                popper-class="custom-popper1-class"
                :offset="170"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract_no"
          label="合同编号"
          align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.contract_no'">
              <el-input
                v-model="scope.row.contract_no"
                placeholder="请输入" 
                :disabled="isDetail"
                style="width: 100%" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="region"
          label="活动区域"
          width="120"
          align="center">
          <template slot="header">
            <span class="header-label">活动区域</span>
          </template>
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.region'"
              :rules="{ required: true, message: '请选择合同签订日期', trigger: 'change' }">
              <el-select
                v-model="scope.row.region"
                placeholder="请选择活动区域"
                style="width: 100%"
                :popper-append-to-body="false"
                popper-class="custom-popper-class">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="140"
          align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="'list.' + scope.$index + '.remark'"
              :rules="{ required: false, message: '请输入备注', trigger: ['blur', 'change'] }">
              <el-input
                :ref="`remark${scope.$index}`"
                v-model="scope.row.remark"
                type="textarea"
                autosize
                placeholder="请输入" 
                :disabled="isDetail"
                style="width: 100%" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          fixe2d="right"
          v-if="!isDetail"
          label="操作"
          width="70px"
          align="center">
          <template slot-scope="{row}">
            <el-button
              @click="handleDel(row)"
              type="text"
              size="mini"
              style="padding: 0">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
const commafy = () => {}
const delcommafy = () => {}
const bigNumberAdd = () => {}

let uuid = 0

export default {
  name: 'TableForm',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    buyerHisList: {
      type: Array,
      default: () => []
    },
    sellerHisList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      form: {
        list: [],
        hedge_item_total_num: ''
      },
      exportLoading: false
    }
  },
  watch: {
    list: {
      handler(newVal) {
        uuid = 0
        this.form.list = newVal.map(item => {
          uuid++
          return {
            ...item,
            uuid: uuid
          }
        })
        
        this.$nextTick(() => {
          this.$refs.tableForm && this.$refs.tableForm.clearValidate()
          this.form.list.forEach((item, index) => {
            this.$refs[`productName${index}`].resizeTextarea()
            this.$refs[`contractBuyer${index}`].$children[0].resizeTextarea()
            this.$refs[`contractSeller${index}`].$children[0].resizeTextarea()
            this.$refs[`remark${index}`].resizeTextarea()
          })
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    queryBuyerSearchName(queryString, callback) {
      const arr = queryString ? this.buyerHisList.filter(item => {
        return item.input_value && item.input_value.indexOf(queryString) > -1
      }) : this.buyerHisList;
      const result = arr.map(item => ({ value: item.input_value, id: item.id }))
      callback(result)
    },
    querySellerSearchName(queryString, callback) {
      const arr = queryString ? this.sellerHisList.filter(item => {
        return item.input_value && item.input_value.indexOf(queryString) > -1
      }) : this.sellerHisList;
      const result = arr.map(item => ({ value: item.input_value, id: item.id }))
      callback(result)
    },
    handleFocus(row, field) {
      if (!row[field] || (field === 'price' && isNaN(Number(row[field])))) {
        return
      }
      row[field] = delcommafy(row[field])
    },
    handleHedgeItemNumBlur(row, field) {
      if (!row[field]) {
        return
      }
      // 需要为正数，千位符展示，若非正数，提示“请输入正数”并清空填写内容。
      if (isNaN(Number(row[field])) || row[field] <= 0) {
        row[field] = ''
        this.$Message.error('请输入正数')
        return;
      }
      const arr = row[field].split('.')
      // 以0*开头
      if (arr[0].length >= 2 && arr[0].indexOf('0') === 0) {
        row[field] = ''
        this.$Message.error('请输入正数')
        return;
      }

      if (arr.length === 2 && arr[1].length > 10) {
        row[field] = ''
        this.$Message.error('小数位最多保留10位小数')
        return;
      }
      // 千位符处理
      row[field] = commafy(row[field])
    },
    handlePriceBlur(row, field) {
      if (!row[field] || isNaN(Number(row[field]))) {
        return;
      }

      // 需要为正数，千位符展示，若非正数，提示“请输入正数”并清空填写内容。
      if (row[field] <= 0) {
        row[field] = ''
        this.$Message.error('请输入正数或者其他文本格式')
        return;
      }
      const arr = row[field].split('.')
      // 以0*开头
      if (arr[0].length >= 2 && arr[0].indexOf('0') === 0) {
        row[field] = ''
        this.$Message.error('请输入正数或者其他文本格式')
        return;
      }

      if (arr.length === 2 && arr[1].length > 10) {
        row[field] = ''
        this.$Message.error('小数位最多保留10位小数')
        return;
      }

      // 千位符处理
      row[field] = commafy(row[field])
    },
    handleExport() {
      this.exportLoading = true
    },
    handleAdd() {
      uuid++
      this.form.list.push({
        uuid,
        variety: '',
        region: '',
        product_name: '',
        contract_buyer: '',
        contract_seller: '',
        hedge_item_num: '',
        price: '',
        delivery_date: null,
        sign_date: null,
        remark: '',
        contract_no: ''
      })
    },
    handleDel(row) {
      if (this.form.list.length === 1) {
        const isFlag = this.form.list.some(item => {
          return (item.product_name || item.contract_buyer || item.contract_seller || item.hedge_item_num || item.price || item.delivery_date || item.sign_date || item.remark || item.contract_no)
        })
        if (isFlag) {
          row.variety = ''
          row.region = ''
          row.product_name = ''
          row.contract_buyer = ''
          row.contract_seller = ''
          row.hedge_item_num = ''
          row.price = ''
          row.delivery_date = null
          row.sign_date = null
          row.remark = ''
          row.contract_no = ''
        } else {
          this.$Message.error('至少上传一条数据');
        }
      } else {
        this.form.list = this.form.list.filter(item => item.uuid !== row.uuid)
      }
    },
    getSummaries(param) {
      const { columns } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        if (column.property === 'hedge_item_num' && this.form.list.length) {
          sums[index] = this.form.list.reduce((prev, curr) => {
            const value = curr[column.property] ? Number(delcommafy(curr[column.property])) : '-'
            if (!isNaN(value)) {
              return bigNumberAdd(prev, delcommafy(curr[column.property]))
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index] || '--';
          this.hedge_item_total_num = sums[index]
        } else {
          sums[index] = '--';
        }
      });
      sums.forEach((item, index) => {
        if (!isNaN(Number(item))) {
          sums[index] = commafy(sums[index]) // 千位符展示
        }
      });
      return sums;
    },
    clearValidates() {
      if (this.$refs.tableForm) {
        this.$refs.tableForm.clearValidate()
      }
    },
    validateForm() {
      return new Promise((resolve, reject) =>{
        this.$refs.tableForm.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject() 
            return false
          }
        })
      })
    }
  }
}
</script>

<style>
.table-form-wrapper {
  width: 100%;
}

.custom-popper-class {
  position: absolute !important;
  left: 0 !important;
}
/* // 若body样式有position:relative; 选择popper会展示不出来，需要设置el-table 的overflow为visible */
.table-form-wrapper .el-table {
  width: 100%;
  overflow: visible !important;
}

.table-form-wrapper .el-table .el-table__body-wrapper {
  overflow: visible !important;
}

.table-form-wrapper .el-table .cell {
  overflow: visible !important;
}

.table-form-wrapper .header-label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>