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
import Photobox from '../assets/photobox.jpg';
import Vueddit1 from '../assets/vueddit1.png';
import Vueddit2 from '../assets/vueddit2.png';
import AuroraCm11 from '../assets/aurora_cm11.jpg';
import RemicsJB from '../assets/remics_jb.png';
import RemicsJB2 from '../assets/remics_jb2.png';
import RemicsJB3 from '../assets/remics_jb3.png';
import RemicsJB4 from '../assets/remics_jb4.png';
import Vueddit21 from '../assets/vueddit2_1.png';
import Vueddit22 from '../assets/vueddit2_2.png';

export default {
  name: 'ProjectList',
  components: {
    Project,
  },
  data() {
    return {
      projects: [{
        id: 1,
        title: 'Vueddit (Reddit App)',
        year: '2020 May',
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
        year: '2015 September',
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
        year: '2017 November',
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
        year: '2014 April',
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
          url: 'https://forum.xda-developers.com/t/tool-tf300t-tf700t-me301t-n5-transformer-toolkit-v4-1-1.2094746/',
        }],
      }, {
        id: 32,
        title: 'Soundboard',
        year: '2015 December',
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
        year: '2017 May',
        full: false,
        description: `<p>A Win32 application to change the digital vibrance of AMD and Nvidia graphic cards.</p>
                          <ul>
                            <li>Written in C++</li>
                            <li>Uses <a target="_blank" href="https://github.com/GPUOpen-LibrariesAndSDKs/display-library">AMD Display Library</a></li>
                            <li>Uses <a target="_blank" href="https://docs.nvidia.com/gameworks/content/gameworkslibrary/coresdk/nvapi/index.html">Nvidia NvAPI</a></li>
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
        year: '2016 October',
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
        year: '2017 March',
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
        year: '2017 August',
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
        year: '2017 August',
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
        year: '2017 April',
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
        year: '2018 October',
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
        year: '2017 May',
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
        year: '2017 April',
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
        year: '2019 April',
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
          url: 'https://www.mediafire.com/file/pg3onf3mot4999v/Prismatik_%2528unofficial%2529_64bit_Setup_5.11.2.27.exe.zip/file',
        }],
      }, {
        id: 15,
        title: 'Raspberry Pi Photobox',
        year: '2019 September',
        full: false,
        description: `<p>A photobox for the Raspberry Pi which also has the Pi (HQ) Camera, a (touch) display and three GPIO buttons.</p>
                      <ul>
                        <li>Uses <a target="_blank" href="https://picamera.readthedocs.io/en/latest/api_camera.html">picamera</a> library for its user interface</li>
                        <li>Can capture single image, 3 second burst shot as GIF and 4 images combined on a card</li>
                        <li>Touch and GPIO button support</li>
                        <li>User can select different filters (bw, sepia, cartoon, ...)</li>
                        <li>Canon Selphy photo printer support</li>
                        <li>Script can be configured via config file</li>
                        <li>Pictures get saved to USB stick</li>
                      </ul>
                      <code>sudo -E python3 photobooth.py</code>`,
        screenshots: [{
          url: Photobox,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/Photobooth',
        }, {
          text: 'Website',
          url: 'https://k-und-r-fotobox.de',
        }],
      }, {
        id: 14,
        title: 'Particle Simulation',
        year: '2020 March',
        full: false,
        description: `<p>This web app simulates particles which can be used to model a pandemic.</p>
                      <ul>
                        <li>Update the velocities of the two colliding particles based on <a target="_blank" href="https://en.wikipedia.org/wiki/Elastic_collision">elastic collision</a> with angle-free representation in 2D</li>
                        <li>Uses a Vue component which contains a canvas to draw the simulation</li>
                        <li>Multiple parameters and probabilities can be changed</li>
                      </ul>`,
        screenshots: [],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/maxroehrl.github.io/blob/master/src/components/ParticleCanvas.vue',
        }, {
          text: 'Demo',
          url: '/particles',
        }],
      }, {
        id: 22,
        title: 'Aurora CyanogenMod 11 Theme',
        year: '2014 July',
        full: false,
        description: `<p>A theme for CyanogenMod 11 available on Google Play which was the base for the CM12 Themes.</p>`,
        screenshots: [{
          url: AuroraCm11,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/CM11Theme',
        }, {
          text: 'Play Store',
          url: 'https://play.google.com/store/apps/details?id=com.max.theme.aurora',
        }],
      }, {
        id: 23,
        title: 'Vueddit 2 (Reddit App)',
        year: '2020 November',
        full: true,
        description: `<p>A native Android app based on the design of Vueddit.</p>
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
                        <li>Uses <a href="https://frescolib.org/">Fresco</a> for displaying images</li>
                        <li>Uses the coroutine based <a href="https://developer.android.com/jetpack/androidx/releases/datastore">AndroidX data store</a> for saving user preferences</li>
                        <li>Automatic builds trough GitHub CI</li>
                      </ul>`,
        screenshots: [{
          class: ['vueddit-screenshot'],
          url: Vueddit21,
        }, {
          class: ['vueddit-screenshot'],
          url: Vueddit22,
        }],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/Vueddit/tree/native',
        }],
      }, {
        id: 24,
        title: 'Patent Data Deep Learning Project',
        year: '2020 January',
        full: false,
        description: `<p>Analyses patent data to get the correct CPC group.</p>
                      <ul>
                        <li>Uses keras with tensorflow</li>
                        <li>Also uses Google Bert as a NLP model</li>
                        <li>Can be run in Google Colab</li>
                      </ul>`,
        screenshots: [],
        links: [{
          text: 'GH Gist',
          img: Github,
          url: 'https://gist.github.com/maxroehrl/096dfc0ebb111f36d5e07d877d60738e',
        }],
      }, {
        id: 26,
        title: 'Hive Project',
        year: '2020 November',
        full: false,
        description: `<p>Evaluate simple SQL queries on JSON data.</p>
                      <ul>
                        <li>Written in Python3</li>
                        <li>Transforms SQL into optimized relational algebra (rule based optimization)</li>
                        <li>Converts relational algebra into Map-Reduce jobs in <a href="https://github.com/spotify/luigi">luigi</a></li>
                        <li>Performs chain folding of Map-Reduce jobs to reduce intermediary writes</li>
                        <li>Can be run in a Hadoop cluster on Big Data</li>
                        <li>Automated unit tests trough GitHub CI</li>
                      </ul>`,
        screenshots: [],
        links: [{
          text: 'Github',
          img: Github,
          url: 'https://github.com/maxroehrl/miniHive',
        }],
      }, {
        id: 27,
        title: 'RemICS JB custom ROM',
        year: '2013 January',
        full: true,
        description: `<p>A custom ROM for the Samsung Galaxy S+ (GT-i9001).</p>
                      <ul>
                        <li>Based on CyanogenMod 10 ROM</li>
                        <li>Themed based on the Galaxy S4 Touchwiz design</li>
                        <li>~43.000 combined downloads on Mediafire</li>
                      </ul>`,
        screenshots: [{
          caption: 'Settings',
          class: ['vueddit-screenshot'],
          url: RemicsJB,
        }, {
          caption: 'Homescreen',
          class: ['vueddit-screenshot'],
          url: RemicsJB2,
        }, {
          caption: 'Lockscreen',
          class: ['vueddit-screenshot'],
          url: RemicsJB3,
        }, {
          caption: 'Status Bar',
          class: ['vueddit-screenshot'],
          url: RemicsJB4,
        }],
        links: [{
          text: 'XDA Developers Thread',
          url: 'https://forum.xda-developers.com/t/rom-jb-4-1-2-remics-jb-v4-2-s4-look-and-feel-official.2087631/',
        }],
      }, {
        id: 29,
        title: 'CPU Monitor',
        year: '2014 June',
        full: false,
        description: `<p>A .NET application which sends the CPU utilization over UART to an Arduino</p>`,
        screenshots: [],
        links: [{
          text: 'Github',
          url: 'https://github.com/maxroehrl/CPU-Monitor',
          img: Github,
        }, {
          text: 'Arduino Sketch',
          url: 'https://github.com/maxroehrl/CPU-Monitor-Sketch',
          img: Github,
        }],
      }].sort((a, b) => b.year.localeCompare(a.year, 'en', {sensitivity: 'base'})),
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
