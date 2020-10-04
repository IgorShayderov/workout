<template>
  <div
    class="training-program-exercise"
    :class="{ 'training-program-exercise_selected': isSelected }"
    @click="selectExercise"
  >
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    selectExercise() {
      if (this.isSelected) {
        this.isSelected = false;
        this.$emit('unselected_exercise', this.id);
      } else {
        this.isSelected = true;
        this.$emit('selected_exercise', this.id);
      }
    }
  }
}
</script>

<style scoped>
/* 
1) верх
2) низ
3) лево
4) право
 х у
*/
  @keyframes border-dance {
    0% {
      background-position: 0px 0px,
                           200px 96px,
                           0px 200px,
                           96px 0px;
    }
    100% {
      background-position: 200px 0px,
                           0px 96px,
                           0px 0px,
                           96px 200px;
    }
  }

  .training-program-exercise {
    height: 100px;
    width: 100px;
    min-width: 100px;
    border: 1px solid black;
    margin: 0 10px;
    padding: 5px;
    cursor: pointer;
  }

  .training-program-exercise_selected {
    border-color: hsla(0, 0%, 0%, 0);
    background: linear-gradient(90deg, blue 50%, transparent 50%),
                linear-gradient(90deg, blue 50%, transparent 50%),
                linear-gradient(0deg, blue 50%, transparent 50%),
                linear-gradient(0deg, blue 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: 15px 2px,
                     15px 2px,
                     2px 15px,
                     2px 15px;
    background-position: 0px 0px,
                         100px 100px,
                         0px 100px,
                         100px 0px;
    animation: border-dance 4s infinite linear;
  }
</style>