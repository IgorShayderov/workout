<template>
  <div class="calendar">
    <h2 class="calendar__title">Calendar</h2>

    <table class="calendar__board">
      <caption>{{ `${monthName} ${currentYear}` }}</caption>
      <thead class="calendar__thead">
        <tr>
          <th
            class="calendar__header"
            v-for="(day, index) in weekDays"
            :key="index"
          >
            {{ day }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="week in weeksCount"
          :key="week"
        >
          <td
            class="calendar__day"
            :class="{ 'calendar__day_selected': calcDay(day, week) === currentDate }"
            v-for="day in daysInWeek"
            v-show="!isOutOfLimit(calcDay(day, week))"
            :key="day"
          >
            {{ calcDay(day, week) }}
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { daysInMonth } from '../helpers/dates';

export default {
  created() {
    console.log();
  },
  data() {
    return {
      daysInWeek: 7,
      weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
    }
  },
  methods: {
    isOutOfLimit(day) {
      return this.daysInMonthCount < day;
    }
  },
  computed: {
    calcDay() {
      return (day, week) => {
        return day + ((week - 1) * this.daysInWeek);
      }
    },
    currentDate() {
      return new Date().getDate();
    },
    currentMonth() {
      return new Date().getMonth();
    },
    currentYear() {
      return new Date().getFullYear();
    },
    daysInMonthCount() {
      return daysInMonth(this.currentYear, this.currentMonth);
    },
    weeksCount() {
      return Math.ceil(this.daysInMonthCount / 7);
    },
    monthName() {
      return this.monthNames[new Date().getMonth()];
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  margin: 2vh 2vw;
}

.calendar__title {
  text-align: center;
}

.calendar__board {
  /* border-top: 1px solid black;
  border-left: 1px solid black; */
}

.calendar__header, .calendar__day {
  /* border-bottom: 1px solid black;
  border-right: 1px solid black; */
}

.calendar__header {
  text-align: center;
}

.calendar__day {
  border: 1px solid black;
  vertical-align: top;
  text-align: right;
  cursor: pointer;
  padding: 5px;
  width: 150px;
  height: 100px;
}

.calendar__day_selected:after {
  position: absolute;
  /* top: 0; */
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px;
  content: 'Current date';
  text-decoration: underline;
}

.calendar__day_selected {
  position: relative;
}
</style>