const a = (src) => {
  const ele = document.createElement('div');
  ele.style.border = '1px solid red';
  ele.innerHTML = `<img src=${src} style="width: 200px"/>`;
  document.body.appendChild(ele);
};
const b = () => {console.log(1323432);}
export {a, b};