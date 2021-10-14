const a = (src:string) => {
  const ele = document.createElement('div');
  ele.style.border = '1px solid red';
  ele.innerHTML = `<img src=${src} style="width: 200px"/>`;
  document.body.appendChild(ele);
};

const testPromise = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('1');
    }, 1000);
  });
};

export { a, testPromise };
