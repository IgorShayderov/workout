<template>
  <div
    class="training-program-form"
  >
    <form
      action="insert from routes" data-type="json"
      enctype="multipart/form-data"  data-remote="true"
      method="post" accept-charset="UTF-8"
      class="m-4"
    >

      <label for=""></label>
      <input type="text">
      <br>

      <input type="submit" value="Create new program">
    </form>
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
}
</style>
