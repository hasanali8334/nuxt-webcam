<template>
     <div >
    
      <button @click="startrecord()">Start Record</button>
      <button @click="stoprecord()">Stop Record</button>
    

    
    <video class="player"></video>
    
  </div>
</template>
<script>
import RecordRTC from 'recordrtc'
//let mediadev;
let recorder;
let stream;
let video;


export default {
    


   
    mounted(){
        
        // recorder=new RecordRTC(stream,{
        //     type:'video'
        // });


    },
    beforeMount(){
        
        video = document.querySelector(".player");
        navigator.mediaDevices.getUserMedia({video:true,audio:false})
        .then(localMediaStream=>{
            video.srcObject = localMediaStream;

          video.play();
          recorder=new RecordRTC(localMediaStream,{type:'video'});
          stream=localMediaStream;

        })

         

    },
    methods:{
        startrecord(){
            
            recorder.startRecording();

        },
        stoprecord(){
            console.log('stopRecord')
            video.stop();
            recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        console.log(blob);
    });

        }
    }

}
</script>