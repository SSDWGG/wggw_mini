export const checkPhone = (phoneNum: string) => !/^1[3-9]\d{9}$/.test(phoneNum);
export const checkNumAndEnglish= (str: string) => /^[A-Za-z0-9]+$/.test(str);
export const checkEmail= (email: string) => /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/.test(email);
