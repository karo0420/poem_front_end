<template>
  <div dir="rtl">
    <ul>
      <li class="bg-gray-100 rounded-md border-r-2 shadow-sm border-gray-500 p-3 mt-2" v-for="(voice, index) in current.voices.data" :key="index">
        <div class="flex justify-between">
          <div class="flex">
            <div class="bg-gray-400 w-12 h-12 rounded-full">
              <img :src="voice.user.profile.avatar" alt="" class="h-12 rounded-full object-cover object-top w-full">
            </div>
            <div class="mr-2 mt-2">
              <p class="text-sm">{{ voice.user.profile.nickname }}</p>
              <p class="text-xxs text-gray-500">{{ voice.created_at }} ارسال شده</p>
            </div>
          </div>
          <div class="w-12 h-12 rounded-full text-gray-600">
            <span @click="playVoice(voice.id)" :class="[((audio.audioTrack == voice.voice) && audio.playing)? audio.class.pause: audio.class.play]"></span>
          </div>
        </div>
        <div class="text-xxs text-left mt-5 text-center" v-show="audio.buffering && (voice.voice == audio.audioTrack)"> <!--   -->
          <blinker>درحال بارگذاری...</blinker>          
        </div>
        <div class="flex flex-wrap mt-4" v-show="audio.audioTrack == voice.voice">
          <div class="w-10/12">
            <input class="w-full" type="range" min="0" @change="changeDuration" @input="changeDurationInput" v-model="audio.currentTime" :max="audio.duration" id="myRange">
          </div>
          <div class="w-2/12 text-center text-xs font-bold">{{ timer }}</div>
        </div>

      </li>
    </ul>
    <div class="text-center text-xs mt-6 shake-slow shake-constant" v-show="isLoading">
      <span class="px-3 py-1 rounded bg-gray-100">
        درحال بارگذاری ، شکیبا باشید... 
      </span>
    </div>
    <div class="text-center text-xs mt-6" v-show="showMoreVoiceBtn">
      <button @click="loadMore" class="px-3 py-1 rounded bg-gray-100">
        <span class="mx-2">نمایش آثار بیشتر</span>
        <i class="fas fa-chevron-circle-down"></i>
      </button>
    </div>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  const blinker = {
    functional: true,
    render(h, context) {
      return h('span', {
        class: {
          blink_me: true,
        }
      }, context.children);
    },
  }

  export default {
    components: {
      blinker
    },
    data() {
      return {
        isLoading: false,
        time: 20,
        audio: {
          class: {
            play: 'fas fa-play-circle fa-3x',
            pause: 'fas fa-pause-circle fa-3x',
            buffering: 'bg-red-700'
          },
          audioTrack: undefined,
          audioPlayer: undefined,
          playing: false,
          buffering: false,
          duration: 0,
          currentTime: 0,
          playPromise: undefined
        }
      }
    },
    methods: {
      ...mapActions('post', ['getVoices']),
      loadMore() {
        this.loadVoices();
      },
      loadVoices(page = 1) {
        this.isLoading = true;
        this.getVoices({postId: this.current.post.id}) // Pass page argument to specific page
          .then(voices=> {
            this.isLoading = false;
          })
          .catch(err=> {
            this.isLoading = false;
            // Retry
          })
      },
      playNow() {
        this.audio.audioPlayer.play()
          .catch(err=>{
            this.audio.buffering = false;
            this.audio.duration = 0;
            this.audio.currentTime = 0;
            this.audio.audioPlayer.pause();
            this.audio.audioTrack = '';
            this.audio.audioPlayer.src = '';
            console.log('ERROR ON PLAY');
          })
      },
      changeDuration(e) {
        this.audio.audioPlayer.currentTime = e.target.value;
        this.playNow();
        console.log('ON CHANGE');
      },
      changeDurationInput(e) {
        
        this.audio.audioPlayer.pause();
        //if (this.audio.currentTime != e.target.value) {
          this.audio.audioPlayer.currentTime = e.target.value;
          this.playNow();
        //}
        console.log('ON INPUT', e.target.value)
        
      },
      playVoice(id) {
        const voice = this.current.voices.data.find(e=> e.id == id);
        if (this.audio.audioTrack == voice.voice) {
          if (this.audio.playing) {
            this.audio.audioPlayer.pause();
          }else {
            this.playNow();
          }
          this.audio.playing = false;
          this.audio.buffering = false;
        }else {
          if (voice.voice) {
            this.audio.duration = 0;
            this.audio.currentTime = 0;
            this.audio.audioPlayer.pause();
            this.audio.audioTrack = voice.voice;
            this.audio.audioPlayer.src = this.audio.audioTrack;
            this.playNow();
          }
        }
      }
    },
    computed: {
      ...mapState('post', ['current']),
      showMoreVoiceBtn() {
        if ((this.current.voices.pages.last_page == undefined || 
              (this.current.voices.page+1 <= this.current.voices.pages.last_page)) && !this.isLoading )
          return true;
        else
          return false;
      },
      timer() {
        let time = this.audio.duration - this.audio.currentTime
        let hrs = ~~(time / 3600);
        let mins = ~~((time % 3600) / 60);
        let secs = ~~time % 60;
        // Output like "1:01" or "4:03:59" or "123:03:59"
        let ret = "";
        if (hrs > 0)
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
      }
    },
    created() {
      this.audio.audioPlayer = new Audio();
      this.audio.audioPlayer.onwaiting = () => {
        console.log('Waiting to load');
        this.audio.buffering = true;
      }
      this.audio.audioPlayer.onplay = ()=> {
        console.log('Playing');
        this.audio.playing = true;
      }
      this.audio.audioPlayer.onplaying = () => {
        this.audio.buffering = false;
        this.audio.playing = true;
        console.log('Playing after buffering or pause');
      }
      this.audio.audioPlayer.onended = () => {
        console.log('Playing finished');
        this.audio.playing = false;
        this.audio.buffering = false;
      }
      this.audio.audioPlayer.oncanplaythrough = () => {
        console.log('Can playing whole without stoping');
      }
      this.audio.audioPlayer.onabort = () => {
        this.audio.buffering = false;
        this.audio.playing = false;
        console.log('Music aborded')
      }
      this.audio.audioPlayer.onloadedmetadata = () => {
        this.audio.duration = this.audio.audioPlayer.duration;
        console.log(this.audio.audioPlayer.duration)
      }
      this.audio.audioPlayer.ontimeupdate = () => {
        this.audio.currentTime = this.audio.audioPlayer.currentTime;
      }
      this.audio.audioPlayer.onseeking = () => {
        //this.audio.audioPlayer.pause();
        //console.log('SEEKING', this.audio.audioPlayer.currentTime);
      }
      this.audio.audioPlayer.onseeked = () => {
        //this.audio.audioPlayer.play();

      }
    },
    mounted() {
      this.loadVoices();
    }
  }
</script>

<style lang="scss" scoped>

</style>