<template>
  <v-container>
    <v-row>
      <v-col><img src="../image/diet.png" width="200" hdight="200" /> </v-col
      ><v-col><h1 color="green">WEEK MENU_LIST</h1></v-col><v-col></v-col
    ></v-row>
    <div>
      <v-row>
        <v-col cols="12" md="5" align="center"
          ><p style="color: black">
            <label for="week">요일을 선택하세요!!</label>
            <strong>
              <select v-model="select" style="color: orange">
                <option v-bind:value="mon">{{ mon }}</option>
                <option v-bind:value="tue">{{ tue }}</option>
                <option v-bind:value="wed">{{ wed }}</option>
                <option v-bind:value="thu">{{ thu }}</option>
                <option v-bind:value="fri">{{ fri }}</option>
              </select>
            </strong>
          </p>
        </v-col></v-row
      >
      <v-row>
        <v-text-field
          label="Menu 입력"
          v-model="text"
          ref="refText"
        ></v-text-field>

        <v-col cols="12" md="2">
          <v-btn class="mr-4" @click="apply" rounded color="success">
            등록
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <ul type="square">
          <li v-if="menuList.length === 0">이번주 식단을 등록해주세요.</li>
          <li v-for="(menu, index) in menuList" :key="index" class="list-li">
            <span class="menu-list-text" v-show="!menu.edit">
              {{ menu.text }}
            </span>
            <span v-show="menu.edit">
              <input
                class="menu-list-input"
                type="text"
                size="70px"
                v-model="menu.text"
              />
            </span>
            <v-icon
              v-show="!menu.edit"
              class="icon"
              small
              @click="menu.edit = true"
              >edit</v-icon
            >
            <v-icon v-show="menu.edit" class="icon" small @click="save(menu)">
              done
            </v-icon>
            <v-icon class="icon" small @click="deleteItem(index)"
              >delete</v-icon
            >
          </li>
        </ul>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { callGetCustom, callPostCustom } from "@/service/custom";

const KEY = "MENU_LIST";

export default {
  data() {
    return {
      valid: false,
      text: "",
      menuList: [],
      //

      select: "-월요일-",
      mon: "-월요일-",
      tue: "-화요일-",
      wed: "-수요일-",
      thu: "-목요일-",
      fri: "-금요일-",
    };
  },

  methods: {
    async apply() {
      if (!this.text) {
        this.$refs.refText.focus();
        alert("오늘의 메뉴를 입력해주세요");
        return;
      }

      const menuList = [...this.menuList];
      menuList.push({ text: this.select + this.text, edit: false });
      const response = await callPostCustom(KEY, {
        menuList,
      });

      if (response.status === this.HTTP_OK) {
        this.menuList = menuList;
        this.text = "";
      } else {
        alert("네트워크 에러");
      }
    },

    async save(menu) {
      menu.edit = false;
      const response = await callPostCustom(KEY, {
        menuList: this.menuList,
      });

      if (!response.status === this.HTTP_OK) {
        alert("네트워크 에러");
      }
    },

    async deleteItem(index) {
      const menuList = [...this.menuList];
      menuList.splice(index, 1);

      const response = await callPostCustom(KEY, {
        menuList,
      });

      if (response.status === this.HTTP_OK) {
        this.menuList = menuList;
      } else {
        alert("네트워크 에러");
      }
    },
  },

  async created() {
    const response = await callGetCustom(KEY);
    if (response.status === this.HTTP_OK) {
      this.menuList = response?.data?.menuList ?? [];
    } else {
      alert("네트워크 에러");
    }
  },
};
</script>

<style>
.input-text {
  border: 1px solid yellowgreen;
}

.icon {
  cursor: pointer;
}

.menu-list-text {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 17px;
}

.menu-list-input {
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid gray;
}
</style>
