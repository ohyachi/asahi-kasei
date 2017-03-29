$(function(){
	$('.include').each(function(){
		var data = $(this).attr('data-path');
		$(this).load(data,function(){
			// local navigation activate
			if($('nav.local').length){
				var lnIndex = $('#pageBody header.brand').attr('data-localnav-index');
				$('nav.local ul li:nth-child('+ lnIndex +') a').addClass('active');
			}
		});
	});
	var selfUri = location.href;
	$('meta[property="og:url"]').attr('content',selfUri);
});

var isIE = false;
var version = null;
var ua = navigator.userAgent;
if(ua.match(/MSIE/) || ua.match(/Trident/)){
	$('html').addClass('isIE');
}
if(ua.indexOf('Android')>0){
	$('html').addClass('isAndroid')	
}

var initialWH = $(window).height();
$('body').attr('data-init-height',initialWH-54)

$(function(){
	
	$(window).on('load',function(){
		$('#wrapper').wait(500).animate({opacity:1},300);
	});

	// view classify	
	$(window).on('load resize orientationchange',function(){
		var ww = document.documentElement.clientWidth;
		var zoomT = ww/1100;
		//var zoomS = ww/640;
		var agent = navigator.userAgent;		
		//console.log('WW'+ww+'UA'+agent);
		if(ww < 768){
			var hdrH = $('#siteHeader').height();
			var winH = $(window).height() - hdrH;			
			$('body').addClass('spView').attr('data-winH',winH);
			$('body').removeClass('pcView tbView');	
			$('html').css('zoom','normal');
			$('.scroller').hide();
		}else if(ww < 1024 && ww > 767){
			$('body').addClass('tbView');
			$('body').removeClass('pcView spView');
			if(agent.search(/iPad/) != -1){
				$('meta[name="viewport"]').attr('content','width=1024,user-scalable=no');
			}else{
				$('meta[name="viewport"]').attr('content','width=device-width,user-scalable=no');
				$('html').css('zoom',zoomT);
			}
			$('.scroller').show();
			$('#global').css('height',50);
			$('#global ul li ul').hide();
		}else{
			//console.log('pc')
			$('body').addClass('pcView');
			$('body').removeClass('spView tbView');	
			$('html').css('zoom','normal');
			$('.scroller').show();
			$('#global').css('height',50);
			$('#global ul li ul').hide();
		}
	});
	
	// sub navigation show/hide for PC
	$(window).on('load resize orientationchange',function(){
		if($(window).width()>767){
			//console.log('notSp');
			$(document).on('mouseenter','#global li.lineup',function(){
				//console.log('enter');
				$('#global li.lineup').children('ul').stop().slideDown();
			});
			$(document).on('mouseleave','#global li.lineup',function(){
				//console.log('leave');
				$(this).children('ul').stop().slideUp();		
			});
		}else{
			//console.log('isSp');		
		}
	});
	



	// scroll position
	$(window).on('scroll load',function(){
		var currentPos = $(window).scrollTop();
		$('body').attr('data-current-pos',currentPos);	
	});

	// toggle nav
	if($(window).width()<768){
		$(document).on('click','#siteHeader .toggle a.open',function(){
			var currentPos = $('body').attr('data-current-pos');
			$('#wrapper').wait(100).css({position: 'fixed', width:'100%', 'top': -1 * currentPos});
			$(this).hide();
			$(this).next('.close').fadeIn().css('display','block');
			$('.scroller').wait(300).slideDown();
			return false;		
		});
		$(document).on('click','#siteHeader .toggle a.close',function(){
			var currentPos = $('#wrapper').css('top').replace('px','')*-1;
			$('#wrapper').attr({style:''});
			$('html, body').prop({scrollTop:currentPos});
			$(this).hide();
			$(this).prev('.open').fadeIn().css('display','block');
			$('.scroller').slideUp();
			return false;		
		});
		$(document).on('click','#global li.hasGrandChildren a',function(){
			$(this).closest('li').children('ul').slideToggle();
			$(this).closest('li').toggleClass('open');
		});
		$(document).on('click','#global li a.alternate',function(){
			return false;	
		});
	}	
	
	// scroll smoosing
	var offsetY = -50;
	var time = 500;
	$('a[href^="#"]').click(function() {
		var target = $(this.hash);
		if(!target.length) return ;
		var targetY = target.offset().top+offsetY;
		$('html,body').animate({scrollTop: targetY}, time, 'swing');
		window.history.pushState(null, null, this.hash);
		return false;
	});
	$(document).on('click','.pgTop a',function(){
		$('html,body').animate({scrollTop: 0}, 500, 'swing');
		return false;
	});
	
});
	


