<template>
  <div id="container" height="300px">
    <span class="text-rainbow">쿠키 유치원</span>
    <ul>
      <li><img src="@/views/login/kids.jpg" /></li>
      <li>
        <p style="font-style: bold">
          "이곳은
          <span class="highlight"
            >쿠키 유치원의 교사와 학부모 들의 공간입니다.</span
          ><br />
          회원으로 가입후 로그인 하신분은 자유로이 게시판 사용이 가능하며<br />
          유치원의 활동사진 및 다양한 정보를 확인할 수 있습니다.<br />
          아이들의 꿈이 자라는
          <span class="highlight">쿠키 유치원</span> 입니다"
          <br />
        </p>
      </li>
      <router-view />
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-rainbow {
  background-image: linear-gradient(
    90deg,
    red,
    orange,
    yellow,
    green,
    blue,
    navy,
    purple
  );
  background-clip: text;
  color: transparent;

  font-weight: bold;
  font-size: 60px;
}
#container {
  border: 2px solid #000000;
  border-style: double;
  border-radius: 15px;
  width: 900px;
  height: 500px;
  margin: 50px auto;
  text-align: center;
  box-shadow: 0 20px 15px lightgray;
  overflow: auto;
  font-size: 25px;
}
.highlight {
  display: inline;
  box-shadow: inset 0 -10px 0 #d9fcdb;
  /*-10px은 highlight의 두께*/
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
