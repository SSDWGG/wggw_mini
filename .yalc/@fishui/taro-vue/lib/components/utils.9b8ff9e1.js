const execSelectQuery = (selectQuery, interval = 100, timeout = 3e3) => {
  const _startTime = Date.now();
  return new Promise((resolve, reject) => {
    const func = () => {
      selectQuery.exec((res) => {
        const result = res[0];
        if (Date.now() - _startTime > timeout) {
          reject(new Error("query time out"));
        } else if (result === null || Array.isArray(result) && result.length === 0) {
          setTimeout(func, interval);
        } else {
          resolve(result);
        }
      });
    };
    func();
  });
};
const getSizeToPx = (size) => {
  if (String(size).startsWith("0"))
    return 0;
  if (typeof size === "number" || /^\d+$/.test(size)) {
    return `${size}px`;
  }
  return size;
};
export {
  execSelectQuery as e,
  getSizeToPx as g
};
