import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { homedir, platform } from 'os';
import { join } from 'path';

/**
 * Get the system-installed browser executable path for macOS, Windows, and Linux
 * Supports Chrome, Chromium, Firefox, Edge, and Safari
 */
export async function getSystemBrowserPath(browserName: string): Promise<string> {
  const browser = browserName.toLowerCase();
  const os = platform();

  // Define browser paths per OS
  const browserPathsByOS: { [key: string]: { [key: string]: string[] } } = {
    darwin: {
      // macOS paths
      chromium: [
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        join(homedir(), 'Applications/Chromium.app/Contents/MacOS/Chromium'),
        join(homedir(), 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
      ],
      chrome: [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        join(homedir(), 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
        join(homedir(), 'Applications/Chromium.app/Contents/MacOS/Chromium'),
      ],
      firefox: [
        '/Applications/Firefox.app/Contents/MacOS/firefox',
        join(homedir(), 'Applications/Firefox.app/Contents/MacOS/firefox'),
      ],
      webkit: [
        '/Applications/Safari.app/Contents/MacOS/Safari',
        join(homedir(), 'Applications/Safari.app/Contents/MacOS/Safari'),
      ],
      safari: [
        '/Applications/Safari.app/Contents/MacOS/Safari',
        join(homedir(), 'Applications/Safari.app/Contents/MacOS/Safari'),
      ],
      edge: [
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        join(homedir(), 'Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'),
      ],
    },
    win32: {
      // Windows paths
      chromium: [
        'C:\\Program Files\\Chromium\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Chromium\\Application\\chrome.exe',
        join(homedir(), 'AppData\\Local\\Chromium\\Application\\chrome.exe'),
        join(homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
      ],
      chrome: [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        join(homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
      ],
      firefox: [
        'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
        'C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe',
        join(homedir(), 'AppData\\Local\\Mozilla Firefox\\firefox.exe'),
      ],
      webkit: [
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
      ],
      edge: [
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        join(homedir(), 'AppData\\Local\\Microsoft\\Edge\\Application\\msedge.exe'),
      ],
      safari: [
        'C:\\Program Files\\Apple\\Safari\\Safari.exe',
        'C:\\Program Files (x86)\\Apple\\Safari\\Safari.exe',
      ],
    },
    linux: {
      // Linux paths
      chromium: [
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
        '/snap/bin/chromium',
      ],
      chrome: [
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/snap/bin/chromium',
      ],
      firefox: [
        '/usr/bin/firefox',
        '/snap/bin/firefox',
      ],
      webkit: [
        '/usr/bin/epiphany',
        '/usr/bin/midori',
      ],
      edge: [
        '/usr/bin/microsoft-edge',
        '/usr/bin/microsoft-edge-stable',
        '/snap/bin/microsoft-edge',
      ],
      safari: [],
    },
  };

  // Get potential paths for the requested browser and OS
  const osBrowserPaths = browserPathsByOS[os] || {};
  const potentialPaths = osBrowserPaths[browser] || [];

  // Check which paths exist
  for (const path of potentialPaths) {
    if (existsSync(path)) {
      console.log(`Found ${browser} at: ${path}`);
      return path;
    }
  }

  // If not found in standard locations, try using system commands
  try {
    let command = '';
    if (os === 'win32') {
      // Windows: use 'where' command
      switch (browser) {
        case 'firefox':
          command = 'where firefox || where firefox.exe || (exit /b 1)';
          break;
        case 'chrome':
        case 'chromium':
          command = 'where chrome || where chrome.exe || where google-chrome || (exit /b 1)';
          break;
        case 'edge':
          command = 'where msedge || where msedge.exe || (exit /b 1)';
          break;
        case 'safari':
          command = 'where safari || where safari.exe || (exit /b 1)';
          break;
        default:
          command = `where ${browser} || (exit /b 1)`;
      }
    } else {
      // macOS/Linux: use 'which' command
      switch (browser) {
        case 'firefox':
          command = 'which firefox || which Firefox || true';
          break;
        case 'chrome':
        case 'chromium':
          command = 'which google-chrome || which chromium || which google-chrome-stable || true';
          break;
        case 'edge':
          command = 'which microsoft-edge || which microsoft-edge-stable || true';
          break;
        case 'safari':
          command = 'which safari || true';
          break;
        default:
          command = `which ${browser} || true`;
      }
    }

    const result = execSync(command, { encoding: 'utf-8', shell: os === 'win32' ? 'cmd' : '/bin/sh' }).trim();
    if (result) {
      console.log(`Found ${browser} at: ${result}`);
      return result;
    }
  } catch (error) {
    console.warn(`Could not find ${browser} using system search command`);
  }

  // If still not found, throw an error with helpful information
  const osName = os === 'win32' ? 'Windows' : os === 'darwin' ? 'macOS' : 'Linux';
  throw new Error(
    `Browser "${browser}" not found on your system (${osName}). ` +
    `Please install one of the following browsers:\n` +
    `  - Google Chrome: https://www.google.com/chrome/\n` +
    `  - Chromium: https://www.chromium.org/\n` +
    `  - Firefox: https://www.mozilla.org/firefox/\n` +
    `  - Microsoft Edge: https://www.microsoft.com/edge\n` +
    `  - Safari: Pre-installed on macOS\n` +
    `\nStandard installation paths checked for ${osName}:\n${potentialPaths.map(p => `  - ${p}`).join('\n')}`
  );
}
