<template>
  <div class="photobooth">
    <div class="controls">
      <button @click="takePhoto">Take Photo</button>
    </div>

    <canvas class="photo"></canvas>
    <video class="player"></video>
    <div class="strip"></div>
  </div>
</template>

<script>
export default {
  head() {},
  data() {},
  methods: {
    getVideo() {
      let video = document.querySelector(".player");
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
          console.log(localMediaStream);
          video.srcObject = localMediaStream;
          video.play();
        })
        .catch(err => {
          console.error( err);
        });
    },

    takePhoto() {
      let strip = document.querySelector(".strip");
      let canvas = document.querySelector(".photo")
      const data = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = data;
      link.setAttribute("download", "newpic");
      link.innerHTML = `<img src="${data}" alt="newpic" />`;
      strip.insertBefore(link, strip.firstChild);
    }
  },
  beforeMount() {
    this.getVideo();
  }
};
</script>