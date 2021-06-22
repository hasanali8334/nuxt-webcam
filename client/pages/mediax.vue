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
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
//let mediadev;
let recorder;
let stream;
let video;
let media;
let blob


export default {
    data(){
        blobdata:'';
    },
    


   
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
       this.blobdata = recorder.getBlob();
        console.log(this.blobdata);
        video.pause();
        stream.getTracks().forEach(track => track.stop())
        let file=new File([this.blobdata], 'record.webm');

        const data = {"user" : "test",};

        const formData = new FormData();
        formData.append('files.file', file);
        formData.append('data', JSON.stringify(data));
        
         this.$axios.$post({
            method: "post",
            url: "http://localhost:5000/recordings",
            data: formData,
            headers: {
            "content-type": `multipart/form-data;`
            }
        })
                
        
        
    });

        }

        
    
    }

}
</script>