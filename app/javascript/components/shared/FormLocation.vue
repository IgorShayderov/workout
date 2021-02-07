<template>
  <div class="form-location">
    <p>Where to train?</p>

    <label
      v-for="(availableLocation, index) in availableLocations"
      :ref="`${availableLocation}-checkbox`"
      :key="index"
    >
      <input
        data-test-id="location"
        type="radio" name="where_to_train" :value="availableLocation"
        class="form-location__radio-btn"
        :checked="location === availableLocation"
        @change="$emit('change-location', $event.target.value)"
      >
        {{ availableLocation | capitalize }}
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
  data() {
    return {
      availableLocations: ['gym', 'outdoors'],
    };
  },
  filters: {
    capitalize: (string) => {
      return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
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
