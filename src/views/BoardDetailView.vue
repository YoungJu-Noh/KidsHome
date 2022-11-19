<template>
  <div class="board-detail">
    <v-card>
      <v-card-text class="pb-0">
        <div>
          <p class="text-h4 text--primary">
            {{ board.title }}
          </p>
          <hr color="black" />
          <p>{{ dateToYmdHms(new Date(board.createdAt)) }}</p>
        </div>
        <p>
          <Viewer ref="toastViewer" height="500px" />
        </p>
        <div>
          <hr />

          <v-col>
            <v-textarea
              filled
              label="댓글을 입력하세요.(300자 제한)"
              rows="2"
              v-model="comment"
              maxlength="300"
            ></v-textarea>
          </v-col>
          <v-row style="display: flex; width: 98%; margin: 0 auto">
            <v-icon
              v-show="eotion === 0"
              class="icon"
              @click="clickEmotion(null)"
            >
              thumb_up_alt
            </v-icon>
            <v-icon
              v-show="emotion !== 0"
              class="icon"
              @click="clickEmotion(0)"
            >
              thumb_up_off_alt
            </v-icon>
            <v-icon
              v-show="emotion === 1"
              class="icon"
              @click="clickEmotion(null)"
            >
              thumb_down_alt
            </v-icon>
            <v-icon
              v-show="emotion !== 1"
              class="icon"
              @click="clickEmotion(1)"
            >
              thumb_down_off_alt
            </v-icon>
          </v-row>
          <v-row>
            <v-btn
              outlined
              class="btn"
              @click="$router.push({ name: 'board' })"
              style="margin-left: auto"
              color="warning"
            >
              <v-icon>mdi-format-list-bulleted-square</v-icon>목록</v-btn
            >
            <template v-if="comment == 0">
              <v-btn disabled outlined><v-icon>mdi-pencil</v-icon>댓글</v-btn>
            </template>
            <template v-else>
              <v-btn
                outlined
                color="primary"
                class="btn"
                @click="callPostComment"
              >
                <v-icon>mdi-pencil</v-icon>댓글</v-btn
              >
            </template>
          </v-row>
        </div>
        <p>
          <v-list v-if="comments.length != 0">
            <v-subheader style="color: darkblue">댓글:</v-subheader>
          </v-list>
          <v-list>
            <template v-for="(comment, index) in comments">
              <template>
                <v-divider :key="index" :inset="false"></v-divider>

                <v-list-item :key="comment.id">
                  <v-list-item-content>
                    <v-list-item-title>
                      작성자: {{ comment.writer }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                      style="display: flex; position: relative"
                    >
                      <span>{{ comment.comment }}</span>
                      <span style="margin-left: auto">
                        {{ dateToYmdHms(new Date(comment.createdAt)) }}
                      </span>
                      <v-icon
                        small
                        @click="callDeleteComment(comment.id)"
                        style="margin-left: 10px; top: -3px"
                        v-if="comment.writer === userId"
                      >
                        mdi-delete
                      </v-icon>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </template>
          </v-list>
        </p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { Viewer } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import {
  deleteComment,
  getBoard,
  getComments,
  getEmotion,
  postComment,
  postEmotion,
} from "@/service/board";
import date from "@/mixins/date";
import { mapGetters, mapActions } from "vuex";

export default {
  mixins: [date],

  components: {
    Viewer,
  },

  data() {
    return {
      board: {
        createdAt: "",
        updatedAt: "",
        bno: 0,
        title: "",
        contents: "",
        writer: "",
        commentCnt: 0,
        likeCnt: 0,
        hateCnt: 0,
      },

      comment: "",

      comments: [],

      emotion: null,
    };
  },

  methods: {
    ...mapActions("loading", ["setLoading"]),
    async callGetBoard() {
      try {
        const board = await getBoard(this.bno);
        this.board = board.data;
        this.setContent(board.data.contents);
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },

    async callGetComments() {
      try {
        const response = await getComments(this.bno);
        this.comments = response.data;
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },

    async callPostComment() {
      try {
        if (!this.comment) {
          alert("댓글을 입력해주세요.");
          return false;
        }
        const response = await postComment(this.bno, { comment: this.comment });
        if (response.status === 200) {
          this.comment = "";
          this.callGetComments();
          alert("등록되었습니다.");
        } else {
          alert("통신실패");
        }
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },

    async callDeleteComment(id) {
      try {
        if (!confirm("정말 삭제하시겠습니까?")) {
          return;
        }
        const response = await deleteComment(id);
        if (response.status === 200) {
          this.callGetComments();
          alert("삭제 되었습니다.");
        }
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },

    async callGetEmotion() {
      try {
        const response = await getEmotion(this.bno);
        this.emotion = response.data.emotion;
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },

    async callPostEmotion(emotion) {
      try {
        await postEmotion(this.bno, { emotion });
      } catch (error) {
        alert("통신실패");
        console.error(error);
      }
    },
    clickEmotion(emotion) {
      this.emotion = emotion;
      this.callPostEmotion(emotion);
    },

    setContent(content) {
      this.$refs.toastViewer.invoke("setMarkdown", content);
    },
  },
  //
  initialize() {
    this.callGetBoards();
  },
  async callGetBoards() {
    try {
      this.setLoading(true);
      const response = await getBoard();
      this.boards = response.data;
    } catch (error) {
      alert("통신실패");
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  },
  //
  computed: {
    ...mapGetters("user", { userId: "id" }),

    bno() {
      return this.$route.params.id;
    },
  },

  created() {
    this.callGetBoard();
    this.callGetComments();
    this.callGetEmotion();
  },
};

//
</script>

<style scoped>
.board-detail {
  width: 95%;
  margin: 20px auto 0px;
}

.icon {
  margin: 0 5px;
}

.btn {
  margin: 0 5px;
}

.content {
  white-space: pre-line;
}
</style>
