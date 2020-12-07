<template>
  <div class="form-location">
    <p>Where to train?</p>
    <!-- TODO fix doubling -->
    <label>
      <input
        data-testid="location"
        type="radio" name="where_to_train" value="gym"
        class="form-location__radio-btn"
        :checked="location === 'gym'"
        @change="$emit('change-location', $event.target.value)"
      >
        Gym
    </label>

    <label>
      <input
        data-testid="location"
        type="radio" name="where_to_train" value="outdoors"
        class="form-location__radio-btn"
        :checked="location === 'outdoors'"
        @change="$emit('change-location', $event.target.value)"
      >
        Outdoors
    </label>
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.form-location {
  margin-bottom: 10px;
}

.form-location__radio-btn {
  transform: scale(2);
  margin: 0 8px;
}
</style>
