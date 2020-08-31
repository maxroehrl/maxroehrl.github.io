<template>
  <section id="projects">
    <h1>Projects</h1>
    <ul>
      <project v-for="project in projects"
               :key="project.id"
               :project="project" />
    </ul>
  </section>
</template>

<script>
import Project from './Project';
import Github from '../assets/github.svg';
import Download from '../assets/download.svg';
import TransformerToolkit from '../assets/transformer_toolkit_screenshot.png';
import Soundboard from '../assets/soundboard_screenshot.png';
import VibranceUtility from '../assets/vibrance_utility.png';
import DolphinUpdater from '../assets/dolphin_updater_screenshot.png';
import Abalone from '../assets/abalone.png';
import TCPChat from '../assets/tcp_chat.png';
import AuroraScreenshot from '../assets/aurora_screenshot.png';
import PhiScreenshot from '../assets/phi_screenshot.png';
import RhoScreenshot from '../assets/rho_screenshot.png';
import Rho from '../assets/rho.png';
import Phi from '../assets/phi.png';
import Aurora from '../assets/aurora.png';
import LanteLight from '../assets/lante_light_screenshot.png';
import LanteDark from '../assets/lante_dark_screenshot.png';
import LanteChat from '../assets/lante_chat_screenshot.png';
import LanteHistory from '../assets/lante_history_screenshot.png';
import D3 from '../assets/d3.png';
import Simplification from '../assets/simplification.jpg';
import Prismatik from '../assets/prismatik.png';
import Vueddit1 from '../assets/vueddit1.png';
import Vueddit2 from '../assets/vueddit2.png';

