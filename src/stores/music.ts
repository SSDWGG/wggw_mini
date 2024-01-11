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
      coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BCADOECL-1678081703044WechatIMG21.jpeg',
      src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IEPOALOG-1679458147373thanks.mp3'
    },
    cxkMusicList: [
      {
        isplay:false,
        epname: '爱鸡',
        title: '爱鸡',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/KPPHBLKN-1704879026226ij.mp3'
      },
      {
        isplay:false,
        epname: '奇鸡再现',
        title: '奇鸡再现',
        singer: 'kunkun',
        coverImgUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg',
        src: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/CECPPDKF-1704878863927qjzx.mp3'
      }
    ],
    cxkSongIndex: 0
  }),
  actions: {
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
