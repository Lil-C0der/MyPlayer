var player = new Vue({
  el: "#player",
  data: {
    query: "",
    songList: [],
    musicUrl: "",
    mvUrl: "",
    coverPic: "./img/cover.png",
    commentList: "",
    // 是否在播放
    isPlaying: false,
    // 是否显示播放器
    showMv: false
  },
  methods: {
    // 搜索音乐
    searchMusic: function() {
      axios.get(`https://autumnfish.cn/search?keywords=${this.query}`).then(
        function(res) {
          this.player.songList = res.data.result.songs;
        },
        function(err) {
          console.log(err);
        }
      );
    },

    // 播放音乐 访问接口 https://autumnfish.cn/song/url 请求参数为歌曲id
    playMusic: function(musicId) {
      // 获取音乐
      axios.get(`https://autumnfish.cn/song/url?id=${musicId}`).then(
        function(res) {
          // 获取音乐Url
          this.player.musicUrl = res.data.data[0].url;
        },
        function(err) {
          console.log(err);
        }
      );

      // 获取封面
      axios.get(`https://autumnfish.cn/song/detail?ids=${musicId}`).then(
        function(res) {
          // 获取封面Url
          this.player.coverPic = res.data.songs[0].al.picUrl;
        },
        function(err) {
          console.log(err);
        }
      );

      // 获取评论
      axios.get(`https://autumnfish.cn/comment/hot?type=0&id=${musicId}`).then(
        function(res) {
          // console.log(res.data.hotComments[0].user.avatarList);
          this.player.commentList = res.data.hotComments;
        },
        function(err) {
          console.log(err);
        }
      );
    },

    play: function() {
      this.isPlaying = true;
    },
    pause: function() {
      this.isPlaying = false;
    },

    // 播放mv
    playMv: function(mvId) {
      this.showMv = true;
      // 暂停当前播放的音乐
      this.pause();
      this.musicUrl = "";
      this.coverPic = "./img/cover.png";
      axios.get(`https://autumnfish.cn/mv/url/?id=${mvId}`).then(
        function(res) {
          this.player.mvUrl = res.data.data.url;
        },
        function(err) {
          console.log(err);
        }
      );
    },
    // 点击背景处暂停播放mv
    hide: function() {
      this.showMv = false;
      this.mvUrl = "";
    }
  }
});
