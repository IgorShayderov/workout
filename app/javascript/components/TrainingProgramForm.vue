<template>
  <div>
    <div
      class="training-program-form"
    >
      <form
        action="training_programs" data-type="json"
        enctype="multipart/form-data"  data-remote="true"
        method="post" accept-charset="UTF-8"
        class="m-4"
      >

        <label for="training_program_title">Title:</label>
        <br>
        <input id="training_program_title" type="text" name='training_program[title]'>
        <br>

        <input type="submit" value="Create new program" class="my-2">
      </form>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.training-program-form {
  position: absolute;
  border: 1px solid black;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80vh;
  width: 60vw;
  border-radius: 10px;
  z-index: 20
}
</style>
