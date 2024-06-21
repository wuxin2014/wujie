<template>
  <div style="padding: 20px">
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
              :append-to-body="true"
              :offset="-100"
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
            <el-cascader
              v-model="searchForm.value"
              :options="options"
              :append-to-body="false"
              popper-class="custom-popper-class"
              :arrowOffset="120"
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
        expire_date: []
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
      popperOptions: {
        // boundariesElement: 'viewport',
        // removeOnDestroy: true,
        modifiers: [ // ElementPlus有的属性待验证
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['bottom'],
              allowedAutoPlacements: ['bottom'],
            }
          }
        ]
      },
    }
  },
  mounted() {
    console.log('sub-application', window, window.parent)
    console.log('window.document.body==', window.document.body) // 注意子应用的body
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