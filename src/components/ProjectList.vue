<!--suppress ES6UnusedImports -->
<template>
  <section id="projects">
    <h1>Projects</h1>
    <ul>
      <project
        v-for="project in projects"
        :key="project.id"
        :project="project">
      </project>
    </ul>
  </section>
</template>

<script>
  import Project from './Project'
  import Github from '../assets/github.svg'
  import Download from '../assets/download.svg'
  import TransformerToolkit from '../assets/transformer_toolkit_screenshot.png'
  import Soundboard from '../assets/soundboard_screenshot.png'
  import VibranceUtility from '../assets/vibrance_utility.png'
  import DolphinUpdater from '../assets/dolphin_updater_screenshot.png'
  import Abalone from '../assets/abalone.png'
  import TCPChat from '../assets/tcp_chat.png'
  import AuroraScreenshot from '../assets/aurora_screenshot.png'
  import PhiScreenshot from '../assets/phi_screenshot.png'
  import RhoScreenshot from '../assets/rho_screenshot.png'
  import Rho from '../assets/rho.png'
  import Phi from '../assets/phi.png'
  import Aurora from '../assets/aurora.png'
  import LanteLight from '../assets/lante_light_screenshot.png'
  import LanteDark from '../assets/lante_dark_screenshot.png'
  import LanteChat from '../assets/lante_chat_screenshot.png'
  import LanteHistory from '../assets/lante_history_screenshot.png'
  import D3 from '../assets/d3.png'
  import Simplification from '../assets/simplification.jpg'

  export default {
    name: "ProjectList",
    components: {
      Project
    },
    data() {
      return {
        projects: [{
          id: 0,
          title: "CyanogenMod Themes",
          full: true,
          description: `<p>Themes for CyanogenMod 12.x and 13 available on Google Play</p>
                        <ul>
                          <li>Support for Android Lollipop and Marshmallow</li>
                          <li>Vector graphics</li>
                          <li>Shared Android resource elements</li>
                          <li>Deployment of slightly different versions</li>
                        </ul>`,
          screenshots: [{
            caption: "Rho",
            class: ["theme-screenshot"],
            url: "dist/rho_screenshot.png",
            thumb: "dist/rho.png"
          }, {
            caption: "Phi",
            class: ["theme-screenshot"],
            url: "dist/phi_screenshot.png",
            thumb: "dist/phi.png"
          }, {
            caption: "Aurora",
            class: ["theme-screenshot"],
            url: "dist/aurora_screenshot.png",
            thumb: "dist/aurora.png"
          }],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/CM12Theme/tree/aurora",
          }, {
            text: "Play Store",
            url: "https://play.google.com/store/apps/developer?id=Max+R%C3%B6hrl"
          }
          ]
        }, {
          id: 1,
          title: "Lante",
          full: true,
          description: `<p>A Local Area Network Text Editor for Windows, Linux and OSX where people can work together.</p>
                        <p>One user hosts a document protected with a password and others can connect if they know the password.</p>
                        <ul>
                          <li>Written in Java 8</li>
                          <li>Uses Swing for the UI</li>
                          <li>Unit test with <a href="https://junit.org/junit5/">JUnit5</a></li>
                          <li>Uses <a href="https://github.com/bobbylight/RSyntaxTextArea">RSyntaxTestArea</a></li>
                          <li>Uses <a href="https://github.com/FasterXML/jackson">Jackson</a></li>
                          <li>Encrypted socket communication</li>
                          <li>Custom file format which stores inline comments and the document history</li>
                          <li>Custom keyboard shortcuts</li>
                          <li>English and German translations with English spellchecker</li>
                        </ul>`,
          screenshots: [{
            caption: "Dark theme",
            class: ["lante-screenshot"],
            url: "dist/lante_dark_screenshot.png"
          }, {
            caption: "Light theme",
            class: ["lante-screenshot"],
            url: "dist/lante_light_screenshot.png"
          }, {
            caption: "Chat",
            class: ["lante-screenshot"],
            url: "dist/lante_chat_screenshot.png"
          }, {
            caption: "History",
            class: ["lante-screenshot"],
            url: "dist/lante_history_screenshot.png"
          }],
          links: [{
            text: "Download",
            img: "dist/download.svg",
            url: "https://drive.google.com/file/d/1tghPESPn-aNBJlivI5z8g8BZkuB2V9VA/view?usp=sharing"
          }]
        }, {
          id: 2,
          title: "Transformer Toolkit",
          full: false,
          description: `<p>A toolkit written for the Asus Transformer Pad TF300T, TF700T, ME301T and the Google Nexus 5 (CAF)</p>
                        <ul>
                          <li>Written in C# with the .NET Framework</li>
                          <li>Uses WPF for the UI</li>
                          <li>Communication with Android devices trough <a href="https://developer.android.com/studio/command-line/adb.html">ADB</a></li>
                          <li>Download device specific recovery images from Google Drive</li>
                          <li>Automatic update trough Google Drive</li>
                        </ul>`,
          screenshots: [{
            class: ["big-screenshot"],
            url: "dist/transformer_toolkit_screenshot.png"
          }],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/Transformer-Toolkit"
          }, {
            text: "XDA Developers Thread",
            url: "http://forum.xda-developers.com/showthread.php?t=2094746"
          }]
        }, {
          id: 3,
          title: "Soundboard",
          full: false,
          description: `<p>Android app playing sound files from storage</p>
                        <ul>
                          <li>Written in Java</li>
                          <li>Add sounds as favorites</li>
                          <li>Dynamically adds tabs and cards for sounds</li>
                          <li>Uses <a href="https://developer.android.com/topic/libraries/support-library/index.html">Android support library</a></li>
                          <li>Uses <a href="https://github.com/wnafee/vector-compat">vector compat library</a></li>
                        </ul>`,
          screenshots: [{
            url: "dist/soundboard_screenshot.png"
          }],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/Soundboard"
          }, {
            text: "Download",
            img: "dist/download.svg",
            url: "https://github.com/maxroehrl/Soundboard/releases"
          }]
        }, {
          id: 4,
          title: "Vibrance Utility",
          full: false,
          description: `<p>A Win32 application to change the digital vibrance of AMD and Nvidia graphic cards.</p>
                          <ul>
                            <li>Written in C++</li>
                            <li>Uses <a href="http://developer.amd.com/tools-and-sdks/graphics-development/display-library-adl-sdk/">AMD Display Library</a></li>
                            <li>Uses <a href="http://docs.nvidia.com/gameworks/content/gameworkslibrary/coresdk/nvapi/index.html/">Nvidia NvAPI</a></li>
                          </ul>`,
          screenshots: [{
            url: "dist/vibrance_utility.png"
          }],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/VibranceUtility"
          }, {
            text: "Download",
            img: "dist/download.svg",
            url: "https://github.com/maxroehrl/VibranceUtility/releases"
          }]
        }, {
          id: 5,
          title: "Dolphin Updater",
          full: false,
          description: `<p>A script which updates your Dolphin Emulator installation</p>
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
                        <p><code>Dolphin-Updater.exe [-p path_to_dolphin_exe]</code></p>`,
          screenshots: [{
            class: ["big-screenshot"],
            url: "dist/dolphin_updater_screenshot.png"
          }],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/DolphinUpdater"
          }, {
            text: "Download",
            img: "dist/download.svg",
            url: "https://github.com/maxroehrl/DolphinUpdater/releases"
          }]
        }, {
          id: 6,
          title: "Abalone",
          full: false,
          description: `<p>A Java abalone board game where the player can play against the AI.</p>
                        <ul>
                          <li>Written in Java</li>
                          <li>Uses Swing for the GUI</li>
                        </ul>`,
          screenshots: [{
            class: ["big-screenshot"],
            url: "dist/abalone.png"
          }],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/Abalone"
          }, {
            text: "Download",
            img: "dist/download.svg",
            url: "https://github.com/maxroehrl/Abalone/releases"
          }]
        }, {
          id: 7,
          title: "TCP Chat",
          full: false,
          description: `<p>A chat program to communicate with other instances of the program.</p>
                        <ul>
                          <li>Written in Java</li>
                          <li>Uses Swing for the GUI</li>
                          <li>Uses TCP sockets to communicate with other instances</li>
                          <li>Multiple clients can join a server</li>
                          <li>A password can be set to protect the server</li>
                        </ul>`,
          screenshots: [{
            url: "dist/tcp_chat.png"
          }],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/TCPChat"
          }, {
            text: "Download",
            img: "dist/download.svg",
            url: "https://github.com/maxroehrl/TCPChat/releases"
          }]
        }, {
          id: 8,
          title: "DirDiff",
          full: false,
          description: `<p>Save checksums of all files in the source directory to the SFV file.</p>
                        <p>Compare an SFV file with the source directory to see the changed files.</p>
                        <p>Copy the changed files in the source directory to the target directory.</p>
                        <p><code>python DirDiff.py source sfv_path -t target</code></p>`,
          screenshots: [],
          links: [{
            text: "GH Gist",
            img: "dist/github.svg",
            url: "https://gist.github.com/maxroehrl/7e7dba05058b66e286adad7edcb257db"
          }]
        }, {
          id: 9,
          title: "DiffCopy",
          full: false,
          description: `<p>A python script for syncing source and backup directory (e.g. generate a backup of your music files)</p>
                        <p><code>python DiffCopy.py source backup</code></p>`,
          screenshots: [],
          links: [{
            text: "GH Gist",
            img: "dist/github.svg",
            url: "https://gist.github.com/maxroehrl/f3c0c255118ff891e1336e6347d4c103"
          }]
        }, {
          id: 10,
          title: "Surface Mesh Simplification",
          full: false,
          description: `<p>Reduces the number of vertices, faces, and edges of a mesh</p>
                        <ul>
                          <li>Written in C++</li>
                          <li>Acts as a plugin of the <a href="https://www.cgal.org/">CGAL</a> Polyhedron3 Demo</li>
                          <li>Uses <a href="https://www.qt.io/ui-framework">Qt UI</a> for the user interface</li>
                          <li>Color difference can be used as a simplification constraint</li>
                          <li>Different simplification options can be selected</li>
                        </ul>`,
          screenshots: [{
            url: "dist/simplification.jpg"
          }],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/Surface_mesh_simplification"
          }]
        }, {
          id: 11,
          title: "Random data generation",
          full: false,
          description: `<p>Generates random points in 2D and 3D</p>
                        <ul>
                          <li>Visualization with the <a href="https://d3js.org/">D3.js</a> library</li>
                          <li>Variable spread, number of points and range</li>
                          <li>Used for generating demo data</li>
                        </ul>`,
          screenshots: [{
            url: "dist/d3.png",
            class: ["big-screenshot"]
          }],
          links: [{
            text: "2D Demo",
            url: "https://jsfiddle.net/xqsyj5tm/138/"
          }, {
            text: "3D Demo",
            url: "https://jsfiddle.net/gv6uydqe/93/"
          }]
        }, {
          id: 12,
          title: "This website",
          full: false,
          description: `<ul>
                          <li>Hosted on Github Pages</li>
                          <li>Bundled with <a href="https://webpack.js.org/">Webpack</a></li>
                          <li>Modularization with <a href="https://vuejs.org/">Vue</a> Components</li>
                          <li>CSS flex box</li>
                          <li>CSS media queries for responsive design</li>
                          <li>CSS animations</li>
                        </ul>`,
          screenshots: [],
          links: [{
            text: "Github",
            img: "dist/github.svg",
            url: "https://github.com/maxroehrl/maxroehrl.github.io"
          }]
        }]
      }
    }
  }
</script>

<style scoped lang="scss">
  #projects > ul {
    display: flex;
    flex-wrap: wrap;
  }

  #projects > ul > li {
    flex: 1 0 300px;
  }

  #projects > ul > .full-width {
    flex: 0 1 100%;
  }
</style>