/* jQuery.Wait */
(function(m,j){var d={},e=1,f=m.fn.each,k=m.fn.on||m.fn.bind,n=m.fn.off||m.fn.unbind,l={};function a(p,q){q=m(q);q.prevObject=p;var o=p.length;if(o!==q.length){return q}while(o--){if(p[o]!==q[o]){return q}}return p}function c(o){var p=[],q=o.length;while(q--){p[q]=o[q].g}return p}function h(p,w,t,s){t=t||[];var u={f:p,i:w},q=false,o,x,y;function v(A,B){A.e=false;function z(){A.k=a(A.f,A.k);A.e=true;r()}return typeof B.promise=="function"?B.promise().then(z):B.then(z,true)}function r(A){while(!q){try{q=!q;if(typeof s=="function"){s(m.makeArray(u.k||u.f))}if(u.e==false){break}if(!u.i.j){if(y&&(!t.length||t[0].b)){if(u.f&&typeof u.f.promise=="function"){u.f.promise().then(y.resolve)}else{y.resolveWith(u.f)}y=null}if(!t.length){return u.f}x=t[0].l&&t[0].l(r,u,t);if(!x){break}u=x;continue}o=u.f&&u.f[u.i.j]||l[u.i.j];if(!o){throw'no such method "'+u.i.j+'" on object ('+u.f+")"}if(o.timing&&!u.e){u.e=false;u=o.timing(r,u,t,s)||u}else{if(!o.timing&&!u.e){u.k=u.f[u.i.j].apply(u.f,u.i.c);if(t.length&&u.k&&u.k instanceof g){v(u,u.k);continue}}x={f:u.k,i:u.i.k};u.e=false;if(typeof u.d=="function"){u.d.apply(u.f,c(t))}u=x}}catch(z){q=!q;throw z}finally{q=!q}}return A}if(m.Deferred){r.promise=function(A,B){var z=(y=y||m.Deferred()).promise(B);r();return z}}return r}function g(q,r,p){this[".methods"]=r;this[".callback"]=p;this.length=0;Array.prototype.push.apply(this,m.makeArray(this._=q._=q));for(var o in q){if(!(o in g.prototype)&&typeof q[o]=="function"){this[o]=i(o)}}}if(m.Deferred){g.prototype.promise=function(o,p){if(typeof o=="object"){p=o;o=null}return(this[".callback"]&&typeof this[".callback"].promise=="function")?this[".callback"].promise(o,p):m.Deferred().resolveWith(this).promise(p)}}function i(o){return g.prototype[o]=function(){this[".methods"].j=o;this[".methods"].c=arguments;this[".methods"]=this[".methods"].k={};return this[".callback"]?this[".callback"](this,o,arguments):this}}m.each(["bind","on","one","live","delegate"],function(p,o){if(m.fn[o]){var q=m.fn[o];m.fn[o]=function(){var u,x,w,s,r,t=this;for(u=0;u<arguments.length;u++){if(typeof arguments[u]=="function"||(arguments[u]&&typeof arguments[u]=="object")||arguments[u]===false){if(arguments[u]!==m){if(typeof arguments[u]=="function"&&m.guid){arguments[u].guid=arguments[u].guid||m.guid++}return q.apply(t,arguments)}break}}Array.prototype.splice.call(arguments,u,1,function(){s=h(t.$(this),x,[{g:m.extend(Array.prototype.shift.apply(arguments),arguments),b:true}],function(y){w.length=0;Array.prototype.push.apply(w,y)});if(r){s.promise().then(r.resolve);r=null}return s()});function v(){return s?s(w):w}if(m.Deferred){v.promise=function(y,z){if(typeof y=="object"){z=y;y=null}return(s&&!y)?s.promise(y,z):(r=r||m.Deferred()).promise(z)}}return w=new g(q.apply(t,arguments),x={},v)}}});m.each(["animate","load"],function(p,o){if(m.fn[o]){var q=m.fn[o];m.fn[o]=function(){while(arguments.length&&arguments[arguments.length-1]==null){Array.prototype.pop.apply(arguments)}if(this.length&&arguments.length>1&&arguments[arguments.length-1]===m){var r="_timing"+e++;arguments[arguments.length-1]=function(){m(this).trigger(r)};return this.each().one(r).all(q.apply(this,arguments))}return q.apply(this,arguments)}}});m.each(["wait","repeat","join","then"],function(p,o){m.fn[o]=function(){var r={},q=new g(this,r,h(this,r,[],function(s){q.length=0;Array.prototype.push.apply(q,s)}));return q[o].apply(q,arguments)}});m.fn.join.timing=function(p,r){var q,o,s=r.f.length;if(typeof r.i.c[0]=="string"){q=r.i.c[0];if(typeof r.i.c[1]=="function"){r.d=r.i.c[1]}else{o=r.i.c[1];r.d=r.i.c[2]}}else{if(typeof r.i.c[0]=="function"){r.d=r.i.c[0]}else{o=r.i.c[0];r.d=r.i.c[1]}}r.k=r.f;r.e=!s;if(o){r.f.promise(q==null?"fx":q).then(function(){r.e=true;p()})}else{r.f.queue(q==null?"fx":q,function(t){r.e=!--s;p();t()})}};m.fn.then.timing=function(o,p){p.d=p.i.c[0];p.k=p.f;p.e=true;if(p.i.c[1]){Array.prototype.shift.apply(p.i.c)}};m.fn.wait.timing=function(s,t,u){var r,o,v,p=t.f;r=t.i.c[0];t.d=t.i.c[1];function w(){n.call(o?n.call(p,o,w):p,"unwait",q);t.e=true;t.k=a(t.f,t.k);s()}function q(x,y){n.call(o?n.call(m(this),o,w):m(this),"unwait",q);p=p.not(this);if(!y){t.k=t.k.not(this)}if(!p.length){t.e=t.k.length;t.k=a(t.f,t.k);j.clearTimeout(v);t={f:p}}s()}k.call(p,"unwait",q);t.k=p;if(r==null||r==m){r=p}if(typeof r=="function"){r=r.apply(p,c(u))}if(typeof r=="string"){k.call(p,o=r,w)}else{if(r&&typeof r.promise=="function"){r.promise().then(w)}else{if(r&&typeof r.then=="function"){r.then(w,true)}else{v=j.setTimeout(w,Math.max(0,r))}}}};m.fn.each=function(q){if(!q||q===m){var p={},o=new g(this,p,h(this,p,[],function(r){o.length=0;Array.prototype.push.apply(o,r)}));return o.each(q)}return f.apply(this,arguments)};m.fn.each.timing=function(r,v,w,u){if(v.i.c[0]&&v.i.c[0]!==m){v.e=true;v.k=f.apply(v.f,v.i.c);return}var B=Math.max(v.f.length,1),p=0,y,s,t,A=[],z=[],x=m.extend({},v.f),q=v.i.c[0]===m;if(q){j.setTimeout(function(){t=true;r()},0)}function o(){if(q){if(p<B){(A[p])()}}else{for(var C=0;C<B;C++){(A[C])()}}return x}for(y in g.prototype){x[y]=o}x.length=B;for(y=0;y<B;y++){(function(C){var E=w.slice(),D=v.f.eq(C);z[C]=D.get();E.unshift({g:C,a:function(F){p++;if(p==B){s=F.i.k}r()},h:l.all,l:function(G,F){if(t){p++;if(p==B){s=F.i}r()}}});A[C]=h(D,v.i.k,E,function(G){z[C]=G;x.length=0;for(var F=0;F<B;F++){Array.prototype.push.apply(x,z[F])}if(u){u(m.makeArray(x))}})})(y)}v.k=x;v.e=true;v.l=function(E,D){if(p==B){w.shift();return{f:a(v.f,x),i:s}}var C=p;o();if(p!=C){return D}};v.g=B;w.unshift(v)};l.all=function(o){m.extend(o.i,{k:m.extend({},o.i),j:"all",c:[]});o.e=null};l.all.timing=function(o,q,p){if(!p.length||!p[0].h){throw".all() method must be used after .each() only"}if(!p[0].a){p[0].h(q);return}p[0].a(q)};m.fn.repeat.timing=function(s,v,w){var q,t,u,o,p;if(typeof v.i.c[0]=="function"){v.d=v.i.c[0]}else{if(typeof v.i.c[1]=="function"){q=v.i.c[0];v.d=v.i.c[1]}else{q=v.i.c[0];t=v.i.c[1];v.d=v.i.c[2]}}function x(){v.k=v.k||v.f;v.e=true;s()}function r(){n.call(o?n.call(m(this),o,x):m(this),"unrepeat",r);var y=v.f.not(this);v.k=(v.k==v.f)?y:v.k;v.f=y;v.e=v.f.length&&v.e;q=v.f.length&&q;j.clearInterval(!v.f.length&&p);s()}v.l=function(z,y){if(v.e||u){v.g++;v.k=v.k||v.f;v.e=v.e||(q&&y.f&&y.f.length);return v}};if(q==null){t=q=true;j.setTimeout(function(){u=true;s()},0)}else{if(typeof q=="string"){k.call(v.f,o=q,x)}else{p=j.setInterval(x,Math.max(0,q))}q=false}k.call(v.f,"unrepeat",r);v.k=v.f;v.g=0;v.n=function(y){if(y){r.apply(v.f)}if(q){x()}};v.h=l.until;if(t){x()}w.unshift(v)};l.until=function(o){m.extend(o.i,{k:m.extend({},o.i),j:"until",c:[]});o.e=null};l.until.timing=function(o,r,q){if(!q.length||!q[0].h){throw".until() method must be used after .repeat() only"}if(!q[0].n){q[0].h(r);return}var s=r.i.c[0],p=r.i.c[1];if(s===m){s=null;p=r.i.c.length<=1||p}if(typeof s=="function"){s=s.apply(r.f,c(q))}if(s==null){s=!r.f.size()}if(typeof s=="object"){s=s.toString()}if(typeof s=="number"){s=q[0].g>=s-1}if(s){r.e=true;r.k=r.f;q.shift().n(s)}else{if(p){q[0].k=r.f}r=q[0];r.g++;r.n(s);return r}};new g(l);m.each(["unwait","unrepeat"],function(p,o){m.fn[o]=function(){return this.trigger(o,arguments)}});m.each(["wait","repeat","join","then","unwait","unrepeat"],function(p,o){m[o]=function(){var q=typeof arguments[0]=="string"?Array.prototype.shift.apply(arguments):"";return m.fn[o].apply(d[q]=(d[q]||m("<div>").text(q)),arguments)}});function b(r,u,q){if(typeof r=="string"){q=new Function("x","return ["+r+"\n,x]");r=function(w,v){v=q(w);p.x=v[1];return v[0]}}var o=typeof u=="function",t=typeof r=="function",p=function(v){if(arguments.length==1){p.x=v;if(o){u(v)}}else{return s()}};function s(v){v=o?u():p.x;return t?r(v):v}p.x=0;p._={toString:p.$=p.toString=s.toString=s};p.mod=function(v){return b(function(w){return w%v},p)};p.add=function(v){return b(function(w){return w+v},p)};p.neg=function(){return b("-x",p)};p.$$=p.X=function(v){return b(v,p)};m.each("abcdefghij",function(v,w){p[v]=p[w]=function(){p(arguments[v])}});return p}j.$$=m.$$=m.X=b;m.fn.$=function(){var o=m.apply(j,arguments);o.prevObject=this;return o}})(jQuery,window);


