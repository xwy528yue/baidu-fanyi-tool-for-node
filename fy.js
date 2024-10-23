
const axios = require('axios');

function md5encode(text){
  const crypto = require('crypto');
  const md5 = crypto.createHash('md5');
  md5.update(text);
  const hash = md5.digest('hex');
  return hash
}

async function ttt(text,from='en',to='zh'){
  const now = Date.now()
  const info = {
    apiServer: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
    from,
    to,
    appid:"20230920001824096",
    salt: '1435660288',
    sign: md5encode("20230920001824096"+text+"1435660288"+"Dml9j1KlAmoGWrDa0n0W")
  };
  const query = `${info.apiServer}?q=${encodeURIComponent(text)}&from=${info.from}&to=${info.to}&appid=${info.appid}&salt=${info.salt}&sign=${info.sign}`;

 return await axios.get(query)
  .then(response => {
   const {error_code,error_msg,trans_result} = response.data
   if(error_code){
    return Promise.reject(error_code+" : "+error_msg)
   }
    // console.log('输出翻译结果',trans_result); // 输出翻译结果
    return Promise.resolve(trans_result)
  })
  .catch(error => console.error(error));
}
module.exports = ttt