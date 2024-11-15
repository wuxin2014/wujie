<template>
  <el-dialog
    width="96%"
    :visible="visible"
    :close-on-click-modal="true"
    :before-close="handleClose"
    class="custom_dialog_wrap contract-online-fill-czce-dialog"
  >
    <div
      slot="title"
      class="dialog-title-text">
      合同份数清单线上填写
    </div>
    <div>
      <table-form
        ref="buyTableForm"
        title="申请保值合同(协议)份数清单"
        :list="contractInfoList"
        :is-detail="isDetail"
        type="HEDGE_CZCE_CONTRACT"
        :buyerHisList="contractBuyerList"
        :sellerHisList="contractSellerList" />
      <div class="tips">
        提示：
        <p>
          注：1.合同清单应该按照先采购合同、后销售合同的顺序填写，合同买、卖双方名称应填写全称；2.保值商品数量一般填写合同约定的货物数量，但合同为年度长期协议的，应填写与本次套保额度申请对应的合同交货数量，如不是以吨为单位的，应折算为吨，保值货物数量列应有合计数；3.单价如不是以元/吨为单位的，应按元/吨进行折算；4.如合同价格约定为点价的，尚未点价的在合同单价栏填写“未点价”，如已点价的，填写实际已点价的价格；5.部分客户以保密为由隐藏或遮盖合同单价的，合同单价栏填写“保密”；6.交货日期及签订日期应具体到年月日，不能具体到日的可以具体到月；7.如有合同编号，应填写表格合同编号栏，如无合同编号，可不填写；8.备注栏，可以填写关于此份合同需要说明的其他情况；9.本合同份数清单无需客户或会员盖章，由客户填写会员审核。
        </p>
      </div>
    </div>
    <div
      slot="footer"
      style="text-align: center; padding-top: 20px">
      <el-button
        type="primary"
        :loading="finishedLoading"
        @click="handleFinished">填写完成</el-button>
      <el-button
        style="margin-left: 40px"
        @click="handleReset">重置</el-button>
      <el-button
        style="margin-left: 40px"
        @click="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TableForm from './TableForm'

const toggleBody = (isPin = false) => {
  // 无界中，子应用打开弹窗隐藏页面滚动条
  if (!window.__POWERED_BY_WUJIE__) return;
  parent.document.body.style.overflow = isPin ? 'hidden' : 'auto';
}

export default {
  name: 'ContractOnlineFillIn',
  components: {
    TableForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    searchInfo: {
      type: Object,
      default: () => ({})
    },
    sysInfo: {
      type: Object,
      default: () => ({})
    },
    finishedLoading: {
      type: Boolean,
      default: false
    },
    previewLoading: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    contractFillInfo: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      contractInfoList: [
        { 
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
        },
      ],
      contractBuyerList: [],
      contractSellerList: [],
    }
  },
  watch: {
    visible: {
      handler(newVal) {
        if (newVal) {
          toggleBody(true)
          if (!this.isDetail) {
            this.getHistoryData()
          }
          const { contract_infos } = this.contractFillInfo || {}
          if (contract_infos && contract_infos.length > 0) {
            this.contractInfoList = contract_infos
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    getHistoryData() {
      this.queryHistoryData({
        business_type: this.searchInfo.business_type,
        param_type: 'HEDGE_CZCE_CONTRACT_BUYER'
      })
      this.queryHistoryData({
        business_type: this.searchInfo.business_type,
        param_type: 'HEDGE_CZCE_CONTRACT_SELLER'
      })
    },
    queryHistoryData(params) {
      
    },
    handleClose() {
      this.handleReset()
      this.contractBuyerList = []
      this.contractSellerList = []
      this.$refs.buyTableForm && this.$refs.buyTableForm.clearValidates()
      toggleBody()
      this.$emit('close')
    },
    handleReset() {
      this.contractInfoList = [
        { 
          product_name: '', 
          contract_buyer: '', 
          contract_seller: '', 
          hedge_item_num: '', 
          price: '', 
          delivery_date: null, 
          sign_date: null, 
          remark: '',
          contract_no: ''
        },
      ]
    },
    getParamsData() {
      const contract_infos = []
      this.$refs.buyTableForm.form.list.forEach((item, index) => {
        contract_infos.push({ ...item, order_num: index + 1 })
      })
      return { file_type: 'HEDGE_CZCE_CONTRACT', contract_infos }
    },
    handlePreview() {
      const params = this.getParamsData()
      this.$emit('preview', params);
    },
    handleFinished() {
      this.$refs.buyTableForm.validateForm()
      .then(() => {
        const params = this.getParamsData()
        this.$emit('finished', params)
      }).catch(() => {
        this.$Message.error('请完整填写申请内容');
      })
    }
  }
}
</script>

<style scoped>
.tips {
  font-size: 12px;
  line-height: 20px;
  text-align: left;
  color: #666666;
  padding: 16px 0;
}
</style>