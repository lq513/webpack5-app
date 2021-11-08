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

export { a, handleTheme };
