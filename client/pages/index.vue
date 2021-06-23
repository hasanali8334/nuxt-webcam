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

export default {
    data(){
        blobdata:'';
        video:'';
        stream:'';
        recorder:'';
        blob:'';
        file:'';
        formData:'';
        
    },
   
    
    methods:{

    
         async precamera(){
             this.video=document.querySelector('.player');
            this.stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            this.recorder = new RecordRTC(this.stream, {type: 'video'});
            this.video.srcObject=this.stream;
            this.video.play();
            
            },



       async startrecord(){
            
         await  this.recorder.startRecording();

        },
       async stoprecord(){
            await this.recorder.stopRecording();
            this.blob = await this.recorder.getBlob();
            this.file=new File([this.blob], 'record.webm');
            this.formData = new FormData();
            this.formData.append('imgUploader', this.file);
            fetch('http://localhost:5000/api/upload',{
                mode:'no-cors',
                method:'POST',
               // headers: {"Content-Type": "multipart/form-data"},
                body:this.formData
            });

           // this.video.pause();
        this.stream.getTracks().forEach(track => track.stop())
        
        }
  
    
    }
}


</script>