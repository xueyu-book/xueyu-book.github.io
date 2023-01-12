<template>
  <div class="calendar-list">
    <div class="calendar-item" v-for="(item, index) in state.calendarList" :key="index">
      <div class="item-month">{{ item.header }}</div>
      <div class="item-day-list">
        <span class="item-day desc">一</span>
        <span class="item-day desc">二</span>
        <span class="item-day desc">三</span>
        <span class="item-day desc">四</span>
        <span class="item-day desc">五</span>
        <span class="item-day desc">六</span>
        <span class="item-day desc">日</span>
        <span class="item-day" v-for="(day, dayIndex) in item.list" :key="dayIndex"
              @click="handleChangeCalendar(day.value)">
          <span class="content" :class="{
            active:
              state.weekdayList.findIndex(i => i.value === day.value) !== -1
          }">{{ day.option }}</span>
        </span>
        <span class="item-day" v-for="i in 7 - (item.list.length % 7)" v-if="item.list.length % 7 > 0"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { format, getDay, endOfMonth, nextDay } from 'date-fns'

const props = defineProps({
  startTime: Date,
  endTime: Date
})

const state = reactive({
  calendarList: [],
  weekdayList: []
})

const emits = defineEmits(['selected-data'])

const initCalendar = (startTime, endTime) => {
  const firstMonthEnd = format(endOfMonth(startTime), 'yyyy-MM-dd')
  const lastMonthEnd = format(endOfMonth(endTime), 'yyyy-MM-dd')
  let list = Array.from(new Array(+firstMonthEnd.slice(8) + 1).keys())
      .slice(1)
      .map(item => (item < 10 ? `0${item}` : item))
      .map(item => ({
        option: '' + item,
        value: `${firstMonthEnd.slice(0, 8)}${item}`,
        weekDay: getDay(new Date(`${firstMonthEnd.slice(0, 8)}${item}`))
      }))

  if (list[0].weekDay !== 1) {
    const length = list[0].weekDay ? list[0].weekDay : 7
    const arr = Array.from(new Array(length).keys())
        .slice(1)
        .map(item => ({ option: '', value: '', weekDay: '' }))
    list = [...arr, ...list]
  }
  state.calendarList = [
    ...state.calendarList,
    {
      header: `${firstMonthEnd.slice(0, 4)}年-${firstMonthEnd.slice(
          5,
          7
      )}月`,
      list: list
    }
  ]

  if (firstMonthEnd !== lastMonthEnd) {
    initCalendar(
        nextDay(endOfMonth(new Date(firstMonthEnd)), 0),
        endTime
    )
  }
}

const handleChangeCalendar = (value) => {
  if (!value) return
  const index = state.weekdayList.findIndex(item => item.value === value)
  if (index !== -1) {
    state.weekdayList.splice(index, 1)
  } else {
    state.weekdayList = [...state.weekdayList, { value: value }]

    emits('selected-data', state.weekdayList)
  }
}

onMounted(() => {
  initCalendar(props.startTime, props.endTime)
})

</script>

<style lang="scss" scoped>
.calendar-list {
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
}

.calendar-item {
  width: 300px;
  margin-top: 20px;

  .item-month {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  &:nth-child(n),
  &:nth-child(n + 1) {
    margin-right: 20px;
  }
}

.item-day-list {
  display: flex;
  flex-wrap: wrap;

  .item-day {
    flex-shrink: 0;
    flex: 14.28%;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;

    &.desc {
      font-weight: bold;
    }

    .content {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      &.active {
        color: #fff;
        background: #00cec7;
        border-radius: 50%;
      }
    }
  }
}
</style>
