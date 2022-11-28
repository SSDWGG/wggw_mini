import dayjs from 'dayjs';

type IDate = string | number | Date | dayjs.Dayjs;

/**
 * 是否为同一天
*/
export const isSameDay = (date1: IDate, date2: IDate): boolean => dayjs(date1).isSame(dayjs(date2), 'day');

/**
 * 格式化时间线，类似于朋友圈，返回格式
 * 今天
 * 昨天
 * 12/9月
*/
export const timelineFormat = (date?: IDate): string[]|string => {
  const day = dayjs(date);
  const today = dayjs();
  if (day.isSame(today, 'day')) {
    return '今天';
  }
  if (day.isSame(today.add(-1, 'day'), 'day')) {
    return '昨天';
  }
  const splitDay = day.format('M-DD').split('-');
  return [splitDay[1], `${splitDay[0]}月`];
};

/**
 * 格式化相册时间
 * 1小时内
 * xx 小时前
 * YYYY年M月D日
*/
export const timeFormat = (date?: IDate): string[]|string => {
  const day = dayjs(date);
  const diff = dayjs().diff(day, 'hour');
  if (diff === 0) {
    return '1小时内';
  }
  if (diff < 24) {
    return `${diff}小时前`;
  }
  return day.format('YYYY年M月D日');
};


/**
 * 格式化时间线，类似于朋友圈，返回格式
 * 今天
 * 昨天
 * 12/9月
*/
export const timelineFormatVisiter = (date?: IDate): string[]|string => {
  const day = dayjs(date);
  const today = dayjs();
  if (day.isSame(today, 'day')) {
    return '今天';
  }
  const splitDay = day.format('M-DD').split('-');
  return `${splitDay[0]}月${splitDay[1]}日`;
};


export const timeFormatVisiter = (date: IDate): string[]|string => {
  const day = dayjs(date);
  const diff = dayjs().diff(day, 'hour');
  if (diff === 0) {
    return '1小时内';
  }
  if (diff < 24) {
    return `${diff}小时前`;
  }
  return day.format('YYYY/M/D HH:mm:ss');
};


// 判断是否最近三天内
export const isRecent = (date: IDate): boolean => {
  const day = dayjs(date);
  const diff = dayjs().diff(day, 'hour');
  return diff<72?true:false;
};