<template>
     <div >
    
      <button @click="startrecord()">Start Record</button>
      <button @click="stoprecord()">Stop Record</button>
      <button @click="precamera()">Prepare Camera</button>
    

    
    <video class="player"></video>
    
  </div>
</template>
<script>
import RecordRTC from 'recordrtc'
//let mediadev;
let recorder;
let stream;
let video;
let media;


export default {
    


   
    mounted(){
        
        // recorder=new RecordRTC(stream,{
        //     type:'video'
        // });


    },
    beforeMount(){
        
        

         

    },
    methods:{

        precamera(){
            video = document.querySelector(".player");
      media=navigator.mediaDevices.getUserMedia({video:true,audio:false})
        .then(localMediaStream=>{
            video.srcObject = localMediaStream;

          video.play();
          recorder=new RecordRTC(localMediaStream,{type:'video'});
          stream=localMediaStream;

        })

        },



        startrecord(){
            
            recorder.startRecording();

        },
        stoprecord(){
            console.log('stopRecord')
            
            recorder.stopRecording(function() {
        let blob = recorder.getBlob();
        console.log(blob);
        video.pause();
        MediaStreamTrack.stop()
    });

        }
    }

}
</script>