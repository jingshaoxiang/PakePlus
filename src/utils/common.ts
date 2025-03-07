import { invoke } from '@tauri-apps/api/core'

// urlMap
export const urlMap = {
    github: 'https://github.com/Sjj1024/PakePlus',
    weixin: 'https://github.com/Sjj1024/PakePlus',
    qq: '',
    email: '1024xiaoshen@gmail.com',
    website: '',
    x: '',
    google: '',
    csdn: 'https://xiaoshen.blog.csdn.net/',
    juejin: 'https://juejin.cn/user/70007368988926',
    windowsConfig: 'https://v2.tauri.app/reference/config/#windowconfig',
}

export const platforms: { [key: string]: PlatformInfo } = {
    desktop: {
        name: 'desktop',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        platform: 'desktop',
        width: 800,
        height: 600,
        direction: 'horizontal',
    },
    iPhone: {
        name: 'iPhone',
        userAgent:
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        platform: 'ios',
        width: 430,
        height: 932,
        direction: 'vertical',
    },
    Android: {
        name: 'Android',
        userAgent:
            'Mozilla/5.0 (Linux; Android 14; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36',
        platform: 'android',
        width: 412,
        height: 915,
        direction: 'vertical',
    },
    iPad: {
        name: 'iPad',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
        platform: 'desktop',
        width: 1024,
        height: 768,
        direction: 'horizontal',
    },
    custom: {
        name: 'custom',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        platform: 'desktop',
        width: 1920,
        height: 1080,
        direction: 'horizontal',
    },
}

// 是否为开发环境
export const isDev = import.meta.env.DEV

// 是否为tauri环境
export const isTauri = (window as any).__TAURI__ ? true : false

// 打开url
export const openUrl = async (url: string) => {
    if (isTauri) {
        await invoke('open_url', { url })
    } else {
        window.open(url, '_blank')
    }
}

// 是否为字母数字
export const isAlphanumeric = (str: string) => {
    const regex = /^[a-zA-Z0-9]+$/
    return regex.test(str)
}

// css filter
export const CSSFILTER = `
// css filter
document.addEventListener('DOMContentLoaded', () => {
    const targetNode = document.body
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
    }
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                CSSFILTER
            }
        }
    })
    observer.observe(targetNode, config)
})
// end css filter
`

// tauri config
export const tauriConfig = {
    windows: {
        label: '',
        title: '',
        url: '',
        userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        width: 800,
        height: 600,
        theme: null,
        resizable: true,
        fullscreen: false,
        maximized: false,
        minWidth: 400,
        minHeight: 300,
        maxWidth: 1920,
        maxHeight: 1080,
        decorations: true,
        transparent: false,
        titleBarStyle: 'Visible',
        visible: true,
        focus: true,
        closable: true,
        minimizable: true,
        maximizable: true,
        alwaysOnTop: false,
        alwaysOnBottom: false,
        center: false,
        skipTaskbar: false,
        tabbingIdentifier: null,
        parent: null,
        dragDropEnabled: true,
        browserExtensionsEnabled: false,
        devtools: true,
        contentProtected: false,
        hiddenTitle: false,
        incognito: false,
        proxyUrl: null,
        useHttpsScheme: false,
        zoomHotkeysEnabled: false,
        acceptFirstMouse: false,
        create: false,
        // if add additionalBrowserArgs, windows cant preview, but can build
        // additionalBrowserArgs:
        //     '--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection --autoplay-policy=no-user-gesture-required --auto-accept-camera-and-microphone-capture',
    },
}

// 初始化项目
export const initProject = {
    name: '',
    node_id: '',
    url: '',
    showName: '',
    appid: '',
    icon: '',
    iconRound: true,
    cors: false,
    injectJq: false,
    version: '0.0.1',
    platform: 'desktop',
    width: 800,
    height: 600,
    desc: '',
    jsFile: [],
    filterCss: '',
    jsCode: 'console.log("PakePlus")',
    more: tauriConfig,
}

// 转换为本地时间
export const convertToLocalTime = (utcDateTime: string) => {
    // Create a new Date object from the UTC date-time string
    let date = new Date(utcDateTime)
    // Get the local time as a string
    let localTime = date.toLocaleString()
    // Return the local time string
    return localTime
}

// base64 encode
export const base64Encode = (str: string) => {
    return btoa(str)
}

// base64 decode
export const base64Decode = (str: string) => {
    return atob(str)
}

// 读取文件内容
export const readFile = async (fileName: string) => {
    try {
        const response = await fetch(`/${fileName}`)
        if (!response.ok) {
            throw new Error('文件读取失败')
        }
        return response.text()
    } catch (error) {
        console.error('读取文件时出错:', error)
        return 'error'
    }
}

// update_build_file
export const updateBuildFile = async (data: any) => {
    if (isTauri) {
        const content = await invoke('update_build_file', data)
        return content
    } else {
        let content = await readFile('build.yml')
        if (content === 'error') {
            return 'error'
        }
        // 替换PROJECTNAME
        content = content.replace('PROJECTNAME', data.name)
        // 替换RELEASEBODY
        content = content.replace('RELEASEBODY', data.body)
        // 使用Base64编码
        const encodedContent = btoa(content)
        return encodedContent
    }
}

// open devtools
export const openDevtools = async () => {
    if (isTauri) {
        console.log('open devtools')
        invoke('open_devtools')
    }
}