export default {
  name: 'ProjectList',
  components: {
    Project,
  },
  data() {
    return {
      projects: [{
        id: 1,
        title: 'Vueddit',
        full: true,
        description: `<p>A Reddit client for Android built with NativeScript-Vue</p>
                        <ul>
                          <li>Shows your subscribed subreddits</li>
                          <li>In app GIF Playback</li>
                          <li>Open URLs in <a href="https://github.com/saschpe/android-customtabs">Chrome custom tabs</a> inside the app</li>
                          <li>Parse markdown with <a href="https://github.com/noties/Markwon">Markwon</a></li>
                        </ul>`,
        screenshots: [{
          class: ['vueddit-screenshot'],
          url: Vueddit1,
        }, {
          class: ['vueddit-screenshot'],
          url: Vueddit2,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/Vueddit',
        }, {
          text: 'Play Store',
          url: 'https://play.google.com/store/apps/details?id=de.max.roehrl.vueddit.play',
        },
        ],
      }, {
        id: 28,
        title: 'CyanogenMod Themes',
        full: true,
        description: `<p>Themes for CyanogenMod 12.x and 13 available on Google Play</p>
                        <ul>
                          <li>Support for Android Lollipop and Marshmallow</li>
                          <li>Vector graphics</li>
                          <li>Shared Android resource elements</li>
                          <li>Deployment of slightly different versions</li>
                        </ul>`,
        screenshots: [{
          caption: 'Rho',
          class: ['theme-screenshot'],
          url: RhoScreenshot,
          thumb: Rho,
        }, {
          caption: 'Phi',
          class: ['theme-screenshot'],
          url: PhiScreenshot,
          thumb: Phi,
        }, {
          caption: 'Aurora',
          class: ['theme-screenshot'],
          url: AuroraScreenshot,
          thumb: Aurora,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/CM12Theme/tree/aurora',
        }, {
          text: 'Play Store',
          url: 'https://play.google.com/store/apps/dev?id=6192927592640738536',
        },
        ],
      }, {
        id: 30,
        title: 'Lante',
        full: true,
        description: `<p>A Local Area Network Text Editor for Windows, Linux and OSX where people can work together.</p>
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
                        </ul>`,
        screenshots: [{
          caption: 'Dark theme',
          class: ['lante-screenshot'],
          url: LanteDark,
        }, {
          caption: 'Light theme',
          class: ['lante-screenshot'],
          url: LanteLight,
        }, {
          caption: 'Chat',
          class: ['lante-screenshot'],
          url: LanteChat,
        }, {
          caption: 'History',
          class: ['lante-screenshot'],
          url: LanteHistory,
        }],
        links: [{
          text: 'Download',
          img: Download,
          url: 'https://drive.google.com/file/d/1tghPESPn-aNBJlivI5z8g8BZkuB2V9VA/view?usp=sharing',
        }],
      }, {
        id: 40,
        title: 'Transformer Toolkit',
        full: false,
        description: `<p>A toolkit written for the Asus Transformer Pad TF300T, TF700T, ME301T and the Google Nexus 5 (CAF)</p>
                        <ul>
                          <li>Written in C# with the .NET Framework</li>
                          <li>Uses WPF for the UI</li>
                          <li>Communication with Android devices trough <a target="_blank" href="https://developer.android.com/studio/command-line/adb.html">ADB</a></li>
                          <li>Download device specific recovery images from Google Drive</li>
                          <li>Automatic update trough Google Drive</li>
                        </ul>`,
        screenshots: [{
          class: ['big-screenshot'],
          url: TransformerToolkit,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/Transformer-Toolkit',
        }, {
          text: 'XDA Developers Thread',
          url: 'http://forum.xda-developers.com/showthread.php?t=2094746',
        }],
      }, {
        id: 32,
        title: 'Soundboard',
        full: false,
        description: `<p>Android app playing sound files from storage</p>
                        <ul>
                          <li>Written in Java</li>
                          <li>Add sounds as favorites</li>
                          <li>Dynamically adds tabs and cards for sounds</li>
                          <li>Uses <a target="_blank" href="https://developer.android.com/jetpack/androidx/">AndroidX library</a></li>
                          <li>Uses <a target="_blank" href="https://github.com/wnafee/vector-compat">vector compat library</a></li>
                        </ul>`,
        screenshots: [{
          url: Soundboard,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/Soundboard',
        }, {
          text: 'Download',
          img: Download,
          url: 'https://github.com/maxroehrl/Soundboard/releases',
        }],
      }, {
        id: 25,
        title: 'Vibrance Utility',
        full: false,
        description: `<p>A Win32 application to change the digital vibrance of AMD and Nvidia graphic cards.</p>
                          <ul>
                            <li>Written in C++</li>
                            <li>Uses <a target="_blank" href="https://github.com/GPUOpen-LibrariesAndSDKs/display-library">AMD Display Library</a></li>
                            <li>Uses <a target="_blank" href="http://docs.nvidia.com/gameworks/content/gameworkslibrary/coresdk/nvapi/index.html">Nvidia NvAPI</a></li>
                          </ul>`,
        screenshots: [{
          url: VibranceUtility,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/VibranceUtility',
        }, {
          text: 'Download',
          img: Download,
          url: 'https://github.com/maxroehrl/VibranceUtility/releases',
        }],
      }, {
        id: 50,
        title: 'Dolphin Updater',
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
          class: ['big-screenshot'],
          url: DolphinUpdater,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/DolphinUpdater',
        }, {
          text: 'Download',
          img: Download,
          url: 'https://github.com/maxroehrl/DolphinUpdater/releases',
        }],
      }, {
        id: 60,
        title: 'Abalone',
        full: false,
        description: `<p>A Java abalone board game where the player can play against the AI.</p>
                        <ul>
                          <li>Written in Java</li>
                          <li>Uses Swing for the GUI</li>
                        </ul>`,
        screenshots: [{
          class: ['big-screenshot'],
          url: Abalone,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/Abalone',
        }, {
          text: 'Download',
          img: Download,
          url: 'https://github.com/maxroehrl/Abalone/releases',
        }],
      }, {
        id: 130,
        title: 'TCP Chat',
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
          url: TCPChat,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/TCPChat',
        }, {
          text: 'Download',
          img: Download,
          url: 'https://github.com/maxroehrl/TCPChat/releases',
        }],
      }, {
        id: 80,
        title: 'DirDiff',
        full: false,
        description: `<p>Save checksums of all files in the source directory to the SFV file.</p>
                        <p>Compare an SFV file with the source directory to see the changed files.</p>
                        <p>Copy the changed files in the source directory to the target directory.</p>
                        <p><code>python DirDiff.py source sfv_path -t target</code></p>`,
        screenshots: [],
        links: [{
          text: 'GH Gist',
          img: Github,
          url: 'https://gist.github.com/maxroehrl/7e7dba05058b66e286adad7edcb257db',
        }],
      }, {
        id: 90,
        title: 'DiffCopy',
        full: false,
        description: `<p>A python script for syncing source and backup directory (e.g. generate a backup of your music files)</p>
                        <p><code>python DiffCopy.py source backup</code></p>`,
        screenshots: [],
        links: [{
          text: 'GH Gist',
          img: Github,
          url: 'https://gist.github.com/maxroehrl/f3c0c255118ff891e1336e6347d4c103',
        }],
      }, {
        id: 21,
        title: 'Surface Mesh Simplification',
        full: false,
        description: `<p>Reduces the number of vertices, faces, and edges of a 3D mesh</p>
                        <ul>
                          <li>Written in C++</li>
                          <li>Acts as a plugin of the <a target="_blank" href="https://www.cgal.org/">CGAL</a> Polyhedron3 Demo</li>
                          <li>Uses <a target="_blank" href="https://www.qt.io/design">Qt UI</a> for the user interface</li>
                          <li>Color difference can be used as a simplification constraint</li>
                          <li>Different simplification options can be selected</li>
                        </ul>`,
        screenshots: [{
          url: Simplification,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/Surface_mesh_simplification',
        }],
      }, {
        id: 19,
        title: 'Random data generation',
        full: false,
        description: `<p>Generates random points in 2D and 3D</p>
                        <ul>
                          <li>Visualization with the <a target="_blank" href="https://d3js.org/">D3.js</a> library</li>
                          <li>Variable spread, number of points and range</li>
                          <li>Used for generating demo data</li>
                        </ul>`,
        screenshots: [{
          url: D3,
          class: ['big-screenshot'],
        }],
        links: [{
          text: '2D Demo',
          url: 'https://jsfiddle.net/xqsyj5tm/138/',
        }, {
          text: '3D Demo',
          url: 'https://jsfiddle.net/gv6uydqe/93/',
        }],
      }, {
        id: 3,
        title: 'This website',
        full: false,
        description: `<ul>
                          <li>Hosted on <a target="_blank" href="https://pages.github.com/">Github Pages</a></li>
                          <li>Bundled with <a target="_blank" href="https://webpack.js.org/">Webpack</a></li>
                          <li>Modularization with <a target="_blank" href="https://vuejs.org/">Vue</a> Components</li>
                          <li>ES6 transpiling with <a target="_blank" href="https://babeljs.io/">Babel</a></li>
                          <li>Code formatting with <a target="_blank" href="https://eslint.org/">ESLint</a></li>
                          <li>CSS <a target="_blank" href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">flex box</a></li>
                          <li>CSS media queries for responsive design</li>
                          <li>SVG inlining and animations</li>
                        </ul>`,
        screenshots: [],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/maxroehrl.github.io',
        }],
      }, {
        id: 17,
        title: 'Nvidia Framebuffer Capture Support for Prismatik',
        full: false,
        description: `<p>Prismatik is the PC software which is part of Lightpack and can control LED strips.</p>
                      <ul>
                        <li>Hardware accelerated framebuffer capturing with Nvidia graphic cards</li>
                        <li>Uses the <a target="_blank" href="https://developer.nvidia.com/capture-sdk">Nvidia Capture SDK</a></li>
                        <li>Downscaling support for a smaller CPU impact</li>
                        <li>Selectable from the GUI</li>
                        <li>Prismatik uses <a target="_blank" href="https://www.qt.io/ui-framework">Qt UI</a> and is written in C++</li>
                      </ul>
                      <p style="color: #ff5722">PR was closed because of licensing issues!</p>`,
        screenshots: [{
          url: Prismatik,
        }],
        links: [{
          text: 'Pull request',
          img: Github,
          url: 'https://github.com/psieg/Lightpack/pull/258',
        }, {
          text: 'Issue',
          img: Github,
          url: 'https://github.com/psieg/Lightpack/issues/235',
        }, {
          text: 'Download',
          img: Download,
          url: 'https://psieg.de/jenkins/job/Prismatik_Windows/471/',
        }],
      }, {
        id: 15,
        title: 'Raspberry Pi Photobox',
        full: false,
        description: `<p>A photobox for the Raspberry Pi which also has the Pi Camera, a (touch) display and three GPIO buttons.</p>
                      <ul>
                        <li>Uses <a target="_blank" href="https://picamera.readthedocs.io/en/latest/api_camera.html">picamera</a> library for its user interface</li>
                        <li>Can capture single image, 3 second burst shot as GIF and 4 images combined on a card</li>
                        <li>Touch and GPIO button support</li>
                        <li>User can select different filters (bw, sepia, cartoon, ...)</li>
                        <li>Canon Selphy photo printer support</li>
                        <li>Script can be configured via config file</li>
                        <li>Pictures get saved to USB stick</li>
                      </ul>
                      <code>sudo -E python3 Photobooth/photobooth.py</code>`,
        screenshots: [],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/Photobooth',
        }],
      }].sort((a, b) => a.id > b.id ? 1 : -1),
    };
  },
};
</script>

<style scoped lang="scss">
  #projects > ul {
    display: flex;
    flex-wrap: wrap;

    > li {
      flex: 1 0 300px;
    }

    > .full-width {
      flex: 0 1 100%;
    }
  }
</style>
