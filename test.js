const fs = require('fs');  
const fy = require('./fy.js')
try{
	const template = fs.readFileSync('zh.json', 'utf8');
	const zh = JSON.parse(template)
	console.log(zh)
	const new_zh = Object.assign(zh,{zzz:1})
	fs.writeFileSync('zh.json', JSON.stringify(new_zh))
	console.log('ssssssss')

}catch(err){
	console.log(err)
}
console.log(1)

fy(['some','or'].join('\n'))