<template>
  <v-container>
    <v-row>
      <v-col><img src="../image/diet.png" width="200" hdight="200" /> </v-col
      ><v-col><h1 color="green">WEEK MENU_LIST</h1></v-col><v-col></v-col
    ></v-row>

    <div>
      <v-row>
        <v-col cols="12" md="5" align="left"
          ><p style="color: black">
            <label for="week">요일을 선택하세요 ===> </label>
            <strong>
              <select placeholder="Click" v-model="selected" ref="select">
                <option value="">Click</option>
                <option
                  v-for="(item, key) in selectObjs"
                  :key="key"
                  :value="key"
                >
                  {{ item }}
                </option>
              </select>
            </strong>
          </p>
        </v-col></v-row
      >
      <v-row>
        <v-text-field
          label="🍱 Menu 입력"
          v-model="text"
          ref="refText"
        ></v-text-field>

        <v-col cols="12" md="2">
          <v-btn class="mr-4" @click="postMenu" rounded color="success">
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
            <v-icon
              v-show="menu.edit"
              class="icon"
              small
              @click="updateMenu(menu)"
            >
              done
            </v-icon>
            <v-icon class="icon" small @click="deleteMenu(index)"
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

      selected: "",

      selectObjs: {
        Mon: "-월요일-",
        Tue: "-화요일-",
        Wed: "-수요일-",
        Thu: "-목요일-",
        Fri: "-금요일-",
      },
    };
  },

  methods: {
    async postMenu() {
      if (!this.text) {
        this.$refs.refText.focus();
        alert("오늘의 메뉴를 입력해주세요");
        return;
      }

      if (!this.selected) {
        alert("날짜를 선택해주세요");
        this.$refs.select.focus();
        return;
      }

      const menuList = [...this.menuList];
      menuList.push({
        text: this.selectObjs[this.selected] + this.text,
        edit: false,
      });
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

    async updateMenu(menu) {
      menu.edit = false;
      const response = await callPostCustom(KEY, {
        menuList: this.menuList,
      });

      if (!response.status === this.HTTP_OK) {
        alert("네트워크 에러");
      }
    },

    async deleteMenu(index) {
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
