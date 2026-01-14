# System Browser Setup Guide

## Overview

This framework has been configured to use desktop-installed browsers instead of Playwright's bundled browsers. This is useful when your organization restricts the installation of npm packages that include browser binaries. Supports **macOS, Windows, and Linux**.

## How It Works

### Modified Files:

1. **src/world/custom-world.ts** - Updated `initBrowser()` to use system browser paths
2. **src/utils/browser-path.util.ts** - New utility to detect system-installed browsers (cross-platform)
3. **playwright.config.ts** - Added `channel` option for browser detection

### Browser Path Detection

The framework automatically detects system-installed browsers from standard OS-specific locations:

#### macOS Paths

**Chrome/Chromium:**

- `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- `/Applications/Chromium.app/Contents/MacOS/Chromium`
- `~/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`

**Firefox:**

- `/Applications/Firefox.app/Contents/MacOS/firefox`
- `~/Applications/Firefox.app/Contents/MacOS/firefox`

**Safari/WebKit:**

- `/Applications/Safari.app/Contents/MacOS/Safari`
- `~/Applications/Safari.app/Contents/MacOS/Safari`

**Edge:**

- `/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge`

#### Windows Paths

**Chrome/Chromium:**

- `C:\Program Files\Google\Chrome\Application\chrome.exe`
- `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`
- `%USERPROFILE%\AppData\Local\Google\Chrome\Application\chrome.exe`

**Firefox:**

- `C:\Program Files\Mozilla Firefox\firefox.exe`
- `C:\Program Files (x86)\Mozilla Firefox\firefox.exe`

**Edge/WebKit:**

- `C:\Program Files\Microsoft\Edge\Application\msedge.exe`
- `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`

#### Linux Paths

**Chrome/Chromium:**

- `/usr/bin/google-chrome`
- `/usr/bin/chromium`
- `/snap/bin/chromium`

**Firefox:**

- `/usr/bin/firefox`
- `/snap/bin/firefox`

**Edge:**

- `/usr/bin/microsoft-edge`
- `/snap/bin/microsoft-edge`

If browsers aren't found in standard locations, the utility will attempt to locate them using OS-specific search commands:

- **Windows:** `where` command
- **macOS/Linux:** `which` command

## Required System Setup

### Install Browsers on macOS:

```bash
# Chrome
brew install --cask google-chrome

# Firefox
brew install --cask firefox

# Safari comes pre-installed on macOS
```

Or download directly:

- Chrome: https://www.google.com/chrome/
- Firefox: https://www.mozilla.org/firefox/
- Safari: Pre-installed on macOS
- Edge: https://www.microsoft.com/edge

### Install Browsers on Windows:

**Using Winget (Windows 10+):**

```bash
# Chrome
winget install Google.Chrome

# Firefox
winget install Mozilla.Firefox

# Edge
winget install Microsoft.Edge
```

**Using Chocolatey:**

```bash
# Chrome
choco install googlechrome

# Firefox
choco install firefox

# Edge
choco install microsoft-edge
```

**Or download directly:**

- Chrome: https://www.google.com/chrome/
- Firefox: https://www.mozilla.org/firefox/
- Edge: https://www.microsoft.com/edge

### Install Browsers on Linux:

**Ubuntu/Debian:**

```bash
# Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

# Firefox (usually pre-installed)
sudo apt-get install firefox

# Chromium
sudo apt-get install chromium-browser

# Edge
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/microsoft.gpg] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list'
sudo apt update
sudo apt install microsoft-edge-stable
```

**Fedora/RHEL:**

```bash
# Chrome
sudo dnf install google-chrome-stable

# Firefox (usually pre-installed)
sudo dnf install firefox

# Edge
sudo dnf install microsoft-edge-stable
```

## Running Tests

The framework supports multiple browser options:

### Chromium (Default)

```bash
npm run test:bdd                # Headless
npm run test:bdd:headed         # Headed mode
```

### Firefox

```bash
npm run test:bdd:firefox        # Headless
npm run test:bdd:firefox:headed # Headed mode
```

### Custom Browser (Any OS)

```bash
# Windows
cross-env BROWSER=firefox HEADLESS=false cucumber-js --config cucumber.js

# macOS/Linux
BROWSER=firefox HEADLESS=false cucumber-js --config cucumber.js
```

**Supported browser values:**

- `chromium` (default)
- `chrome`
- `firefox`
- `edge`
- `webkit` (Safari/Edge on Windows)
- `safari` (macOS only)

## Environment Variables

- `BROWSER` - Browser to use: `chromium`, `chrome`, `firefox`, `edge`, `webkit`, `safari`
- `HEADLESS` - Run in headless mode: `true` (default) or `false`

## Troubleshooting

If you get an error like "Browser not found":

### macOS/Linux:

1. **Verify browser installation:**

   ```bash
   which google-chrome
   which firefox
   which chromium
   ```

2. **Check browser in standard locations:**

   ```bash
   # macOS
   ls /Applications/ | grep -i chrome
   ls /Applications/ | grep -i firefox

   # Linux
   apt list --installed | grep chrome
   apt list --installed | grep firefox
   ```

### Windows:

1. **Verify browser installation:**

   ```cmd
   where chrome
   where firefox
   where msedge
   ```

2. **Check browser in Program Files:**
   ```cmd
   dir "C:\Program Files\Google\Chrome\Application"
   dir "C:\Program Files\Mozilla Firefox"
   dir "C:\Program Files\Microsoft\Edge\Application"
   ```

### All Platforms:

3. **Custom installation path:**
   If your browser is installed in a non-standard location, edit `src/utils/browser-path.util.ts` and add the path to the appropriate OS section in the `browserPathsByOS` object.

4. **Check browser compatibility:**
   Ensure your installed browser version is compatible with the Playwright version in `package.json`:
   ```bash
   npm list playwright
   ```

## Cross-Platform Support

| OS      | Supported Browsers                      | Detection Method                      |
| ------- | --------------------------------------- | ------------------------------------- |
| macOS   | Chrome, Chromium, Firefox, Safari, Edge | Standard app paths + `which` command  |
| Windows | Chrome, Chromium, Firefox, Edge         | Program Files paths + `where` command |
| Linux   | Chrome, Chromium, Firefox, Edge         | Standard bin paths + `which` command  |

## No npm Playwright Browsers Downloaded

With this setup:

- ✅ No Playwright bundled browsers are downloaded
- ✅ Uses your system-installed browsers (macOS, Windows, Linux)
- ✅ Smaller npm package size
- ✅ Compliant with organization policies that restrict browser binaries
- ✅ Browsers can be managed via system package managers

## Additional Notes

- You still need `@playwright/test` and `playwright` packages for the Playwright API/test runner, but the actual browser binaries are from your system installation
- This approach requires manual browser updates on your system (not managed by npm)
- Ensure installed browsers are compatible with the Playwright version in your `package.json`
- Browser installations are system-wide, making them shareable across projects
