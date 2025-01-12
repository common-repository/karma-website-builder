/* PrismJS 1.12.2
 http://prismjs.com/download.html#themes=prism&languages=css+clike+javascript */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={manual:_self.Prism&&_self.Prism.manual,disableWorkerMessageHandler:_self.Prism&&_self.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof r?new r(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e,t){var r=n.util.type(e);switch(t=t||{},r){case"Object":if(t[n.util.objId(e)])return t[n.util.objId(e)];var a={};t[n.util.objId(e)]=a;for(var i in e)e.hasOwnProperty(i)&&(a[i]=n.util.clone(e[i],t));return a;case"Array":if(t[n.util.objId(e)])return t[n.util.objId(e)];var a=[];return t[n.util.objId(e)]=a,e.forEach(function(e,r){a[r]=n.util.clone(e,t)}),a}return e}},languages:{extend:function(e,t){var r=n.util.clone(n.languages[e]);for(var a in t)r[a]=t[a];return r},insertBefore:function(e,t,r,a){a=a||n.languages;var i=a[e];if(2==arguments.length){r=arguments[1];for(var l in r)r.hasOwnProperty(l)&&(i[l]=r[l]);return i}var o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==t)for(var l in r)r.hasOwnProperty(l)&&(o[l]=r[l]);o[s]=i[s]}return n.languages.DFS(n.languages,function(t,n){n===a[e]&&t!=e&&(this[t]=o)}),a[e]=o},DFS:function(e,t,r,a){a=a||{};for(var i in e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],r||i),"Object"!==n.util.type(e[i])||a[n.util.objId(e[i])]?"Array"!==n.util.type(e[i])||a[n.util.objId(e[i])]||(a[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,i,a)):(a[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,null,a)))}},plugins:{},highlightAll:function(e,t){n.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,r){var a={callback:r,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var i,l=a.elements||e.querySelectorAll(a.selector),o=0;i=l[o++];)n.highlightElement(i,t===!0,a.callback)},highlightElement:function(t,r,a){for(var i,l,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(i=(o.className.match(e)||[,""])[1].toLowerCase(),l=n.languages[i]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+i,t.parentNode&&(o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+i));var s=t.textContent,u={element:t,language:i,grammar:l,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(n.hooks.run("before-highlight",u),u.element.textContent=u.code,n.hooks.run("after-highlight",u)),n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),r&&_self.Worker){var g=new Worker(n.filename);g.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,a&&a.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,a&&a.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,a){var i=n.tokenize(e,t);return r.stringify(n.util.encode(i),a)},matchGrammar:function(e,t,r,a,i,l,o){var s=n.Token;for(var u in r)if(r.hasOwnProperty(u)&&r[u]){if(u==o)return;var g=r[u];g="Array"===n.util.type(g)?g:[g];for(var c=0;c<g.length;++c){var h=g[c],f=h.inside,d=!!h.lookbehind,m=!!h.greedy,p=0,y=h.alias;if(m&&!h.pattern.global){var v=h.pattern.toString().match(/[imuy]*$/)[0];h.pattern=RegExp(h.pattern.source,v+"g")}h=h.pattern||h;for(var b=a,k=i;b<t.length;k+=t[b].length,++b){var w=t[b];if(t.length>e.length)return;if(!(w instanceof s)){h.lastIndex=0;var _=h.exec(w),j=1;if(!_&&m&&b!=t.length-1){if(h.lastIndex=k,_=h.exec(e),!_)break;for(var P=_.index+(d?_[1].length:0),A=_.index+_[0].length,x=b,O=k,I=t.length;I>x&&(A>O||!t[x].type&&!t[x-1].greedy);++x)O+=t[x].length,P>=O&&(++b,k=O);if(t[b]instanceof s||t[x-1].greedy)continue;j=x-b,w=e.slice(k,O),_.index-=k}if(_){d&&(p=_[1]?_[1].length:0);var P=_.index+p,_=_[0].slice(p),A=P+_.length,N=w.slice(0,P),S=w.slice(A),C=[b,j];N&&(++b,k+=N.length,C.push(N));var E=new s(u,f?n.tokenize(_,f):_,y,_,m);if(C.push(E),S&&C.push(S),Array.prototype.splice.apply(t,C),1!=j&&n.matchGrammar(e,t,r,b,k,!0,u),l)break}else if(l)break}}}}},tokenize:function(e,t){var r=[e],a=t.rest;if(a){for(var i in a)t[i]=a[i];delete t.rest}return n.matchGrammar(e,r,t,0,0,!1),r},hooks:{all:{},add:function(e,t){var r=n.hooks.all;r[e]=r[e]||[],r[e].push(t)},run:function(e,t){var r=n.hooks.all[e];if(r&&r.length)for(var a,i=0;a=r[i++];)a(t)}}},r=n.Token=function(e,t,n,r,a){this.type=e,this.content=t,this.alias=n,this.length=0|(r||"").length,this.greedy=!!a};if(r.stringify=function(e,t,a){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return r.stringify(n,t,e)}).join("");var i={type:e.type,content:r.stringify(e.content,t,a),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:a};if(e.alias){var l="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}n.hooks.run("wrap",i);var o=Object.keys(i.attributes).map(function(e){return e+'="'+(i.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(o?" "+o:"")+">"+i.content+"</"+i.tag+">"},!_self.document)return _self.addEventListener?(n.disableWorkerMessageHandler||_self.addEventListener("message",function(e){var t=JSON.parse(e.data),r=t.language,a=t.code,i=t.immediateClose;_self.postMessage(n.highlight(a,n.languages[r],r)),i&&_self.close()},!1),_self.Prism):_self.Prism;var a=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return a&&(n.filename=a.src,n.manual||a.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(?:;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^{}\s][^{};]*?(?=\s*\{)/,string:{pattern:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.languages.css,Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css",greedy:!0}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(?:true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,"function":/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,alias:"function"}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript",greedy:!0}}),Prism.languages.js=Prism.languages.javascript;

/*
 * CodeFlask Plugin
 * Plugin URL: https://github.com/kazzkiq/CodeFlask.js
 * */
(function(global, factory) {
	if (typeof exports === 'object' && typeof module == "object") { // CommonJS
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) { // AMD
		define([], factory);
	} else { // Browser
		global.CodeFlask = factory();
	}
})(this, function() {

	function CodeFlask(indent) {
		this.indent = indent || "    ";
		this.docroot = document;
	}

	CodeFlask.isString = function(x) {
		return Object.prototype.toString.call(x) === "[object String]";
	}

	CodeFlask.prototype.run = function(selector, opts) {
		var target = CodeFlask.isString(selector) ? this.docroot.querySelectorAll(selector) : [selector];

		if(target.length > 1) {
			throw 'CodeFlask.js ERROR: run() expects only one element, ' +
			target.length + ' given. Use .runAll() instead.';
		} else {
			this.scaffold(target[0], false, opts);
		}
	}

	CodeFlask.prototype.runAll = function(selector, opts) {
		// Remove update API for bulk rendering
		this.update = null;
		this.onUpdate = null;

		var target = CodeFlask.isString(selector) ? this.docroot.querySelectorAll(selector) : selector;

		var i;
		for(i=0; i < target.length; i++) {
			this.scaffold(target[i], true, opts);
		}

		// Add the MutationObserver below for each one of the textAreas so we can listen
		// to when the dir attribute has been changed and also return the placeholder
		// dir attribute with it so it reflects the changes made to the textarea.
		var textAreas = this.docroot.getElementsByClassName("CodeFlask__textarea");
		for(var i = 0; i < textAreas.length; i++)
		{
			window.MutationObserver = window.MutationObserver
				|| window.WebKitMutationObserver
				|| window.MozMutationObserver;

			var target = textAreas[i];

			observer = new MutationObserver(function(mutation) {
				var textAreas = this.docroot.getElementsByClassName("CodeFlask__textarea");
				for(var i = 0; i < textAreas.length; i++)
				{
					// If the text direction values are different set them
					if(textAreas[i].nextSibling.getAttribute("dir") != textAreas[i].getAttribute("dir")){
						textAreas[i].nextSibling.setAttribute("dir", textAreas[i].getAttribute("dir"));
					}
				}
			}),
				config = {
					attributes: true,
					attributeFilter : ['dir']
				};
			observer.observe(target, config);
		}
	}

	CodeFlask.prototype.scaffold = function(target, isMultiple, opts) {
		var textarea = document.createElement('TEXTAREA'),
			highlightPre = document.createElement('PRE'),
			highlightCode = document.createElement('CODE'),
			initialCode = target.textContent,
			lang;

		if(opts && !opts.enableAutocorrect)
		{
			// disable autocorrect and spellcheck features
			textarea.setAttribute('spellcheck', 'false');
			textarea.setAttribute('autocapitalize', 'off');
			textarea.setAttribute('autocomplete', 'off');
			textarea.setAttribute('autocorrect', 'off');
		}

		if(opts)
		{
			lang = this.handleLanguage(opts.language);
		}

		this.defaultLanguage = target.dataset.language || lang || 'markup';


		// Prevent these vars from being refreshed when rendering multiple
		// instances
		if(!isMultiple) {
			this.textarea = textarea;
			this.highlightCode = highlightCode;
		}

		target.classList.add('CodeFlask');
		textarea.classList.add('CodeFlask__textarea');
		highlightPre.classList.add('CodeFlask__pre');
		highlightCode.classList.add('CodeFlask__code');
		highlightCode.classList.add('language-' + this.defaultLanguage);

		// Fixing iOS "drunk-text" issue
		if(/iPad|iPhone|iPod/.test(navigator.platform)) {
			highlightCode.style.paddingLeft = '3px';
		}

		// If RTL add the text-align attribute
		if(opts.rtl == true){
			textarea.setAttribute("dir", "rtl")
			highlightPre.setAttribute("dir", "rtl")
		}

		if(opts.lineNumbers) {
			highlightPre.classList.add('line-numbers');
			highlightPre.classList.add('CodeFlask__pre_line-numbers');
			textarea.classList.add('CodeFlask__textarea_line-numbers')
		}

		// Appending editor elements to DOM
		target.innerHTML = '';
		target.appendChild(textarea);
		target.appendChild(highlightPre);
		highlightPre.appendChild(highlightCode);

		// Render initial code inside tag
		textarea.value = initialCode;
		this.renderOutput(highlightCode, textarea);

		this.highlight(highlightCode);

		this.handleInput(textarea, highlightCode, highlightPre);
		this.handleScroll(textarea, highlightPre);

	}

	CodeFlask.prototype.renderOutput = function(highlightCode, input) {
		highlightCode.innerHTML = input.value.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;") + "\n";
	}

	CodeFlask.prototype.handleInput = function(textarea, highlightCode, highlightPre) {
		var self = this,
			input,
			selStartPos,
			inputVal,
			roundedScroll,
			currentLineStart,
			indentLength;

		textarea.addEventListener('input', function(e) {
			input = this;

			input.value = input.value.replace(/\t/g, self.indent);

			self.renderOutput(highlightCode, input);

			self.highlight(highlightCode);
		});

		textarea.addEventListener('keydown', function(e) {
			// If tab pressed, indent
			if (e.keyCode === 9) {
				e.preventDefault();
				var input   = this,
					selectionDir = input.selectionDirection,
					selStartPos = input.selectionStart,
					selEndPos   = input.selectionEnd,
					inputVal    = input.value;

				var beforeSelection = inputVal.substr(0, selStartPos),
					selectionVal        = inputVal.substring(selStartPos, selEndPos),
					afterSelection      = inputVal.substring(selEndPos);

				if (selStartPos !== selEndPos && selectionVal.length >= self.indent.length) {


					var currentLineStart = selStartPos - beforeSelection.split('\n').pop().length,
						startIndentLen  = self.indent.length,
						endIndentLen    = self.indent.length;

					//Unindent
					if (e.shiftKey) {
						var currentLineStartStr = inputVal.substr(currentLineStart, self.indent.length);
						//Line start whit indent
						if (currentLineStartStr === self.indent) {

							startIndentLen = -startIndentLen;

							//Indent is in selection
							if (currentLineStart > selStartPos) {
								selectionVal = selectionVal.substring(0, currentLineStart) + selectionVal.substring(currentLineStart+self.indent.length);
								endIndentLen = 0;
							}
							//Indent is in start of selection
							else if (currentLineStart == selStartPos) {
								startIndentLen = 0;
								endIndentLen = 0;
								selectionVal = selectionVal.substring(self.indent.length);
							}
							//Indent is before selection
							else {
								endIndentLen = -endIndentLen;
								beforeSelection = beforeSelection.substring(0, currentLineStart) + beforeSelection.substring(currentLineStart+self.indent.length);
							}

						}
						else{
							startIndentLen = 0;
							endIndentLen = 0;
						}

						selectionVal = selectionVal.replace(new RegExp('\n'+self.indent.split('').join('\\'), 'g'), '\n');
					}
					//Indent
					else {
						beforeSelection = beforeSelection.substr(0, currentLineStart)+self.indent+beforeSelection.substring(currentLineStart, selStartPos);
						selectionVal = selectionVal.replace(/\n/g, '\n'+self.indent);
					}

					//Set new indented value
					input.value = beforeSelection+selectionVal+afterSelection;

					input.selectionStart        = selStartPos+startIndentLen;
					input.selectionEnd          = selStartPos+selectionVal.length+endIndentLen;
					input.selectionDirection    = selectionDir;

				}
				else{
					input.value             = beforeSelection+self.indent+afterSelection;
					input.selectionStart    = selStartPos+self.indent.length;
					input.selectionEnd      = selStartPos+self.indent.length;
				}

				self.renderOutput(highlightCode, input);
				Prism.highlightAll();
			}

		});
	}

	CodeFlask.prototype.handleScroll = function(textarea, highlightPre) {
		textarea.addEventListener('scroll', function(){

			roundedScroll = Math.floor(this.scrollTop);

			// Fixes issue of desync text on mouse wheel, fuck Firefox.
			if(navigator.userAgent.toLowerCase().indexOf('firefox') < 0) {
				this.scrollTop = roundedScroll;
			}

			highlightPre.scrollTop = roundedScroll;
		});
	}

	CodeFlask.prototype.handleLanguage = function(lang) {
		if(lang.match(/html|xml|xhtml|svg/)) {
			return 'markup';
		} else  if(lang.match(/js/)) {
			return 'javascript';
		} else {
			return lang;
		}
	}

	CodeFlask.prototype.onUpdate = function(cb) {
		if(typeof(cb) == "function") {
			this.textarea.addEventListener('input', function(e) {
				cb(this.value);
			});
		}else{
			throw 'CodeFlask.js ERROR: onUpdate() expects function, ' +
			typeof(cb) + ' given instead.';
		}
	}

	CodeFlask.prototype.update = function(string) {
		var evt = document.createEvent("HTMLEvents");

		this.textarea.value = string;
		this.renderOutput(this.highlightCode, this.textarea);
		this.highlight(this.highlightCode);

		evt.initEvent("input", false, true);
		this.textarea.dispatchEvent(evt);
	}

	CodeFlask.prototype.highlight = function(highlightCode) {
		// Support both globally present Prism.js, and loading from module
		var Prism = window.Prism || require('prismjs')
		Prism.highlightElement(highlightCode);
	}

	return CodeFlask;
});