const dpsConfig = {
	url: 'http://172.20.10.5:9000', // 待生成骨架屏页面的地址，用百度（https://baidu.com）试试也可以
	output: {
		filepath: 'f:\\project\\test\\webpack\\dist\\index.html', // 生成骨架屏的存放页面，一般为项目的入口页面
		injectSelector: '#root'  // 生成的骨架屏插入页面的节点
	},
  device: 'mobile',
	// header: {
	// 	height: 40,
	// 	background: '#1b9af4'
	// },
	background: 'linear-gradient(85deg, #dfdfdf  25%, #f4f4f4, #dfdfdf  75%);',
	animation: 'opacity 1s linear infinite;',
  init: function() {
    // 生成骨架屏之前的操作
    
    // 比如删除干扰节点
    let toTop = document.querySelector('#to-top');
    if(toTop) {
      toTop.parentNode.removeChild(toTop);
    }
    // 比如适当的调整某个节点的样式
    let specil = document.querySelector('.specil');
    specil.style.visibility = 'hidden';
  },
  // 定制某个节点画出来的样子，带上return false
	includeElement: function(node, draw) {
    const id = node.id;
    const tagName = node.tagName.toLowerCase();
    const style = getComputedStyle(node);
    const x = parseInt(style.width);
    const y = parseInt(style.height);
    const xVw = (x * 100) / 375;
    const yVw = (y * 100) / 375;
    const t = node.offsetTop;
    const l = node.offsetLeft;

    // 跳过该节点及其子节点
		if(node.id.indexOf('ignore') != '-1') {
			return false;
		}
		if(tagName === 'img') {
			draw({
				width: xVw,
				height: yVw,
				background: 'yellow',
        top: t * 100 / 375,
        left: l * 100 / 812,
			});
			return false;
		}
    if(tagName === 'p') {
      draw(
        {
          width: xVw,
          height: yVw,
          background: 'red',
          top: t * 100 / 375,
          left: l * 100 / 812,
        },
        `<p>111111<p/><p>111111<p/><p>111111<p/>`
      );
      return false;
    }

  },
	// writePageStructure: function(html) {
		// 自己处理生成的骨架屏
		// fs.writeFileSync(filepath, html);
		// console.log(html)
	// },
	init: function() {
		// 生成骨架屏之前的操作，比如删除干扰节点
	}
}

module.exports = dpsConfig;

		