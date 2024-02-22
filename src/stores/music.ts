import Taro from "@tarojs/taro";
import { defineStore } from "pinia";

interface IMusicOpt {
  epname: string,
  title: string,
  singer: string,
  coverImgUrl: string,
  src: string,
  isplay: boolean,
}
interface IState {
  cxkMusicList: Array<IMusicOpt>
  defaultBGM: IMusicOpt
  cxkSongIndex: number
}

export const useMusicStore = defineStore("musicStore", {
  state: (): IState => ({
    defaultBGM: {
      isplay:false,
      epname: 'ありがとう···',
      title: 'ありがとう···',
      singer: 'KOKIA',
      coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
      src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/IEPOALOG-1679458147373thanks.mp3'
    },
    cxkMusicList: [
      {
        isplay:false,
        epname: '你干嘛~哎呦~',
        title: '你干嘛~哎呦~',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/PEELADIA-1679390220050ngm.mp3'
      },
      {
        isplay:false,
        epname: '爱鸡',
        title: '爱鸡',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/KPPHBLKN-1704879026226ij.mp3'
      },
      {
        isplay:false,
        epname: '奇鸡再现',
        title: '奇鸡再现',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CECPPDKF-1704878863927qjzx.mp3'
      },
      {
        isplay:false,
        epname: '鸡花瓷',
        title: '鸡花瓷',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/NFJJPOLP-1704958512624jhc.mp3'
      },
      {
        isplay:false,
        epname: '曹鸡',
        title: '曹鸡',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/IBPDHKBN-1705023432828cj.mp3'
      },
      {
        isplay:false,
        epname: '本草鸡木',
        title: '本草鸡木',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/PDEMMNJJ-1704958512624bcjm.mp3'
      },
      {
        isplay:false,
        epname: '仙剑鸡侠传',
        title: '仙剑鸡侠传',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/OMFOJGMP-1704958512624xjjxz.mp3'
      },
      {
        isplay:false,
        epname: '!坤!',
        title: '!坤!',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/APENDBMF-1679390216522j.mp3'
      },
      
      {
        isplay:false,
        epname: '!坤你太美!',
        title: '!坤你太美!',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/KBOAGENL-1679390152917jntm.mp3",
      },
      {
        isplay:false,
        epname: '篮球坤',
        title: '篮球坤',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
        src: "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/NFHKMKOK-1679390468478bgm.mp3",
      },
      
    ],
    cxkSongIndex: 0
  }),
  actions: {
    isPlay(){
      const backgroundAudioManager = Taro.getBackgroundAudioManager()
      return !backgroundAudioManager.paused
    },
    playDefaultBGM(){      
      // ios和安卓共同支持的音频格式 mp3 mp4a acc
      const backgroundAudioManager = Taro.getBackgroundAudioManager()
      this.play(this.defaultBGM)
      backgroundAudioManager.onEnded(() => {
        backgroundAudioManager.play()
      })
    },
    playCxkMusic(){
      // ios和安卓共同支持的音频格式 mp3 mp4a acc   src源无法解析中文
      const backgroundAudioManager = Taro.getBackgroundAudioManager()
      this.play(this.cxkMusicList[this.cxkSongIndex])
      backgroundAudioManager.onEnded(() => {
        // 循环播放列表
        this.cxkSongIndex = (this.cxkSongIndex + 1) % this.cxkMusicList.length
        this.play(this.cxkMusicList[this.cxkSongIndex])
      })
    },
    resetStatus(){
      this.defaultBGM.isplay = false
      this.cxkMusicList.forEach(element => {
        element.isplay = false
      });
    },
    play(songItem:IMusicOpt){
      const backgroundAudioManager = Taro.getBackgroundAudioManager()
      backgroundAudioManager.title = songItem.title
      backgroundAudioManager.epname = songItem.epname
      backgroundAudioManager.singer = songItem.singer
      backgroundAudioManager.coverImgUrl = songItem.coverImgUrl
      backgroundAudioManager.src = songItem.src
      this.resetStatus()
      songItem.isplay = true
    }
  },
});
