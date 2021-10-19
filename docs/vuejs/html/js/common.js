function vueComponent(url, instance) {
    if (!instance) {
        instance = {}
    }
    return function (resolve, reject) {
        $.get(url).done(function (r) {
            var rl = r.toLowerCase()
            // 样式
            var style = ''
            var styleIndexEnd = rl.lastIndexOf('</style>')
            var styleIndex = rl.lastIndexOf('<style', styleIndexEnd)
            if (styleIndexEnd !== -1 && styleIndex !== -1) {
                style = r.substring(styleIndex, styleIndexEnd)
                style = style.substr(style.indexOf('>') + 1)
                style = '<component scoped :is="\'style\'">' + style + '</component>'
            }
            console.log('style', style)
            // JS
            var scriptIndexEnd = rl.lastIndexOf('</script>')
            var scriptIndex = rl.lastIndexOf('<script', scriptIndexEnd)
            if (scriptIndexEnd !== -1 && scriptIndex !== -1) {
                var script = r.substring(scriptIndex, scriptIndexEnd)
                script = script.substr(script.indexOf('>') + 1)
                script = '(' + script.replace(/export\s*=\s*\{/i, '{') + ')'
                var obj = eval(script)
                for (var a in obj) instance[a] = obj[a]
            }
            console.log('instance', instance)
            // 模板
            var template = r.substring(0, Math.min(styleIndex, scriptIndex))
            console.log('template', template)
            if (style) {
                var index = template.lastIndexOf('</')
                if (index !== -1) template = template.substr(0, index) + style + template.substr(index)
            }
            instance.template = template
            // debugger
            resolve(instance)
        })
    }
}
