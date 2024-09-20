<template>
  <div style="padding: 20px 0" ref="comp">
    <el-form :model="searchForm" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="searchForm.effect_date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始曰期"
              end-placeholder="结束日期"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              :pickerOptions="startPickerOptions"
              :append-to-body="false"
              popper-class="custom-popper-class"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="过期时间">
            <el-date-picker
              v-model="searchForm.expire_date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始曰期"
              end-placeholder="结束日期"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              :pickerOptions="endPickerOptions"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="级联选项">
            <!-- <el-cascader
              v-model="searchForm.value"
              :options="options"
              :append-to-body="false"
              popper-class="custom-popper-class"
              :arrowOffset="120"
              style="width: 100%">
            </el-cascader> -->
            <!-- :popper-options="popperOptions" -->
            <el-cascader
              ref="cascaderRef"
              v-model="searchForm.value"
              :options="options"
              :append-to-body="true"
              :popper-options="popperOptions"
              :offset="-15"
              style="width: 100%">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- :append-to-body="false" popper-class="custom-popper-class"-->
        <el-col :span="8">
          <el-form-item label="申请时间">
            <el-date-picker
              v-model="searchForm.effect_date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始曰期"
              end-placeholder="结束日期"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              :pickerOptions="startPickerOptions"
              :append-to-body="false"
              popper-class="custom-popper-class"
              style="width: 100%">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="级联选项">
            <el-cascader
              v-model="searchForm.value"
              :options="options"
              :append-to-body="false"
              popper-class="custom-popper-class"
              style="width: 100%">
            </el-cascader>
            <!-- <el-cascader
              v-model="searchForm.value"
              :options="options"
              :append-to-body="true"
              :offset="0"
              style="width: 100%">
            </el-cascader> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- placement="bottom-end" :offset="210" align="right" :arrowOffset="400" :append-to-body="false" popper-class="custom-popper-class-right"-->
          <el-form-item label="过期1时间">
            <el-date-picker
              ref="datePickerRef"
              v-model="searchForm.expire_date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始曰期"
              end-placeholder="结束日期"
              format="yyyyMMdd"
              value-format="yyyyMMdd"
              :pickerOptions="endPickerOptions"
              align="right"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="标签">
            <!-- el-select多选组件filterable功能失效  -->
            <el-select v-model="searchForm.tagValue" multiple filterable placeholder="请选择">
              <el-option
                v-for="item in optionList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        value: [],
        effect_date: [],
        expire_date: [],
        tagValue: ''
      },
      startPickerOptions: {
        // disabledDate(time) {
        //   return that.$moment(time).format('YYYYMMDD') < that.$moment().subtract(1, 'years').format('YYYYMMDD')
        // }
      },
      endPickerOptions: {
        // disabledDate(time) {
        //   return that.$moment(time).format('YYYYMMDD') > that.$moment().add(1, 'years').format('YYYYMMDD')
        // }
      },
      optionList: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则设计原则设计原则',
          }],
        }
      ],
      popperOptions: { gpuAcceleration: true, removeOnDestroy: true },
      // popperOptions: {
      //   // boundariesElement: 'viewport',
      //   // removeOnDestroy: true,
      //   modifiers: [ // ElementPlus有的属性待验证
      //     {
      //       name: 'flip',
      //       options: {
      //         fallbackPlacements: ['bottom'],
      //         allowedAutoPlacements: ['bottom'],
      //       }
      //     }
      //   ]
      // },
    }
  },
  mounted() {
    // this.$PLoading.show()
    console.log('sub-application', window, window.parent)
    console.log('window.document.body==', window.document.body) // 注意子应用的body
    this.popperOptions = { ...this.popperOptions, boundariesElement: this.$refs.comp };
    this.$nextTick(()=>{
      // this.$refs.cascaderRef.updatePopper();
    })
  },
  methods: {
    toggleBody(isPin = false) {
      // 无界中，子应用打开弹窗隐藏页面滚动条
      if (!window.__POWERED_BY_WUJIE__) return;
      parent.document.body.style.overflow = isPin ? 'hidden' : 'auto';
    }
  }
}
</script>

<style>
.custom-popper-class {
  position: absolute !important;
  left: 0 !important;
}

.custom-popper-class-right {
  margin-left: -360px;
}
</style>