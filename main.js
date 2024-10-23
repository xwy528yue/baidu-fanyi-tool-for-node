const fs = require("fs");
const cheerio = require("cheerio");
const fy = require("./fy.js");

// 遍历Vue项目的文件
let arr = [];

function traverseVueFiles(dirPath) {
  if (fs.statSync(dirPath).isDirectory()) {
    fs.readdirSync(dirPath).forEach((file) => {
      const fullPath = `${dirPath}/${file}`;
      if (fs.statSync(fullPath).isDirectory()) {
        traverseVueFiles(fullPath); // 递归遍历子目录
      } else if (file.endsWith(".vue")) {
        arr = [...arr, ...parseVueFile(fullPath)]; // 解析Vue文件
      }
    });
  }
}

// 解析Vue文件并查找文本节点字符
function parseVueFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const $ = cheerio.load(fileContent);
  const textNodes = [];

  function findText(element) {
    // console.log(element)
    if (element.type === "text") {
      const text = $(element).text().replace(/\n /gi, "").trim();
      // console.log("text",text)
      if (text && !text.includes("{{")) {
        textNodes.push(text);
      }
    } else {
      $(element)
        .contents()
        .each((index, childElement) => {
          findText(childElement);
        });
    }
  }

  // 遍历Vue模板中的节点，查找文本节点字符
  $("template")
    .contents()
    .each((index, element) => {
      // console.log(element)
      // console.log('type',element.type)

      findText(element, textNodes);
    });
  $("script")
    .contents()
    .each((index, element) => {
      // console.log(element)
      // console.log('script type',element.type)
      // findText(element,textNodes)
    });

  // console.log(`Found text nodes in ${filePath}:`);
  // console.log(textNodes);
  return textNodes;
}

// 设置要遍历的Vue项目目录路径，例如：'/path/to/vue-project'
const vueProjectPath = "../../Projects/neuron.tenantdatacenter.ui/src";
traverseVueFiles(vueProjectPath);
const keywords = [...new Set(arr)];
console.log("keywords", keywords.length);

async function fanyivue() {
  const texts = keywords.join("\n");

  /************************************************************************************/
  /*try {
    const zhMap = await fy(texts, "en", "zh");
    const tZh = zhMap.reduce((a, { src, dst }) => {
      a[src] = dst;
      return a;
    }, {});

    console.log("zhMap", zhMap);
    console.log("tZh", tZh);
    let zhJson;
    try {
      const text = fs.readFileSync("zh.json", "utf8");
      zhJson = JSON.parse(text);
    } catch (error) {
      zhJson = {};
    }

    // 重写文件
    const zhDataJson = Object.assign(zhJson, tZh);
    console.log("zhDataJson", zhDataJson);

    const zhDataText = JSON.stringify(zhDataJson);
    fs.writeFileSync("zh.json", zhDataText);
    console.log("JSON data has been saved to zh.json");
  } catch (error) {
    console.error(error);
  }*/

  /************************************************************************************/
  /*  try {
    const twMap = await fy(texts, "en", "cht");
    tTw = twMap.reduce((a, { src, dst }) => {
      a[src] = dst;
      return a;
    }, {});

    let twJson;
    try {
      const text = fs.readFileSync("tw.json", "utf8");
      twJson = JSON.parse(text);
    } catch (error) {
      twJson = {};
    }

    // 重写文件
    const twDataJson = Object.assign(twJson, tTw);
    console.log("twDataJson", twDataJson);

    const twDataText = JSON.stringify(twDataJson);
    fs.writeFileSync("tw.json", twDataText);
    console.log("JSON data has been saved to tw.json");
  } catch (error) {
    console.error(error);
  } */

 /************************************************************************************/

  try {
    const twMap = await fy(texts, "en", "vie");
    tTw = twMap.reduce((a, { src, dst }) => {
      a[src] = dst;
      return a;
    }, {});

    let twJson;
    try {
      const text = fs.readFileSync("vn.json", "utf8");
      twJson = JSON.parse(text);
    } catch (error) {
      twJson = {};
    }

    // 重写文件
    const twDataJson = Object.assign(twJson, tTw);
    console.log("twDataJson", twDataJson);

    const twDataText = JSON.stringify(twDataJson);
    fs.writeFileSync("vn.json", twDataText);
    console.log("JSON data has been saved to vn.json");
  } catch (error) {
    console.error(error);
  }

  /************************************************************************************/
  try {
    const jsonen = keywords.reduce((a, c) => {
      a[c] = c;
      return a;
    }, {});
    console.log(jsonen);

    fs.writeFileSync("en.json", JSON.stringify(jsonen));
    console.log("JSON data has been saved to en.json");
  } catch (error) {
    console.error(error);
  }
}

fanyivue();
// fy("some",'en','zh')
// fy("some",'en','vn')
// fy("some",'en','zh-TW')
