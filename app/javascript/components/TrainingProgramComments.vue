<template>
  <div class="training-program-comments">
    <h2>Comments</h2>

    <ul class="training-program-comments__list">
      <li
        v-for="comment in comments"
        :key="comment.id"
      >
        {{ comment.body }}
      </li>
    </ul>

    <label>
      <span>New comment:</span><br>

      <textarea
        class="training-program-comments_new-comment"
        cols="30" rows="3"
        v-model="newComment"
      >
      </textarea>
    </label>
    <br>

    <button
      class="btn btn-info mb-4"
      @click="addComment"
    >
      Add comment
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    trainingProgramId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newComment: '',
    };
  },
  created() {
    if (this.comments.length === 0) {
      this.loadTrainingProgramComments(this.trainingProgramId);
    }
  },
  methods: {
    ...mapActions('trainingPrograms',
        [ 'loadTrainingProgramComments', 'saveComment' ],
    ),
    addComment() {
      this.$emit('clear-errors');
      this.saveComment({
        comment: {
          body: this.newComment,
        },
        trainingProgramId: this.trainingProgramId,
      })
          .then((data) => {
            if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
              this.$emit('comment-error', data.errors);
            }
          });
      this.newComment = '';
    },
  },
  computed: {
    ...mapGetters('trainingPrograms',
        [ 'getCommentsByTrainingProgramId' ],
    ),
    comments() {
      return this.getCommentsByTrainingProgramId(this.trainingProgramId);
    },
  },
};
</script>

<style scoped>
.training-program-comments {
    margin: 0 2vw;
}

.training-program-comments_new-comment {
  resize: none;
}
</style>
