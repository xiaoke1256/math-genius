const fs = require('fs')
const path = require('path')

const manifestPath = path.join(__dirname, '../manifest.json')
const localPath = path.join(__dirname, '../config/mp-weixin.local.json')

if (!fs.existsSync(localPath)) {
  console.error('缺少 config/mp-weixin.local.json，请从 mp-weixin.local.example.json 复制')
  process.exit(1)
}

const local = JSON.parse(fs.readFileSync(localPath, 'utf8'))
if (!local.appid) {
  console.error('config/mp-weixin.local.json 中缺少 appid')
  process.exit(1)
}

function replaceMpWeixinAppid(content, appid) {
  const lines = content.split('\n')
  let inMpWeixin = false
  let braceDepth = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (/"\s*mp-weixin\s*"\s*:/.test(line)) {
      inMpWeixin = true
      braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length
      continue
    }

    if (!inMpWeixin) {
      continue
    }

    braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length

    if (/"\s*appid\s*"\s*:/.test(line)) {
      lines[i] = line.replace(/"\s*appid\s*"\s*:\s*"[^"]*"/, `"appid" : "${appid}"`)
      return lines.join('\n')
    }

    if (braceDepth <= 0) {
      break
    }
  }

  throw new Error('未找到 mp-weixin.appid')
}

const manifest = fs.readFileSync(manifestPath, 'utf8')
const updated = replaceMpWeixinAppid(manifest, local.appid)

fs.writeFileSync(manifestPath, updated, 'utf8')
console.log('已注入 mp-weixin appid')
