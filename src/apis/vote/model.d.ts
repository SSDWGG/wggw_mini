export interface IVoteChooseItem {
  historyId:string
  voteId:string
  openid:string
  username:string
  choose:string
}

interface IVoteItem {
  voteId:string
  imgSrc:string
  title:string
  voteDesc:string
  openid:string
  chooseMap:string
  voteType:number
  voteMaxNum:number
  voteDdl:string
}
