var path = require('path')
var marked = require('marked')
var cache = require('./cache')
var genId = require('./gen-id')
var highlight = require('highlight.js')
var DomParser = require('dom-parser')
var loaderUtils = require('loader-utils')

var isFunction = item => Object.prototype.toString.call(item) === '[object Function]'
/**
 * html => vue file template
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
var renderVueTemplate = function(html) {
	var parser = new DomParser()
	var dom = parser.parseFromString(html)
	var [style] = dom.getElementsByTagName('style')
	var [script] = dom.getElementsByTagName('script')
	var output = {
		style: style ? style.innerHTML : '',
		script: script ? script.innerHTML : ''
	}
	var reg = {
		style: /<style.*?<\/style>/gi,
		script: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
	}
	var result = `<template>\n <section>${html.replace(reg.style, '').replace(reg.script, '')}</section>\n</template>`
	if(output.style) {
		result += `<style>\n${output.style}\n</style>`
	}
	if(output.script) {
		result += `<script>\n${output.script}\n</script>`
	}
	return result
}

function escape(html, encode) {
	return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

module.exports = function(source) {
	this.cacheable()
	var params = loaderUtils.parseQuery(this.query)
	var opts = Object.assign(params, this.vueMarked, this.options.vueMarked)
	marked.Renderer.prototype.code = function(code, lang, escaped) {
		if(!lang) {
			return `<pre><code>${escape(code, true)}</code></pre>`
		} else if(lang && Array.isArray(opts.code2html) && opts.code2html.indexOf(lang) > -1) {
			var result
				, plugins = opts.use
			if(plugins && isFunction(plugins)) {
				plugins = [plugins]
			}
			if(Array.isArray(plugins)) {
				for(var i = 0, len = plugins.length, plugin; i < len; i++) {
					plugin = plugins[i]
					if(isFunction(plugin)) {
						result = plugin.call(this, marked, code, lang, highlight)
						if(result) {
							return result
						}
					}
				}
			}
			return code
		}
		return `<pre class="${this.options.langPrefix}${escape(lang)}"><code>${highlight.highlightAuto(code).value}</code></pre>`
	}
	
	var renderer = new marked.Renderer(opts)
	marked.setOptions({renderer: renderer})
	source = source.replace(/@/g, '__at__')
	var filePath = this.resourcePath
	var content = marked(source).replace(/__at__/g, '@')
	var result = renderVueTemplate(content)
	var fileName = path.basename(filePath, '.md')
	
	filePath = cache.save(fileName + '-' + genId(filePath), result)
	
	return `module.exports = require(${loaderUtils.stringifyRequest(this, `!!vue-loader!${filePath}`)})`
}
