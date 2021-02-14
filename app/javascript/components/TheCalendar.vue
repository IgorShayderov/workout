<template>
  <div class="calendar">
    <h2 class="calendar__title">Calendar</h2>
    <table class="calendar__board">
      <caption class="calendar__current-date">{{ calendarData.caption }}</caption>
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
          v-for="week in calendarData.weeks_count"
          :key="week"
        >
          <td
            v-for="day in calendarData.days.slice(week * daysInWeek - daysInWeek, week * daysInWeek)"
            :key="day.day_of_month_num"
            :data-count="day.day_of_month_num"
            class="calendar__day"
            :class="{ 'calendar__day_selected': day.is_current_day, 'calendar__day_past': !day.is_current_month }"
            @click="addTrainingPlans"
          >
            {{ day.day_of_month_num }}
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  created() {
    this.loadCalendarData()
        .then((data) => {
          this.calendarData = data;
        },
        (error) => {
          console.log(error);
        });
  },
  data() {
    return {
      requestDat: '',
      calendarData: {},
      date: new Date(),
      daysInWeek: 7,
      weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
    };
  },
  methods: {
    ...mapActions('trainingPrograms',
        ['loadCalendarData'],
    ),
    addTrainingPlans(event) {
      const day = event.target.dataset.count;

      this.$router.push({ name: 'calendarDay', params: {
        year: this.currentYear,
        month: this.currentMonth + 1,
        day,
      } });
    },
  },
  computed: {
    currentMonth() {
      return this.date.getMonth();
    },
    currentYear() {
      return this.date.getFullYear();
    },
  },
};
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

.calendar__current-date {
  color: black;
  font-weight: bold;
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
  font-weight: 600;
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

.calendar__day_past {
  opacity: 0.4;
  font-weight: 100;
}
</style>
