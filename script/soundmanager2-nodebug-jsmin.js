/*
   SoundManager 2: Javascript Sound for the Web
   --------------------------------------------
   http://schillmania.com/projects/soundmanager2/

   Copyright (c) 2007, Scott Schiller. All rights reserved.
   Code provided under the BSD License:
   http://schillmania.com/projects/soundmanager2/license.txt

   V2.95b.20100101+DEV.20100121
*/
var soundManager=null;function SoundManager(b,a){this.flashVersion=8;this.debugMode=false;this.debugFlash=false;this.useConsole=true;this.consoleOnly=false;this.waitForWindowLoad=false;this.nullURL="null.mp3";this.allowPolling=true;this.useFastPolling=false;this.useMovieStar=false;this.bgColor="#ffffff";this.useHighPerformance=false;this.flashLoadTimeout=1000;this.wmode=null;this.allowFullScreen=true;this.allowScriptAccess="always";this.defaultOptions={autoLoad:false,stream:true,autoPlay:false,onid3:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onstop:null,onfinish:null,onbeforefinish:null,onbeforefinishtime:5000,onbeforefinishcomplete:null,onjustbeforefinish:null,onjustbeforefinishtime:200,multiShot:true,multiShotEvents:false,position:null,pan:0,volume:100};this.flash9Options={isMovieStar:null,usePeakData:false,useWaveformData:false,useEQData:false,onbufferchange:null,ondataerror:null};this.movieStarOptions={onmetadata:null,useVideo:false,bufferTime:null};var h=null;var g=this;var e="soundManager";this.version=null;this.versionNumber="V2.95b.20100101+DEV.20100121";this.movieURL=null;this.url=null;this.altURL=null;this.swfLoaded=false;this.enabled=false;this.o=null;this.id=(a||"sm2movie");this.oMC=null;this.sounds={};this.soundIDs=[];this.muted=false;this.isFullScreen=false;this.isIE=(navigator.userAgent.match(/MSIE/i));this.isSafari=(navigator.userAgent.match(/safari/i));this.debugID="soundmanager-debug";this.debugURLParam=/([#?&])debug=1/i;this.specialWmodeCase=false;this._onready=[];this._debugOpen=true;this._didAppend=false;this._appendSuccess=false;this._didInit=false;this._disabled=false;this._windowLoaded=false;this._hasConsole=(typeof console!="undefined"&&typeof console.log!="undefined");this._debugLevels=["log","info","warn","error"];this._defaultFlashVersion=8;this._oRemoved=null;this._oRemovedHTML=null;var d=function(i){return document.getElementById(i)};this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i};this.netStreamTypes=["aac","flv","mov","mp4","m4v","f4v","m4a","mp4v","3gp","3g2"];this.netStreamPattern=new RegExp("\\.("+this.netStreamTypes.join("|")+")(\\?.*)?$","i");this.filePattern=null;this.features={buffering:false,peakData:false,waveformData:false,eqData:false,movieStar:false};this.sandbox={type:null,types:{remote:"remote (domain-based) rules",localWithFile:"local with file access (no internet access)",localWithNetwork:"local with network (internet access only, no local access)",localTrusted:"local, trusted (local+internet access)"},description:null,noRemote:null,noLocal:null};this._setVersionInfo=function(){if(g.flashVersion!=8&&g.flashVersion!=9){alert(g._str("badFV",g.flashVersion,g._defaultFlashVersion));g.flashVersion=g._defaultFlashVersion}g.version=g.versionNumber+(g.flashVersion==9?" (AS3/Flash 9)":" (AS2/Flash 8)");if(g.flashVersion>8){g.defaultOptions=g._mergeObjects(g.defaultOptions,g.flash9Options);g.features.buffering=true}if(g.flashVersion>8&&g.useMovieStar){g.defaultOptions=g._mergeObjects(g.defaultOptions,g.movieStarOptions);g.filePatterns.flash9=new RegExp("\\.(mp3|"+g.netStreamTypes.join("|")+")(\\?.*)?$","i");g.features.movieStar=true}else{g.useMovieStar=false;g.features.movieStar=false}g.filePattern=g.filePatterns[(g.flashVersion!=8?"flash9":"flash8")];g.movieURL=(g.flashVersion==8?"soundmanager2.swf":"soundmanager2_flash9.swf");g.features.peakData=g.features.waveformData=g.features.eqData=(g.flashVersion>8)};this._overHTTP=(document.location?document.location.protocol.match(/http/i):null);this._waitingforEI=false;this._initPending=false;this._tryInitOnFocus=(this.isSafari&&typeof document.hasFocus=="undefined");this._isFocused=(typeof document.hasFocus!="undefined"?document.hasFocus():null);this._okToDisable=!this._tryInitOnFocus;this.useAltURL=!this._overHTTP;var f="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html";this.strings={};this._str=function(){var p=Array.prototype.slice.call(arguments);var n=p.shift();var m=g.strings&&g.strings[n]?g.strings[n]:"";if(m&&p&&p.length){for(var l=0,k=p.length;l<k;l++){m=m.replace("%s",p[l])}}return m};this.supported=function(){return(g._didInit&&!g._disabled)};this.getMovie=function(i){return g.isIE?window[i]:(g.isSafari?d(i)||document[i]:d(i))};this.loadFromXML=function(i){try{g.o._loadFromXML(i)}catch(j){g._failSafely();return true}};this.createSound=function(j){var l="soundManager.createSound(): ";if(!g._didInit){throw g._complain(l+g._str("notReady"),arguments.callee.caller)}if(arguments.length==2){j={id:arguments[0],url:arguments[1]}}var k=g._mergeObjects(j);var i=k;if(i.id.toString().charAt(0).match(/^[0-9]$/)){}if(g._idCheck(i.id,true)){return g.sounds[i.id]}if(g.flashVersion>8&&g.useMovieStar){if(i.isMovieStar===null){i.isMovieStar=(i.url.match(g.netStreamPattern)?true:false)}if(i.isMovieStar){}if(i.isMovieStar&&(i.usePeakData||i.useWaveformData||i.useEQData)){i.usePeakData=false;i.useWaveformData=false;i.useEQData=false}}g.sounds[i.id]=new h(i);g.soundIDs[g.soundIDs.length]=i.id;if(g.flashVersion==8){g.o._createSound(i.id,i.onjustbeforefinishtime)}else{g.o._createSound(i.id,i.url,i.onjustbeforefinishtime,i.usePeakData,i.useWaveformData,i.useEQData,i.isMovieStar,(i.isMovieStar?i.useVideo:false),(i.isMovieStar?i.bufferTime:false))}if(i.autoLoad||i.autoPlay){if(g.sounds[i.id]){g.sounds[i.id].load(i)}}if(i.autoPlay){g.sounds[i.id].play()}return g.sounds[i.id]};this.createVideo=function(i){var j="soundManager.createVideo(): ";if(arguments.length==2){i={id:arguments[0],url:arguments[1]}}if(g.flashVersion>=9){i.isMovieStar=true;i.useVideo=true}else{return false}if(!g.useMovieStar){}return g.createSound(i)};this.destroySound=function(k,j){if(!g._idCheck(k)){return false}for(var l=0;l<g.soundIDs.length;l++){if(g.soundIDs[l]==k){g.soundIDs.splice(l,1);continue}}g.sounds[k].unload();if(!j){g.sounds[k].destruct()}delete g.sounds[k]};this.destroyVideo=this.destroySound;this.load=function(i,j){if(!g._idCheck(i)){return false}g.sounds[i].load(j)};this.unload=function(i){if(!g._idCheck(i)){return false}g.sounds[i].unload()};this.play=function(i,j){var k="soundManager.play(): ";if(!g._didInit){throw g._complain(k+g._str("notReady"),arguments.callee.caller)}if(!g._idCheck(i)){if(typeof j!="Object"){j={url:j}}if(j&&j.url){j.id=i;g.createSound(j)}else{return false}}g.sounds[i].play(j)};this.start=this.play;this.setPosition=function(i,j){if(!g._idCheck(i)){return false}g.sounds[i].setPosition(j)};this.stop=function(i){if(!g._idCheck(i)){return false}g.sounds[i].stop()};this.stopAll=function(){for(var i in g.sounds){if(g.sounds[i] instanceof h){g.sounds[i].stop()}}};this.pause=function(i){if(!g._idCheck(i)){return false}g.sounds[i].pause()};this.pauseAll=function(){for(var j=g.soundIDs.length;j--;){g.sounds[g.soundIDs[j]].pause()}};this.resume=function(i){if(!g._idCheck(i)){return false}g.sounds[i].resume()};this.resumeAll=function(){for(var j=g.soundIDs.length;j--;){g.sounds[g.soundIDs[j]].resume()}};this.togglePause=function(i){if(!g._idCheck(i)){return false}g.sounds[i].togglePause()};this.setPan=function(i,j){if(!g._idCheck(i)){return false}g.sounds[i].setPan(j)};this.setVolume=function(j,i){if(!g._idCheck(j)){return false}g.sounds[j].setVolume(i)};this.mute=function(j){var l="soundManager.mute(): ";if(typeof j!="string"){j=null}if(!j){for(var k=g.soundIDs.length;k--;){g.sounds[g.soundIDs[k]].mute()}g.muted=true}else{if(!g._idCheck(j)){return false}g.sounds[j].mute()}};this.muteAll=function(){g.mute()};this.unmute=function(j){var l="soundManager.unmute(): ";if(typeof j!="string"){j=null}if(!j){for(var k=g.soundIDs.length;k--;){g.sounds[g.soundIDs[k]].unmute()}g.muted=false}else{if(!g._idCheck(j)){return false}g.sounds[j].unmute()}};this.unmuteAll=function(){g.unmute()};this.toggleMute=function(i){if(!g._idCheck(i)){return false}g.sounds[i].toggleMute()};this.getMemoryUse=function(){if(g.flashVersion==8){return 0}if(g.o){return parseInt(g.o._getMemoryUse(),10)}};this.disable=function(k){if(typeof k=="undefined"){k=false}if(g._disabled){return false}g._disabled=true;for(var j=g.soundIDs.length;j--;){g._disableObject(g.sounds[g.soundIDs[j]])}g.initComplete(k)};this.canPlayURL=function(i){return(i?(i.match(g.filePattern)?true:false):null)};this.getSoundById=function(j,k){if(!j){throw new Error("SoundManager.getSoundById(): sID is null/undefined")}var i=g.sounds[j];if(!i&&!k){}return i};this.onready=function(j,i){if(j&&j instanceof Function){if(g._didInit){}if(!i){i=window}g._addOnReady(j,i);g._processOnReady();return true}else{throw g._str("needFunction")}};this.oninitmovie=function(){};this.onload=function(){soundManager._wD("soundManager.onload()",1)};this.onerror=function(){};this._idCheck=this.getSoundById;this._complain=function(j,l){var k="Error: ";if(!l){return new Error(k+j)}var n=new Error("");var o=null;if(n.stack){try{var p="@";var q=n.stack.split(p);o=q[4]}catch(m){o=n.stack}}if(typeof console!="undefined"&&typeof console.trace!="undefined"){console.trace()}var i=k+j+". \nCaller: "+l.toString()+(n.stack?" \nTop of stacktrace: "+o:(n.message?" \nMessage: "+n.message:""));return new Error(i)};var c=function(){return false};c._protected=true;this._disableObject=function(j){for(var i in j){if(typeof j[i]=="function"&&typeof j[i]._protected=="undefined"){j[i]=c}}i=null};this._failSafely=function(i){if(typeof i=="undefined"){i=false}if(!g._disabled||i){g.disable(i)}};this._normalizeMovieURL=function(i){var j=null;if(i){if(i.match(/\.swf(\?.*)?$/i)){j=i.substr(i.toLowerCase().lastIndexOf(".swf?")+4);if(j){return i}}else{if(i.lastIndexOf("/")!=i.length-1){i=i+"/"}}}return(i&&i.lastIndexOf("/")!=-1?i.substr(0,i.lastIndexOf("/")+1):"./")+g.movieURL};this._getDocument=function(){return(document.body?document.body:(document.documentElement?document.documentElement:document.getElementsByTagName("div")[0]))};this._getDocument._protected=true;this._setPolling=function(i,j){if(!g.o||!g.allowPolling){return false}g.o._setPolling(i,j)};this._createMovie=function(z,n){var t=null;var y=(n?n:g.url);var r=(g.altURL?g.altURL:y);if(g.debugURLParam.test(window.location.href.toString())){g.debugMode=true}if(g._didAppend&&g._appendSuccess){return false}g._didAppend=true;g._setVersionInfo();g.url=g._normalizeMovieURL(g._overHTTP?y:r);n=g.url;if(g.useHighPerformance&&g.useMovieStar&&g.defaultOptions.useVideo===true){t="soundManager note: disabling highPerformance, not applicable with movieStar mode+useVideo";g.useHighPerformance=false}g.wmode=(!g.wmode&&g.useHighPerformance&&!g.useMovieStar?"transparent":g.wmode);if(g.wmode!==null&&g.flashLoadTimeout!==0&&(!g.useHighPerformance||g.debugFlash)&&!g.isIE&&navigator.platform.match(/win32/i)){g.specialWmodeCase=true;g.wmode=null}if(g.flashVersion==8){g.allowFullScreen=false}var C={name:z,id:z,src:n,width:"100%",height:"100%",quality:"high",allowScriptAccess:g.allowScriptAccess,bgcolor:g.bgColor,pluginspage:"http://www.macromedia.com/go/getflashplayer",type:"application/x-shockwave-flash",wmode:g.wmode,allowfullscreen:(g.allowFullScreen?"true":"false")};if(g.debugFlash){C.FlashVars="debug=1"}if(!g.wmode){delete C.wmode}var o=null;var B=null;var u=null;var q=null;if(g.isIE){o=document.createElement("div");u='<object id="'+z+'" data="'+n+'" type="'+C.type+'" width="'+C.width+'" height="'+C.height+'"><param name="movie" value="'+n+'" /><param name="AllowScriptAccess" value="'+g.allowScriptAccess+'" /><param name="quality" value="'+C.quality+'" />'+(g.wmode?'<param name="wmode" value="'+g.wmode+'" /> ':"")+'<param name="bgcolor" value="'+g.bgColor+'" /><param name="allowFullScreen" value="'+C.allowFullScreen+'" />'+(g.debugFlash?'<param name="FlashVars" value="'+C.FlashVars+'" />':"")+"<!-- --></object>"}else{o=document.createElement("embed");for(B in C){if(C.hasOwnProperty(B)){o.setAttribute(B,C[B])}}}var j=null;var k=null;if(g.debugMode){j=document.createElement("div");j.id=g.debugID+"-toggle";k={position:"fixed",bottom:"0px",right:"0px",width:"1.2em",height:"1.2em",lineHeight:"1.2em",margin:"2px",textAlign:"center",border:"1px solid #999",cursor:"pointer",background:"#fff",color:"#333",zIndex:10001};j.appendChild(document.createTextNode("-"));j.onclick=g._toggleDebug;j.title="Toggle SM2 debug console";if(navigator.userAgent.match(/msie 6/i)){j.style.position="absolute";j.style.cursor="hand"}for(B in k){if(k.hasOwnProperty(B)){j.style[B]=k[B]}}}var w=g._getDocument();if(w){g.oMC=d("sm2-container")?d("sm2-container"):document.createElement("div");var v=(g.debugMode?" sm2-debug":"")+(g.debugFlash?" flash-debug":"");if(!g.oMC.id){g.oMC.id="sm2-container";g.oMC.className="movieContainer"+v;var p=null;q=null;if(g.useHighPerformance){p={position:"fixed",width:"8px",height:"8px",bottom:"0px",left:"0px",overflow:"hidden"}}else{p={position:"absolute",width:"8px",height:"8px",top:"-9999px",left:"-9999px"}}var l=null;if(!g.debugFlash){for(l in p){if(p.hasOwnProperty(l)){g.oMC.style[l]=p[l]}}}try{if(!g.isIE){g.oMC.appendChild(o)}w.appendChild(g.oMC);if(g.isIE){q=g.oMC.appendChild(document.createElement("div"));q.className="sm2-object-box";q.innerHTML=u}g._appendSuccess=true}catch(A){throw new Error(g._str("appXHTML"))}}else{if(g.debugMode||g.debugFlash){g.oMC.className+=v}g.oMC.appendChild(o);if(g.isIE){q=g.oMC.appendChild(document.createElement("div"));q.className="sm2-object-box";q.innerHTML=u}g._appendSuccess=true}if(g.debugMode&&!d(g.debugID)&&((!g._hasConsole||!g.useConsole)||(g.useConsole&&g._hasConsole&&!g.consoleOnly))){var m=document.createElement("div");m.id=g.debugID;m.style.display=(g.debugMode?"block":"none");if(g.debugMode&&!d(j.id)){try{w.appendChild(j)}catch(i){throw new Error(g._str("appXHTML"))}w.appendChild(m)}}w=null}if(t){}};this._writeDebug=function(j,q,l){if(!g.debugMode){return false}if(typeof l!="undefined"&&l){j=j+" | "+new Date().getTime()}if(g._hasConsole&&g.useConsole){var i=g._debugLevels[q];if(typeof console[i]!="undefined"){console[i](j)}else{console.log(j)}if(g.useConsoleOnly){return true}}var p="soundmanager-debug";var n=null;try{n=d(p);if(!n){return false}var m=document.createElement("div");if(++g._wdCount%2===0){m.className="sm2-alt"}if(typeof q=="undefined"){q=0}else{q=parseInt(q,10)}m.appendChild(document.createTextNode(j));if(q){if(q>=2){m.style.fontWeight="bold"}if(q==3){m.style.color="#ff3333"}}n.insertBefore(m,n.firstChild)}catch(k){}n=null};this._writeDebug._protected=true;this._wdCount=0;this._wdCount._protected=true;this._wD=this._writeDebug;this._wDS=function(j,i){if(!j){return""}else{return}};this._wDS._protected=true;this._wDAlert=function(i){alert(i)};if(window.location.href.indexOf("debug=alert")+1&&g.debugMode){g._wD=g._wDAlert}this._toggleDebug=function(){var j=d(g.debugID);var i=d(g.debugID+"-toggle");if(!j){return false}if(g._debugOpen){i.innerHTML="+";j.style.display="none"}else{i.innerHTML="-";j.style.display="block"}g._debugOpen=!g._debugOpen};this._toggleDebug._protected=true;this._debug=function(){for(var l=0,k=g.soundIDs.length;l<k;l++){g.sounds[g.soundIDs[l]]._debug()}};this._debugTS=function(l,i,j){if(typeof sm2Debugger!="undefined"){try{sm2Debugger.handleEvent(l,i,j)}catch(k){}}};this._debugTS._protected=true;this._mergeObjects=function(k,j){var n={};for(var l in k){if(k.hasOwnProperty(l)){n[l]=k[l]}}var m=(typeof j=="undefined"?g.defaultOptions:j);for(var p in m){if(m.hasOwnProperty(p)&&typeof n[p]=="undefined"){n[p]=m[p]}}return n};this.createMovie=function(i){if(i){g.url=i}g._initMovie()};this.go=this.createMovie;this._initMovie=function(){if(g.o){return false}g.o=g.getMovie(g.id);if(!g.o){if(!g.oRemoved){g._createMovie(g.id,g.url)}else{if(!g.isIE){g.oMC.appendChild(g.oRemoved)}else{g.oMC.innerHTML=g.oRemovedHTML}g.oRemoved=null;g._didAppend=true}g.o=g.getMovie(g.id)}if(g.o){if(g.flashLoadTimeout>0){}}if(typeof g.oninitmovie=="function"){setTimeout(g.oninitmovie,1)}};this.waitForExternalInterface=function(){if(g._waitingForEI){return false}g._waitingForEI=true;if(g._tryInitOnFocus&&!g._isFocused){return false}if(g.flashLoadTimeout>0){if(!g._didInit){var i=g.getMoviePercent()}setTimeout(function(){var j=g.getMoviePercent();if(!g._didInit){if(!g._overHTTP){if(!g.debugFlash){}}if(j===0){}g._debugTS("flashtojs",false,": Timed out"+(g._overHTTP)?" (Check flash security or flash blockers)":" (No plugin/missing SWF?)")}if(!g._didInit&&g._okToDisable){g._failSafely(true)}},g.flashLoadTimeout)}else{if(!g._didInit){}}};this.getMoviePercent=function(){return(g.o&&typeof g.o.PercentLoaded!="undefined"?g.o.PercentLoaded():null)};this.handleFocus=function(){if(g._isFocused||!g._tryInitOnFocus){return true}g._okToDisable=true;g._isFocused=true;if(g._tryInitOnFocus){window.removeEventListener("mousemove",g.handleFocus,false)}g._waitingForEI=false;setTimeout(g.waitForExternalInterface,500);if(window.removeEventListener){window.removeEventListener("focus",g.handleFocus,false)}else{if(window.detachEvent){window.detachEvent("onfocus",g.handleFocus)}}};this.initComplete=function(i){if(g._didInit){return false}g._didInit=true;if(g._disabled||i){g._processOnReady();g._debugTS("onload",false);g.onerror.apply(window);return false}else{g._debugTS("onload",true)}if(g.waitForWindowLoad&&!g._windowLoaded){if(window.addEventListener){window.addEventListener("load",g._initUserOnload,false)}else{if(window.attachEvent){window.attachEvent("onload",g._initUserOnload)}}return false}else{if(g.waitForWindowLoad&&g._windowLoaded){}g._initUserOnload()}};this._addOnReady=function(j,i){g._onready.push({method:j,scope:(i||null),fired:false})};this._processOnReady=function(){if(!g._didInit){return false}var l={success:(!g._disabled)};var k=[];for(var n=0,m=g._onready.length;n<m;n++){if(g._onready[n].fired!==true){k.push(g._onready[n])}}if(k.length){for(n=0,m=k.length;n<m;n++){if(k[n].scope){k[n].method.apply(k[n].scope,[l])}else{k[n].method(l)}k[n].fired=true}}};this._initUserOnload=function(){window.setTimeout(function(){g._processOnReady();g.onload.apply(window)})};this.init=function(){g._initMovie();if(g._didInit){return false}if(window.removeEventListener){window.removeEventListener("load",g.beginDelayedInit,false)}else{if(window.detachEvent){window.detachEvent("onload",g.beginDelayedInit)}}try{g.o._externalInterfaceTest(false);if(!g.allowPolling){}else{g._setPolling(true,g.useFastPolling?true:false)}if(!g.debugMode){g.o._disableDebug()}g.enabled=true;g._debugTS("jstoflash",true)}catch(i){g._debugTS("jstoflash",false);g._failSafely(true);g.initComplete();return false}g.initComplete()};this.beginDelayedInit=function(){g._windowLoaded=true;setTimeout(g.waitForExternalInterface,500);setTimeout(g.beginInit,20)};this.beginInit=function(){if(g._initPending){return false}g.createMovie();g._initMovie();g._initPending=true;return true};this.domContentLoaded=function(){if(document.removeEventListener){document.removeEventListener("DOMContentLoaded",g.domContentLoaded,false)}g.go()};this._externalInterfaceOK=function(i){if(g.swfLoaded){return false}var j=new Date().getTime();g._debugTS("swf",true);g._debugTS("flashtojs",true);g.swfLoaded=true;g._tryInitOnFocus=false;if(g.isIE){setTimeout(g.init,100)}else{g.init()}};this._setSandboxType=function(i){var j=g.sandbox;j.type=i;j.description=j.types[(typeof j.types[i]!="undefined"?i:"unknown")];if(j.type=="localWithFile"){j.noRemote=true;j.noLocal=false}else{if(j.type=="localWithNetwork"){j.noRemote=false;j.noLocal=true}else{if(j.type=="localTrusted"){j.noRemote=false;j.noLocal=false}}}};this.reboot=function(){if(g.soundIDs.length){}for(var j=g.soundIDs.length;j--;){g.sounds[g.soundIDs[j]].destruct()}try{if(g.isIE){g.oRemovedHTML=g.o.innerHTML}g.oRemoved=g.o.parentNode.removeChild(g.o)}catch(k){}g.oRemovedHTML=null;g.oRemoved=null;g.enabled=false;g._didInit=false;g._waitingForEI=false;g._initPending=false;g._didAppend=false;g._appendSuccess=false;g._disabled=false;g._waitingforEI=true;g.swfLoaded=false;g.soundIDs={};g.sounds=[];g.o=null;for(j=g._onready.length;j--;){g._onready[j].fired=false}window.setTimeout(soundManager.beginDelayedInit,20)};this.destruct=function(){g.disable(true)};h=function(i){var j=this;this.sID=i.id;this.url=i.url;this.options=g._mergeObjects(i);this.instanceOptions=this.options;this._iO=this.instanceOptions;this.pan=this.options.pan;this.volume=this.options.volume;this._lastURL=null;this._debug=function(){if(g.debugMode){var m=null;var o=[];var l=null;var n=null;var k=64;for(m in j.options){if(j.options[m]!==null){if(j.options[m] instanceof Function){l=j.options[m].toString();l=l.replace(/\s\s+/g," ");n=l.indexOf("{");o[o.length]=" "+m+": {"+l.substr(n+1,(Math.min(Math.max(l.indexOf("\n")-1,k),k))).replace(/\n/g,"")+"... }"}else{o[o.length]=" "+m+": "+j.options[m]}}}}};this._debug();this.id3={};this.resetProperties=function(k){j.bytesLoaded=null;j.bytesTotal=null;j.position=null;j.duration=null;j.durationEstimate=null;j.loaded=false;j.playState=0;j.paused=false;j.readyState=0;j.muted=false;j.didBeforeFinish=false;j.didJustBeforeFinish=false;j.isBuffering=false;j.instanceOptions={};j.instanceCount=0;j.peakData={left:0,right:0};j.waveformData={left:[],right:[]};j.eqData=[];j.eqData.left=[];j.eqData.right=[]};j.resetProperties();this.load=function(k){if(typeof k!="undefined"){j._iO=g._mergeObjects(k);j.instanceOptions=j._iO}else{k=j.options;j._iO=k;j.instanceOptions=j._iO;if(j._lastURL&&j._lastURL!=j.url){j._iO.url=j.url;j.url=null}}if(typeof j._iO.url=="undefined"){j._iO.url=j.url}if(j._iO.url==j.url&&j.readyState!==0&&j.readyState!=2){return false}j.url=j._iO.url;j._lastURL=j._iO.url;j.loaded=false;j.readyState=1;j.playState=0;try{if(g.flashVersion==8){g.o._load(j.sID,j._iO.url,j._iO.stream,j._iO.autoPlay,(j._iO.whileloading?1:0))}else{g.o._load(j.sID,j._iO.url,j._iO.stream?true:false,j._iO.autoPlay?true:false);if(j._iO.isMovieStar&&j._iO.autoLoad&&!j._iO.autoPlay){j.pause()}}}catch(l){g._debugTS("onload",false);g.onerror();g.disable()}};this.unload=function(){if(j.readyState!==0){if(j.readyState!=2){j.setPosition(0,true)}g.o._unload(j.sID,g.nullURL);j.resetProperties()}};this.destruct=function(){g.o._destroySound(j.sID);g.destroySound(j.sID,true)};this.play=function(l){var m="SMSound.play(): ";if(!l){l={}}j._iO=g._mergeObjects(l,j._iO);j._iO=g._mergeObjects(j._iO,j.options);j.instanceOptions=j._iO;if(j.playState==1){var k=j._iO.multiShot;if(!k){return false}else{}}if(!j.loaded){if(j.readyState===0){j._iO.autoPlay=true;j.load(j._iO)}else{if(j.readyState==2){return false}else{}}}else{}if(j.paused){j.resume()}else{j.playState=1;if(!j.instanceCount||g.flashVersion>8){j.instanceCount++}j.position=(typeof j._iO.position!="undefined"&&!isNaN(j._iO.position)?j._iO.position:0);if(j._iO.onplay){j._iO.onplay.apply(j)}j.setVolume(j._iO.volume,true);j.setPan(j._iO.pan,true);g.o._start(j.sID,j._iO.loop||1,(g.flashVersion==9?j.position:j.position/1000))}};this.start=this.play;this.stop=function(k){if(j.playState==1){j.playState=0;j.paused=false;if(j._iO.onstop){j._iO.onstop.apply(j)}g.o._stop(j.sID,k);j.instanceCount=0;j._iO={}}};this.setPosition=function(l,k){if(typeof l=="undefined"){l=0}var m=Math.min(j.duration,Math.max(l,0));j._iO.position=m;if(!k){}g.o._setPosition(j.sID,(g.flashVersion==9?j._iO.position:j._iO.position/1000),(j.paused||!j.playState))};this.pause=function(){if(j.paused||j.playState===0){return false}j.paused=true;g.o._pause(j.sID);if(j._iO.onpause){j._iO.onpause.apply(j)}};this.resume=function(){if(!j.paused||j.playState===0){return false}j.paused=false;g.o._pause(j.sID);if(j._iO.onresume){j._iO.onresume.apply(j)}};this.togglePause=function(){if(j.playState===0){j.play({position:(g.flashVersion==9?j.position:j.position/1000)});return false}if(j.paused){j.resume()}else{j.pause()}};this.setPan=function(l,k){if(typeof l=="undefined"){l=0}if(typeof k=="undefined"){k=false}g.o._setPan(j.sID,l);j._iO.pan=l;if(!k){j.pan=l}};this.setVolume=function(k,l){if(typeof k=="undefined"){k=100}if(typeof l=="undefined"){l=false}g.o._setVolume(j.sID,(g.muted&&!j.muted)||j.muted?0:k);j._iO.volume=k;if(!l){j.volume=k}};this.mute=function(){j.muted=true;g.o._setVolume(j.sID,0)};this.unmute=function(){j.muted=false;var k=typeof j._iO.volume!="undefined";g.o._setVolume(j.sID,k?j._iO.volume:j.options.volume)};this.toggleMute=function(){if(j.muted){j.unmute()}else{j.mute()}};this._whileloading=function(k,l,m){if(!j._iO.isMovieStar){j.bytesLoaded=k;j.bytesTotal=l;j.duration=Math.floor(m);j.durationEstimate=parseInt((j.bytesTotal/j.bytesLoaded)*j.duration,10);if(j.durationEstimate===undefined){j.durationEstimate=j.duration}if(j.readyState!=3&&j._iO.whileloading){j._iO.whileloading.apply(j)}}else{j.bytesLoaded=k;j.bytesTotal=l;j.duration=Math.floor(m);j.durationEstimate=j.duration;if(j.readyState!=3&&j._iO.whileloading){j._iO.whileloading.apply(j)}}};this._onid3=function(n,k){var o=[];for(var m=0,l=n.length;m<l;m++){o[n[m]]=k[m]}j.id3=g._mergeObjects(j.id3,o);if(j._iO.onid3){j._iO.onid3.apply(j)}};this._whileplaying=function(m,n,p,l,o){if(isNaN(m)||m===null){return false}if(j.playState===0&&m>0){m=0}j.position=m;if(g.flashVersion>8){if(j._iO.usePeakData&&typeof n!="undefined"&&n){j.peakData={left:n.leftPeak,right:n.rightPeak}}if(j._iO.useWaveformData&&typeof p!="undefined"&&p){j.waveformData={left:p.split(","),right:l.split(",")}}if(j._iO.useEQData){if(typeof o!="undefined"&&o.leftEQ){var k=o.leftEQ.split(",");j.eqData=k;j.eqData.left=k;if(typeof o.rightEQ!="undefined"&&o.rightEQ){j.eqData.right=o.rightEQ.split(",")}}}}if(j.playState==1){if(j.isBuffering){j._onbufferchange(0)}if(j._iO.whileplaying){j._iO.whileplaying.apply(j)}if(j.loaded&&j._iO.onbeforefinish&&j._iO.onbeforefinishtime&&!j.didBeforeFinish&&j.duration-j.position<=j._iO.onbeforefinishtime){j._onbeforefinish()}}};this._onload=function(k){var l="SMSound._onload(): ";k=(k==1?true:false);if(!k){if(g.sandbox.noRemote===true){}if(g.sandbox.noLocal===true){}}j.loaded=k;j.readyState=k?3:2;if(j._iO.onload){j._iO.onload.apply(j)}};this._onbeforefinish=function(){if(!j.didBeforeFinish){j.didBeforeFinish=true;if(j._iO.onbeforefinish){j._iO.onbeforefinish.apply(j)}}};this._onjustbeforefinish=function(k){if(!j.didJustBeforeFinish){j.didJustBeforeFinish=true;if(j._iO.onjustbeforefinish){j._iO.onjustbeforefinish.apply(j)}}};this._onfinish=function(){if(j._iO.onbeforefinishcomplete){j._iO.onbeforefinishcomplete.apply(j)}j.didBeforeFinish=false;j.didJustBeforeFinish=false;if(j.instanceCount){j.instanceCount--;if(!j.instanceCount){j.playState=0;j.paused=false;j.instanceCount=0;j.instanceOptions={}}if(!j.instanceCount||j._iO.multiShotEvents){if(j._iO.onfinish){j._iO.onfinish.apply(j)}}}else{if(j.useVideo){}}};this._onmetadata=function(l){var k="SMSound.onmetadata()";if(!l.width&&!l.height){l.width=320;l.height=240}j.metadata=l;j.width=l.width;j.height=l.height;if(j._iO.onmetadata){j._iO.onmetadata.apply(j)}};this._onbufferchange=function(l){var k="SMSound._onbufferchange()";if(j.playState===0){return false}if(l==j.isBuffering){return false}j.isBuffering=(l==1?true:false);if(j._iO.onbufferchange){j._iO.onbufferchange.apply(j)}};this._ondataerror=function(k){if(j.playState>0){if(j._iO.ondataerror){j._iO.ondataerror.apply(j)}}else{}}};this._onfullscreenchange=function(i){g.isFullScreen=(i==1?true:false);if(!g.isFullScreen){try{window.focus()}catch(j){}}};if(window.addEventListener){window.addEventListener("focus",g.handleFocus,false);window.addEventListener("load",g.beginDelayedInit,false);window.addEventListener("unload",g.destruct,false);if(g._tryInitOnFocus){window.addEventListener("mousemove",g.handleFocus,false)}}else{if(window.attachEvent){window.attachEvent("onfocus",g.handleFocus);window.attachEvent("onload",g.beginDelayedInit);window.attachEvent("unload",g.destruct)}else{g._debugTS("onload",false);soundManager.onerror();soundManager.disable()}}if(document.addEventListener){document.addEventListener("DOMContentLoaded",g.domContentLoaded,false)}}if(typeof SM2_DEFER=="undefined"||!SM2_DEFER){soundManager=new SoundManager()};