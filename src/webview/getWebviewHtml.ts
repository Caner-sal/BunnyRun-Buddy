import * as vscode from 'vscode';

export function getWebviewHtml(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  nonce: string
): string {
  const cssUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'bunny.css')
  );
  const jsUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'media', 'bunny.js')
  );
  const csp = webview.cspSource;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'none';
    style-src ${csp} 'unsafe-inline';
    script-src 'nonce-${nonce}';
    img-src ${csp} data:;
  ">
  <link rel="stylesheet" href="${cssUri}">
  <title>BunnyRun Buddy</title>
</head>
<body>
  <div class="app">
    <div class="header">
      <span class="pet-name" id="petName">Bunny</span>
      <div class="stats-row">
        <span class="stat-item">⭐ <span id="levelDisplay">Lv.1</span></span>
        <span class="stat-item">🔥 <span id="streakDisplay">0</span></span>
        <span class="stat-item">🥕 <span id="carrotsDisplay">0</span></span>
      </div>
    </div>

    <div class="xp-bar-container">
      <div class="xp-bar" id="xpBar"></div>
      <span class="xp-label" id="xpLabel">0 XP</span>
    </div>

    <div class="bunny-stage">
      <div class="bunny-container" id="bunnyContainer">
        <div class="bunny" id="bunny">
          <div class="bunny-ears">
            <div class="ear left-ear"><div class="ear-inner"></div></div>
            <div class="ear right-ear"><div class="ear-inner"></div></div>
          </div>
          <div class="bunny-head">
            <div class="bunny-face">
              <div class="eyes">
                <div class="eye left-eye"></div>
                <div class="eye right-eye"></div>
              </div>
              <div class="nose"></div>
              <div class="mouth" id="mouth"></div>
            </div>
          </div>
          <div class="bunny-body">
            <div class="bunny-tail"></div>
          </div>
        </div>
        <div class="carrot-container" id="carrotContainer">
          <div class="carrot" id="carrot">🥕</div>
        </div>
        <div class="hearts-container" id="heartsContainer"></div>
        <div class="tears-container" id="tearsContainer"></div>
        <div class="zzz-container" id="zzzContainer">
          <span class="zzz">z</span>
          <span class="zzz">z</span>
          <span class="zzz">Z</span>
        </div>
      </div>
    </div>

    <div class="message-box" id="messageBox"></div>

    <div class="best-streak-row">
      <span class="best-label">Best streak: <span id="bestStreakDisplay">0</span></span>
    </div>

    <button class="reset-btn" id="resetBtn">Reset Stats</button>
  </div>
  <script nonce="${nonce}" src="${jsUri}"></script>
</body>
</html>`;
}
