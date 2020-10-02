<template>
  <div
    class="exercises-addition"
  >
    <h1 class="text-center">Exercises</h1>

    <div class="exercises-slider">

        <div class="exercises-slider__roll-previous">
            <i class="fas fa-arrow-left fa-4x"></i>
        </div>

        <div class="exercises-list">
          <exercise-view
            v-for="(exercise, index) in exercisesList"
            :key="index"
            :title="exercise.title"
          >
          </exercise-view>
        </div>

        <div class="exercises-slider__roll-next">
          <i class="fas fa-arrow-right fa-4x"></i>
        </div>

    </div>

    <h2>Picked exercises</h2>

    <ol class="picked-exercises">
      <li>First exercise</li>
      <li>Second exercise</li>
      <li>Third exercise</li>
    </ol>

  </div>
</template>

<script>
import ExerciseView from './ExerciseView';

export default {
  data() {
    return {
      exercisesList: [
        { title: 'Hz1' },
        { title: 'Hz2' },
        { title: 'Hz3' },
        { title: 'Hz4' },
        { title: 'Hz5' },
        { title: 'Hz6'},
        { title: 'Hz7' },
        { title: 'Hz8'},
        { title: 'Hz9'},
        { title: 'Hz10'},
      ]
    };
  },
  methods: {

  },
  components: {
    ExerciseView
  },
}
</script>

<style scoped>
.exercises-slider {
  display: flex;
  justify-content: space-between;
  margin: 2vh auto;
  width: 80%;
}

.exercises-list {
  display: flex;
  overflow: hidden;
}

.exercises-slider__roll-next,
.exercises-slider__roll-previous {
  align-self: center;
  margin: 0 2vw;
  cursor: pointer;
}
</style>
