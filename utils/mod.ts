const a = /*#__PURE__*/ (src:string) => {
  const ele = document.createElement('div');
  ele.style.border = '1px solid red';
  ele.innerHTML = `<img src=${src} style="width: 200px"/>`;
  document.body.appendChild(ele);
};

const testPromise = /*#__PURE__*/ (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('mod1');
    }, 1000);
  });
};

export { a, testPromise };
