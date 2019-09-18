import Vue from 'vue'
import Clipboard from 'clipboard'
/**
 * clipboard
 * 介绍: 不依赖flash, 不依赖其他框架，gzip压缩后只有3kb大小 的拷贝工具包
 * 1. 从另一个元素复制文本  data-clipboard-target="#foo"
 * 2. 从另一个元素剪切文本 data-clipboard-action="cut" data-clipboard-target="#bar"
 * 3. 从属性复制文本   data-clipboard-text
 * 更多：http://www.clipboardjs.cn/
 * 
 *  */ 


function clipboardSuccess() {
    Vue.prototype.$message({
        message: '拷贝成功',
        type: 'success',
        duration: 1500
    })
}

function clipboardError() {
    Vue.prototype.$message({
        message: '拷贝失败',
        type: 'error'
    })
}

export default function handleClipboard(text, event) {
    const clipboard = new Clipboard(event.target, {
        text: () => text
    })
    clipboard.on('success', () => {
        clipboardSuccess()
        clipboard.destroy()
    })
    clipboard.on('error', () => {
        clipboardError()
        clipboard.destroy()
    })
    clipboard.onClick(event)
}
