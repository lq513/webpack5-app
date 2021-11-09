const a = /*#__PURE__*/ (src:string) => {
  const ele = document.createElement('div');
  ele.style.display = 'flex';
  ele.style.justifyContent = 'center';
  ele.innerHTML = `<img src=${src} style="width: 200px"/>`;
  document.body.appendChild(ele);
};

const handleTheme = /*#__PURE__*/ (checked: boolean) => {
  let theme = 'light';
  if (checked) theme = 'dark';
  document.body.className = theme;
  localStorage.setItem('theme', theme);
};

const handleSourceCode = () => {
  document.addEventListener('keydown', (oEvent) => {
    //获取键盘的keyCode值
    const KeyCode = oEvent.key;
    // console.log(oEvent, 11111111);
    //获取ctrl 键对应的事件属性
    const bCtrlKeyCode = oEvent.ctrlKey || oEvent.metaKey;
    if ( KeyCode.toLowerCase() === 'u' && bCtrlKeyCode  ) {
      oEvent.preventDefault();
      window.location.href = 'https://github.com/lq513/webpack5-app';
    }
  });
};

export { a, handleTheme, handleSourceCode };
