<template>
  <div class="photobooth">
    <div class="controls">
      <button @click="startrecord()">Record</button>
      <button @click="stoprecord()">Stop Record</button>
    </div>

    <canvas class="photo"></canvas>
    <video class="player"></video>
    <div class="strip"></div>
  </div>
</template>

<script>
  import RecordRTC from 'recordrtc'
  
  

const chunks=[];
export default {
  head() {},
  data() {},
  
  methods: {
      startrecord(){
         let video = document.querySelector(".player");
      navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(async function(stream) {
    let recorder = RecordRTC(stream, {
        type: 'video'
    });
    recorder.startRecording();   
            
    });
      },
      stoprecord(){
        recorder.stopRecording();
          let blob = recorder.getBlob();
          console.log(blob);
      },

    getVideo() {
        
      

    
  },
  beforeMount() {
    
    this.getVideo();
  }
  
}
</script>