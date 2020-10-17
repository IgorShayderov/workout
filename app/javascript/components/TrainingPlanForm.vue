<template>
  <div>
    <form>
      <select>
        <option value=""></option>
        <option value=""></option>
      </select>

      <br>

      <label>
        <input
          type="time"

        />
      </label>
    </form>

    <errors-viewer
      :showErrors="showErrors"
      :errors="errors"
    >
    </errors-viewer>
  </div>
</template>

<script>
import formHelpers from '../mixins/formHelpers';

import ErrorsViewer from './ErrorsViewer';

export default {
  mixins: [formHelpers],
  components: {
    ErrorsViewer,
  }
}
</script>

<style scoped>

</style>