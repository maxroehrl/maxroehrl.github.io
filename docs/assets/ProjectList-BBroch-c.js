import{B as e,b as t,f as n,g as r,h as i,i as a,j as o,l as s,m as c,p as l,q as u,r as ee,s as d,t as f,u as p,v as m,w as h,x as g,y as _,z as v}from"./index-Cz63SwEr.js";const y={};function b(e){return e.getIsPending!==void 0}function x(e){if(b(e))return e;let t=!0,n=e.then(e=>(t=!1,e),e=>{throw t=!1,e});return n.getIsPending=function(){return t},n}function S(e){let t={},n=e.attributes;if(!n)return t;for(let e=n.length-1;e>=0;e--)t[n[e].name]=n[e].value;return t}function C(e){return Object.keys(e).reduce((t,n)=>(e[n]!==!1&&e[n]!==null&&e[n]!==void 0&&(t[n]=e[n]),t),{})}function w(e,t){let{class:n,style:r,...i}=S(e),{class:a,style:o,...s}=C(t);return{class:[n,a],style:[r,o],...i,...s}}const T=l({inheritAttrs:!1,__name:`InlineSvg`,props:{src:{},title:{default:void 0},transformSource:{type:Function,default:e=>e},keepDuringLoading:{type:Boolean,default:!0},uniqueIds:{type:[Boolean,String],default:!1},uniqueIdsBase:{default:``}},emits:[`loaded`,`unloaded`,`error`],setup(e,{expose:t,emit:r}){let a=e,s=r,c=i(),l=_(),d=_(),f=_(),p=Math.random().toString(36).substring(2);t({svgElSource:l,request:f}),n(()=>a.src,e=>{g(e)}),g(a.src);function h(e){if(e=e.cloneNode(!0),a.uniqueIds){let t=typeof a.uniqueIds==`string`?a.uniqueIds:p;e=C(e,t,a.uniqueIdsBase)}return e=a.transformSource(e),a.title&&S(e,a.title),e.innerHTML}function g(e){y[e]||(y[e]=v(e)),l.value&&y[e].getIsPending()&&!a.keepDuringLoading&&(l.value=null,s(`unloaded`)),y[e].then(e=>{l.value=e,o(()=>{s(`loaded`,d.value)})}).catch(t=>{l.value&&(l.value=void 0,s(`unloaded`)),delete y[e],s(`error`,t)})}function v(e){return x(new Promise((t,n)=>{let r=new XMLHttpRequest;r.open(`GET`,e,!0),f.value=r,r.onload=()=>{if(r.status>=200&&r.status<400)try{let e=new DOMParser().parseFromString(r.responseText,`text/xml`).getElementsByTagName(`svg`)[0];e?t(e):n(Error(`Loaded file is not valid SVG"`))}catch(e){n(e)}else n(Error(`Error loading SVG`))},r.onerror=n,r.send()}))}let b=()=>l.value?ee(`svg`,{...w(l.value,c),innerHTML:h(l.value),ref:d}):null;function S(e,t){let n=e.getElementsByTagName(`title`);if(n.length)n[0].textContent=t;else{let n=document.createElementNS(`http://www.w3.org/2000/svg`,`title`);n.textContent=t,e.insertBefore(n,e.firstChild)}}function C(e,t,n=``){let r=[`id`,`href`,`xlink:href`,`xlink:role`,`xlink:arcrole`],i=[`href`,`xlink:href`],a=(e,t)=>i.includes(e)&&(t?!t.includes(`#`):!1);return[...e.children].forEach(e=>{var i;if((i=e.attributes)!=null&&i.length){let i=Object.values(e.attributes).map(e=>{let r=/url\((.*?)\)/.exec(e.value);return r!=null&&r[1]&&(e.value=e.value.replace(r[0],`url(${n}${r[1]}_${t})`)),e});r.forEach(e=>{let n=i.find(t=>t.name===e);n&&!a(e,n.value)&&(n.value=`${n.value}_${t}`)})}return e.children.length?C(e,t,n):e}),e}return(e,t)=>(u(),m(b))}}),E={class:`top-content`},D=[`innerHTML`],O={key:0,class:`bottom-links`},k=[`src`,`alt`],A={key:1,class:`bottom-links`},j={class:`bottom-group-hor`},M=[`src`,`alt`],N={key:1},P=[`data-fancybox`,`src`,`alt`],F={key:2,class:`bottom-links`},I=[`href`];var L=l({__name:`Project`,props:{project:{type:Object,required:!0}},setup(t){return(n,i)=>{let o=d(`router-link`);return u(),a(`li`,{class:e({"full-width":t.project.full})},[f(`div`,E,[f(`h2`,null,v(t.project.title),1),f(`em`,null,v(t.project.year),1),f(`div`,{innerHTML:t.project.description},null,8,D)]),t.project.screenshots.length===1?(u(),a(`div`,O,[f(`img`,{"data-fancybox":``,src:t.project.screenshots[0].url,alt:t.project.screenshots[0].caption,class:e(t.project.screenshots[0].class)},null,10,k)])):t.project.screenshots.length>1?(u(),a(`div`,A,[(u(!0),a(p,null,c(t.project.screenshots,n=>(u(),a(`div`,{key:n.url,class:`bottom-group-ver`},[f(`div`,j,[n.thumb?(u(),a(`img`,{key:0,src:n.thumb,alt:n.caption,class:`small-icon`},null,8,M)):r(``,!0),n.caption?(u(),a(`h3`,N,v(n.caption),1)):r(``,!0)]),f(`img`,{"data-fancybox":t.project.id,src:n.url,alt:n.caption,class:e(n.class)},null,10,P)]))),128))])):r(``,!0),t.project.links.length?(u(),a(`div`,F,[(u(!0),a(p,null,c(t.project.links,e=>(u(),a(`div`,{key:e.url},[e.url.startsWith(`/`)?(u(),m(o,{key:1,to:e.url,class:`bottom-link`},{default:s(()=>[h(v(e.text),1)]),_:2},1032,[`to`])):(u(),a(`a`,{key:0,href:e.url,class:`bottom-link`,target:`_blank`},[e.img?(u(),m(g(T),{key:0,src:`./assets/${e.img}.svg`,class:`smaller-icon`},null,8,[`src`])):r(``,!0),f(`p`,null,v(e.text),1)],8,I))]))),128))])):r(``,!0)],2)}}}),R=t(L,[[`__scopeId`,`data-v-15f978ec`]]),z=`/assets/transformer_toolkit_screenshot-DK3ysYC3.png`,B=`/assets/soundboard_screenshot-DTNLYRrh.png`,V=`/assets/vibrance_utility-IW1h4buA.png`,H=`/assets/dolphin_updater_screenshot-_N-Daw3r.png`,U=`/assets/abalone-dI8UwrW-.png`,W=`/assets/tcp_chat-rBvC_sCR.png`,G=`/assets/aurora_screenshot-BMqoQyz4.png`,K=`/assets/phi_screenshot-DmhNFz4J.png`,te=`/assets/rho_screenshot-BoG_3jdv.png`,q=`/assets/rho-CfXyBgxV.png`,J=`/assets/phi-CVBUBdjX.png`,Y=`/assets/aurora-BZSSahQs.png`,X=`/assets/lante_light_screenshot-Dxb2Ax-l.png`,Z=`/assets/lante_dark_screenshot-BX1JPsyM.png`,Q=`/assets/lante_chat_screenshot-BbMqybd2.png`,ne=`/assets/lante_history_screenshot-5SLeMZlL.png`,re=`/assets/d3-D1DUamuv.png`,ie=`/assets/simplification-CYCznMQK.jpg`,ae=`/assets/prismatik-eBmlpUTC.png`,oe=`/assets/photobox-D4qtqM2T.jpg`,se=`/assets/vueddit1-DHumijuO.png`,ce=`/assets/vueddit2-CBwY3fBZ.png`,le=`/assets/aurora_cm11-BQozwQLs.jpg`,ue=`/assets/remics_jb-VOoEtQmU.png`,de=`/assets/remics_jb2-DN6Ml12z.png`,fe=`/assets/remics_jb3-DCYjMW1L.png`,pe=`/assets/remics_jb4-aiIF884b.png`,$=`/assets/vueddit2_1-CPtUMxCS.png`,me=`/assets/vueddit2_2-DvAiqXui.png`,he=`/assets/home-CyL790H5.png`,ge=`/assets/calender-B0ajLPNO.png`,_e=`/assets/moodGeneral-Cv3bFhve.png`,ve=`/assets/medsAdd-tYA2Nayh.png`;const ye={id:`projects`};var be=l({__name:`ProjectList`,setup(e){let t=_([{id:1,title:`Vueddit (Reddit App)`,year:`2020 May`,full:!0,description:`<p>A Reddit client for Android built with NativeScript-Vue</p>
                <ul>
                  <li>Shows your subscribed subreddits</li>
                  <li>In app GIF Playback</li>
                  <li>Open URLs in <a href="https://github.com/saschpe/android-customtabs">Chrome custom tabs</a> inside the app</li>
                  <li>Parse markdown with <a href="https://github.com/noties/Markwon">Markwon</a></li>
                </ul>`,screenshots:[{class:[`vueddit-screenshot`],url:se},{class:[`vueddit-screenshot`],url:ce}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/Vueddit/tree/nativescript`},{text:`Play Store`,url:`https://play.google.com/store/apps/details?id=de.max.roehrl.vueddit.play`}]},{id:28,title:`CyanogenMod Themes`,year:`2015 September`,full:!0,description:`<p>Themes for CyanogenMod 12.x and 13 available on Google Play</p>
                <ul>
                  <li>Support for Android Lollipop and Marshmallow</li>
                  <li>Vector graphics</li>
                  <li>Shared Android resource elements</li>
                  <li>Deployment of slightly different versions</li>
                </ul>`,screenshots:[{caption:`Rho`,class:[`theme-screenshot`],url:te,thumb:q},{caption:`Phi`,class:[`theme-screenshot`],url:K,thumb:J},{caption:`Aurora`,class:[`theme-screenshot`],url:G,thumb:Y}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/CM12Theme/tree/aurora`},{text:`Play Store`,url:`https://play.google.com/store/apps/dev?id=6192927592640738536`}]},{id:30,title:`Lante`,year:`2017 November`,full:!0,description:`<p>A Local Area Network Text Editor for Windows, Linux and OSX where people can work together.</p>
                <p>One user hosts a document protected with a password and others can connect if they know the password.</p>
                <ul>
                  <li>Written in Java 8</li>
                  <li>Uses Swing for the UI</li>
                  <li>Unit test with <a target="_blank" href="https://junit.org/junit5/">JUnit5</a></li>
                  <li>Uses <a target="_blank" href="https://github.com/bobbylight/RSyntaxTextArea">RSyntaxTestArea</a></li>
                  <li>Uses <a target="_blank" href="https://github.com/FasterXML/jackson">Jackson</a></li>
                  <li>Encrypted socket communication</li>
                  <li>Custom file format which stores inline comments and the document history</li>
                  <li>Custom keyboard shortcuts</li>
                  <li>English and German translations with English spellchecker</li>
                </ul>`,screenshots:[{caption:`Dark theme`,class:[`lante-screenshot`],url:Z},{caption:`Light theme`,class:[`lante-screenshot`],url:X},{caption:`Chat`,class:[`lante-screenshot`],url:Q},{caption:`History`,class:[`lante-screenshot`],url:ne}],links:[{text:`Download`,img:`download`,url:`https://drive.google.com/file/d/1tghPESPn-aNBJlivI5z8g8BZkuB2V9VA/view?usp=sharing`}]},{id:40,title:`Transformer Toolkit`,year:`2014 April`,full:!1,description:`<p>A toolkit written for the Asus Transformer Pad TF300T, TF700T, ME301T and the Google Nexus 5 (CAF)</p>
                <ul>
                  <li>Written in C# with the .NET Framework</li>
                  <li>Uses WPF for the UI</li>
                  <li>Communication with Android devices trough <a target="_blank" href="https://developer.android.com/studio/command-line/adb.html">ADB</a></li>
                  <li>Download device specific recovery images from Google Drive</li>
                  <li>Automatic update trough Google Drive</li>
                </ul>`,screenshots:[{class:[`big-screenshot`],url:z}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/Transformer-Toolkit`},{text:`XDA Developers Thread`,url:`https://forum.xda-developers.com/t/tool-tf300t-tf700t-me301t-n5-transformer-toolkit-v4-1-1.2094746/`}]},{id:32,title:`Soundboard`,year:`2015 December`,full:!1,description:`<p>Android app playing sound files from storage</p>
                <ul>
                  <li>Written in Java</li>
                  <li>Add sounds as favorites</li>
                  <li>Dynamically adds tabs and cards for sounds</li>
                  <li>Uses <a target="_blank" href="https://developer.android.com/jetpack/androidx/">AndroidX library</a></li>
                  <li>Uses <a target="_blank" href="https://github.com/wnafee/vector-compat">vector compat library</a></li>
                </ul>`,screenshots:[{url:B}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/Soundboard`},{text:`Download`,img:`download`,url:`https://github.com/maxroehrl/Soundboard/releases`}]},{id:25,title:`Vibrance Utility`,year:`2017 May`,full:!1,description:`<p>A Win32 application to change the digital vibrance of AMD and Nvidia graphic cards.</p>
                <ul>
                  <li>Written in C++</li>
                  <li>Uses <a target="_blank" href="https://github.com/GPUOpen-LibrariesAndSDKs/display-library">AMD Display Library</a></li>
                  <li>Uses <a target="_blank" href="https://docs.nvidia.com/gameworks/content/gameworkslibrary/coresdk/nvapi/index.html">Nvidia NvAPI</a></li>
                </ul>`,screenshots:[{url:V}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/VibranceUtility`},{text:`Download`,img:`download`,url:`https://github.com/maxroehrl/VibranceUtility/releases`}]},{id:50,title:`Dolphin Updater`,year:`2016 October`,full:!1,description:`<p>A script which updates your Dolphin Emulator installation</p>
                <ul>
                  <li>Written in Python</li>
                  <li>Beautiful Soup library for parsing HTML</li>
                  <li>Colorama library for console output formatting</li>
                  <li>Fetches available versions from the official Dolphin website and Dropbox</li>
                </ul>
                <p style="color: #ff5722">Dolphin has now its own update functionality which makes this tool useless!</p>
                <br>
                <p><code>python Dolphin.py [-p path_to_dolphin_exe]</code></p>
                <br>
                <p><code>Dolphin-Updater.exe [-p path_to_dolphin_exe]</code></p>`,screenshots:[{class:[`big-screenshot`],url:H}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/DolphinUpdater`},{text:`Download`,img:`download`,url:`https://github.com/maxroehrl/DolphinUpdater/releases`}]},{id:60,title:`Abalone`,year:`2017 March`,full:!1,description:`<p>A Java abalone board game where the player can play against the AI.</p>
                <ul>
                  <li>Written in Java</li>
                  <li>Uses Swing for the GUI</li>
                </ul>`,screenshots:[{class:[`big-screenshot`],url:U}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/Abalone`},{text:`Download`,img:`download`,url:`https://github.com/maxroehrl/Abalone/releases`}]},{id:130,title:`TCP Chat`,year:`2017 August`,full:!1,description:`<p>A chat program to communicate with other instances of the program.</p>
                <ul>
                  <li>Written in Java</li>
                  <li>Uses Swing for the GUI</li>
                  <li>Uses TCP sockets to communicate with other instances</li>
                  <li>Multiple clients can join a server</li>
                  <li>A password can be set to protect the server</li>
                </ul>`,screenshots:[{url:W}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/TCPChat`},{text:`Download`,img:`download`,url:`https://github.com/maxroehrl/TCPChat/releases`}]},{id:80,title:`DirDiff`,year:`2017 August`,full:!1,description:`<p>Save checksums of all files in the source directory to the SFV file.</p>
                <p>Compare an SFV file with the source directory to see the changed files.</p>
                <p>Copy the changed files in the source directory to the target directory.</p>
                <p><code>python DirDiff.py source sfv_path -t target</code></p>`,screenshots:[],links:[{text:`GH Gist`,img:`github`,url:`https://gist.github.com/maxroehrl/7e7dba05058b66e286adad7edcb257db`}]},{id:90,title:`DiffCopy`,year:`2017 April`,full:!1,description:`<p>A python script for syncing source and backup directory (e.g. generate a backup of your music files)</p>
                <p><code>python DiffCopy.py source backup</code></p>`,screenshots:[],links:[{text:`GH Gist`,img:`github`,url:`https://gist.github.com/maxroehrl/f3c0c255118ff891e1336e6347d4c103`}]},{id:21,title:`Surface Mesh Simplification`,year:`2018 October`,full:!1,description:`<p>Reduces the number of vertices, faces, and edges of a 3D mesh</p>
                <ul>
                  <li>Written in C++</li>
                  <li>Acts as a plugin of the <a target="_blank" href="https://www.cgal.org/">CGAL</a> Polyhedron3 Demo</li>
                  <li>Uses <a target="_blank" href="https://www.qt.io/design">Qt UI</a> for the user interface</li>
                  <li>Color difference can be used as a simplification constraint</li>
                  <li>Different simplification options can be selected</li>
                </ul>`,screenshots:[{url:ie}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/Surface_mesh_simplification`}]},{id:19,title:`Random data generation`,year:`2017 May`,full:!1,description:`<p>Generates random points in 2D and 3D</p>
                <ul>
                  <li>Visualization with the <a target="_blank" href="https://d3js.org/">D3.js</a> library</li>
                  <li>Variable spread, number of points and range</li>
                  <li>Used for generating demo data</li>
                </ul>`,screenshots:[{url:re,class:[`big-screenshot`]}],links:[{text:`2D Demo`,url:`https://jsfiddle.net/xqsyj5tm/138/`},{text:`3D Demo`,url:`https://jsfiddle.net/gv6uydqe/93/`}]},{id:3,title:`This website`,year:`2017 April`,full:!1,description:`<ul>
                  <li>Hosted on <a target="_blank" href="https://pages.github.com/">Github Pages</a></li>
                  <li>Bundled with <a target="_blank" href="https://webpack.js.org/">Webpack</a></li>
                  <li>Modularization with <a target="_blank" href="https://vuejs.org/">Vue</a> Components</li>
                  <li>ES6 transpiling with <a target="_blank" href="https://babeljs.io/">Babel</a></li>
                  <li>Code formatting with <a target="_blank" href="https://eslint.org/">ESLint</a></li>
                  <li>CSS <a target="_blank" href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">flex box</a></li>
                  <li>CSS media queries for responsive design</li>
                  <li>SVG inlining and animations</li>
                </ul>`,screenshots:[],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/maxroehrl.github.io`}]},{id:17,title:`Nvidia Framebuffer Capture Support for Prismatik`,year:`2019 April`,full:!1,description:`<p>Prismatik is the PC software which is part of Lightpack and can control LED strips.</p>
                <ul>
                  <li>Hardware accelerated framebuffer capturing with Nvidia graphic cards</li>
                  <li>Uses the <a target="_blank" href="https://developer.nvidia.com/capture-sdk">Nvidia Capture SDK</a></li>
                  <li>Downscaling support for a smaller CPU impact</li>
                  <li>Selectable from the GUI</li>
                  <li>Prismatik uses <a target="_blank" href="https://www.qt.io/ui-framework">Qt UI</a> and is written in C++</li>
                </ul>
                <p style="color: #ff5722">PR was closed because of licensing issues!</p>`,screenshots:[{url:ae}],links:[{text:`Pull request`,img:`github`,url:`https://github.com/psieg/Lightpack/pull/258`},{text:`Issue`,img:`github`,url:`https://github.com/psieg/Lightpack/issues/235`},{text:`Download`,img:`download`,url:`https://www.mediafire.com/file/pg3onf3mot4999v/Prismatik_%2528unofficial%2529_64bit_Setup_5.11.2.27.exe.zip/file`}]},{id:15,title:`Raspberry Pi Photobox`,year:`2019 September`,full:!1,description:`<p>A photobox for the Raspberry Pi which also has the Pi (HQ) Camera, a (touch) display and three GPIO buttons.</p>
                <ul>
                  <li>Uses <a target="_blank" href="https://picamera.readthedocs.io/en/latest/api_camera.html">picamera</a> library for its user interface</li>
                  <li>Can capture single image, 3 second burst shot as GIF and 4 images combined on a card</li>
                  <li>Touch and GPIO button support</li>
                  <li>User can select different filters (bw, sepia, cartoon, ...)</li>
                  <li>Canon Selphy photo printer support</li>
                  <li>Script can be configured via config file</li>
                  <li>Pictures get saved to USB stick</li>
                </ul>
                <code>sudo -E python3 photobooth.py</code>`,screenshots:[{url:oe}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/Photobooth`},{text:`Website`,url:`https://k-und-r-fotobox.de`}]},{id:14,title:`Particle Simulation`,year:`2020 March`,full:!1,description:`<p>This web app simulates particles which can be used to model a pandemic.</p>
                <ul>
                  <li>Update the velocities of the two colliding particles based on <a target="_blank" href="https://en.wikipedia.org/wiki/Elastic_collision">elastic collision</a> with angle-free representation in 2D</li>
                  <li>Uses a Vue component which contains a canvas to draw the simulation</li>
                  <li>Multiple parameters and probabilities can be changed</li>
                </ul>`,screenshots:[],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/maxroehrl.github.io/blob/master/src/components/ParticleCanvas.vue`},{text:`Demo`,url:`/particles`}]},{id:22,title:`Aurora CyanogenMod 11 Theme`,year:`2014 July`,full:!1,description:`<p>A theme for CyanogenMod 11 available on Google Play which was the base for the CM12 Themes.</p>`,screenshots:[{url:le}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/CM11Theme`},{text:`Play Store`,url:`https://play.google.com/store/apps/details?id=com.max.theme.aurora`}]},{id:23,title:`Vueddit 2 (Reddit App)`,year:`2020 November`,full:!0,description:`<p>A native Android app based on the design of Vueddit.</p>
                <ul>
                  <li>Written in <a href="https://developer.android.com/kotlin/">Kotlin</a></li>
                  <li>Uses <a href="https://developer.android.com/jetpack/androidx/releases/navigation">AndroidX navigation</a> for navigation in subreddit and comments</li>
                  <li>Uses <a href="https://developer.android.com/training/volley/">Volley</a> for network requests</li>
                  <li>Uses <a href="https://exoplayer.dev/">Exoplayer</a> for showing GIFs and videos based on the DASH protocol</li>
                  <li>Uses <a href="https://noties.io/Markwon/">Markwon</a> for displaying markdown</li>
                  <li>Uses Chrome custom tabs to show web pages</li>
                  <li>View Model ViewModel Architecture with livecycle awareness</li>
                  <li>Restores state of view models when app was killed</li>
                  <li>Dynamic web preview of Twitter and YouTube links</li>
                  <li>Dynamic highlight color from the system under Android 12</li>
                  <li>Material You design</li>
                  <li>Uses <a href="https://coil-kt.github.io/coil/">Coil</a> for displaying images</li>
                  <li>Uses the coroutine based <a href="https://developer.android.com/jetpack/androidx/releases/datastore">AndroidX data store</a> for saving user preferences</li>
                  <li>Automatic builds trough GitHub CI</li>
                </ul>`,screenshots:[{class:[`vueddit-screenshot`],url:$},{class:[`vueddit-screenshot`],url:me}],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/Vueddit`}]},{id:24,title:`Patent Data Deep Learning Project`,year:`2020 January`,full:!1,description:`<p>Analyses patent data to get the correct CPC group.</p>
                <ul>
                  <li>Uses keras with tensorflow</li>
                  <li>Also uses Google Bert as a NLP model</li>
                  <li>Can be run in Google Colab</li>
                </ul>`,screenshots:[],links:[{text:`GH Gist`,img:`github`,url:`https://gist.github.com/maxroehrl/096dfc0ebb111f36d5e07d877d60738e`}]},{id:26,title:`Hive Project`,year:`2020 November`,full:!1,description:`<p>Evaluate simple SQL queries on JSON data.</p>
                <ul>
                  <li>Written in Python3</li>
                  <li>Transforms SQL into optimized relational algebra (rule based optimization)</li>
                  <li>Converts relational algebra into Map-Reduce jobs in <a href="https://github.com/spotify/luigi">luigi</a></li>
                  <li>Performs chain folding of Map-Reduce jobs to reduce intermediary writes</li>
                  <li>Can be run in a Hadoop cluster on Big Data</li>
                  <li>Automated unit tests trough GitHub CI</li>
                </ul>`,screenshots:[],links:[{text:`Github`,img:`github`,url:`https://github.com/maxroehrl/miniHive`}]},{id:27,title:`RemICS JB custom ROM`,year:`2013 January`,full:!0,description:`<p>A custom ROM for the Samsung Galaxy S+ (GT-i9001).</p>
                <ul>
                  <li>Based on CyanogenMod 10 ROM</li>
                  <li>Themed based on the Galaxy S4 Touchwiz design</li>
                  <li>~43.000 combined downloads on Mediafire</li>
                </ul>`,screenshots:[{caption:`Settings`,class:[`vueddit-screenshot`],url:ue},{caption:`Homescreen`,class:[`vueddit-screenshot`],url:de},{caption:`Lockscreen`,class:[`vueddit-screenshot`],url:fe},{caption:`Status Bar`,class:[`vueddit-screenshot`],url:pe}],links:[{text:`XDA Developers Thread`,url:`https://forum.xda-developers.com/t/rom-jb-4-1-2-remics-jb-v4-2-s4-look-and-feel-official.2087631/`}]},{id:29,title:`CPU Monitor`,year:`2014 June`,full:!1,description:`<p>A .NET application which sends the CPU utilization over UART to an Arduino</p>`,screenshots:[],links:[{text:`Github`,url:`https://github.com/maxroehrl/CPU-Monitor`,img:`github`},{text:`Arduino Sketch`,url:`https://github.com/maxroehrl/CPU-Monitor-Sketch`,img:`github`}]},{id:33,title:`Matesy (Mood & Medicament Tracker)`,year:`2022 January`,full:!0,description:`<p>Matesy aims at supporting persons who suffer from bipolar disorder,
                   as well as connecting them to companions that help them battle their illness.
                   With features like mood and activity diaries, medication intake and many more,
                   they can track their symptoms and are reminded of necessary daily actions.</p>
                <ul>
                  <li><a href="https://flutter.dev/">Flutter</a> App, NodeJS <a href="https://expressjs.com/">Express</a> Server, <a href="https://www.postgresql.org/">PostgreSQL</a> Database</li>
                  <li>User authentication system based on email and password</li>
                  <li>User data synchronisation in real time</li>
                  <li>Adding companions via QR code scanning</li>
                  <li>Research data sharing to second database after user consent</li>
                  <li>Sync via <a href="https://firebase.google.com/docs/cloud-messaging/">Firebase Cloud Messaging</a></li>
                  <li><a href="https://sequelize.org/">Sequelize</a> ORM on serverside for handling SQL queries</li>
                  <li><a href="https://drift.simonbinder.eu/">Drift</a> for a client-side SQLite database with auto updating streams</li>
                </ul>`,screenshots:[{caption:`Home`,class:[`vueddit-screenshot`],url:he},{caption:`Calender`,class:[`vueddit-screenshot`],url:ge},{caption:`Meds`,class:[`vueddit-screenshot`],url:ve},{caption:`Moods`,class:[`vueddit-screenshot`],url:_e}],links:[{text:`App`,url:`https://github.com/maxroehrl/App_Matesy`,img:`github`},{text:`Server`,url:`https://github.com/maxroehrl/MatesyAuthServer`,img:`github`}]}].sort((e,t)=>t.year.localeCompare(e.year,`en`,{sensitivity:`base`})));return(e,n)=>(u(),a(`section`,ye,[n[0]||=f(`h1`,null,`Projects`,-1),f(`ul`,null,[(u(!0),a(p,null,c(t.value,e=>(u(),m(R,{key:e.id,project:e},null,8,[`project`]))),128))])]))}}),xe=t(be,[[`__scopeId`,`data-v-7b047d8d`]]);export{xe as default};