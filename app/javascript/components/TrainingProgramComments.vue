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

    <button
      v-show="!showNewCommentForm"
      class="btn btn-info"
      @click="showNewCommentForm = true"
    >
      Add new comment
    </button>

    <div
      v-show="showNewCommentForm"
      class="new-comment"
    >
      <label>
        <span>New comment:</span><br>

        <textarea
          class="new-comment__text"
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

      <button
        class="btn btn-info mb-4 ml-2"
        @click="showNewCommentForm = false"
      >
        Close
      </button>
    </div>

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
      showNewCommentForm: false,
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
      this.showNewCommentForm = false;
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

.new-comment__text {
  resize: none;
}
</style>
