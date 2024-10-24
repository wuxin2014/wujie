const plugins = [
  {
    htmlLoader: (code) => {
      console.log("html-loader");
      return code;
    },
    jsBeforeLoaders: [
      {
        callback(appWindow) {
          console.log("js-before-loader-callback", appWindow.__WUJIE.id);
        },
      },
    ],
    jsLoader: (code, url) => {
      console.log("js-loader", url);

      // 替换popper.js内计算偏左侧偏移量
      // var codes = code.replace(
      //   "left: elementRect.left - parentRect.left",
      //   "left: fixed ? elementRect.left : elementRect.left - parentRect.left"
      // );
      // return codes.replace("popper.right > data.boundaries.right", "false");// 替换popper.js内右侧偏移量

      // 解决element-ui，popper.js计算问题
      // let newCode = code.replace('var root = window;','var root = window.parent')
      // .replace('document.body.appendChild(this.popperElm);','window.parent.document.body.appendChild(this.popperElm);')
      // .replace("var css = root.getComputedStyle(element, null);","if (window.__POWERED_BY_WUJIE__ && element.nodeType === 9) return 'static';var css = root.getComputedStyle(element, null);");
      // return newCode;

      return code;
    },
    jsAfterLoaders: [
      {
        callback(appWindow) {
          console.log("js-after-loader-callback", appWindow.__WUJIE.id);
        },
      },
    ],
    // 在子应用所有的css之前
    cssBeforeLoaders: [
      //在加载html所有的样式之前添加一个外联样式
      { src: "https://vfiles.gtimg.cn/wuji_dashboard/xy/test_wuji_damy/HDaBURp7.css" },
      //在加载html所有的样式之前添加一个内联样式
      { content: "img{width: 300px}" },
      // 强制使子应用body定位是relative
      // { content: "body{position: relative !important}" },
    ],
    cssLoader: (code, url) => {
      console.log("css-loader", url, code.slice(0, 50) + "...");
      return code;
    },
    cssAfterLoaders: [
      //在加载html所有样式之后添加一个外联样式
      { src: "https://vfiles.gtimg.cn/wuji_dashboard/xy/test_wuji_damy/FQsK8IN6.css" },
      //在加载html所有样式之后添加一个内联样式
      { content: "img{height: 300px}" },
    ],
  },
];

export default plugins;
