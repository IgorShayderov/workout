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
            :data-count="calcDay(day, week)"
            v-for="day in daysInWeek"
            v-show="!isOutOfLimit(calcDay(day, week))"
            :key="day"
            @click="addTrainingPlans"
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
    console.log(this.date);

  },
  data() {
    return {
      date: new Date(),
      daysInWeek: 7,
      weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
    }
  },
  methods: {
    addTrainingPlans(event) {
      const day = event.target.dataset.count;

      this.$router.push({ name: 'calendarDay', params: {
        year: this.currentYear,
        month: this.currentMonth,
        day,
       }});
    }
  },
  computed: {
    calcDay() {
      return (day, week) => {
        return day + ((week - 1) * this.daysInWeek);
      }
    },
    currentDate() {
      return this.date.getDate();
    },
    currentMonth() {
      return this.date.getMonth();
    },
    currentYear() {
      return this.date.getFullYear();
    },
    daysInMonthCount() {
      return daysInMonth(this.currentYear, this.currentMonth);
    },
    weeksCount() {
      return Math.ceil(this.daysInMonthCount / 7);
    },
    monthName() {
      return this.monthNames[this.date.getMonth()];
    },
    isOutOfLimit(day) {
      return (day) => {
        return this.daysInMonthCount < day;
      }
    },
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

}

.calendar__header, .calendar__day {

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
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  content: 'Current date';
  text-decoration: underline;
}

.calendar__day_selected {
  position: relative;
  outline: 1px solid red;
  outline-offset: -2px;
}
</style>