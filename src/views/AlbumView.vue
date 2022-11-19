<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://www.bluum.org/wp-content/uploads/2021/05/Bluum_GPNampa-scaled-1.jpg",
        },
        {
          src: "https://edsource.org/wp-content/uploads/2019/12/Stege3-1200x750.jpg",
        },
        {
          src: "https://cdn.dongnamns.co.kr/news/photo/202106/4788_5959_3943.jpg",
        },
        {
          src: "http://www.kindernews.net/news/photo/202106/3045_2664_1319.jpg",
        },
      ],
    };
  },
};
</script>
