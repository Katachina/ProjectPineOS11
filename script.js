// Toggle Start Menu
document.getElementById('start-btn').addEventListener('click', function() {
    const startMenu = document.getElementById('start-menu');
    startMenu.style.display = (startMenu.style.display === 'block') ? 'none' : 'block';
});

// Open App Windows
function openApp(appName) {
    if (appName === 'Terminal') {
        createTerminal();
    }
}

// Close App
function closeApp(button) {
    const windowEl = button.closest('.app-window');
    windowEl.remove();
}

// Create Terminal App
function createTerminal() {
    const appWindows = document.getElementById('app-windows');
    
    const terminalWindow = document.createElement('div');
    terminalWindow.classList.add('app-window');
    terminalWindow.innerHTML = `
        <div class="title-bar">
            Terminal 
            <button onclick="closeApp(this)">X</button>
        </div>
        <div class="content" id="terminal-output">
            <p>Welcome to PineOS 11 Terminal</p>
        </div>
        <div class="input-area">
            <span>$ </span><input type="text" id="terminal-input" autofocus>
        </div>
    `;
    
    appWindows.appendChild(terminalWindow);
    
    const terminalInput = document.getElementById('terminal-input');
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const input = terminalInput.value;
            handleTerminalCommand(input);
            terminalInput.value = '';
        }
    });

    // Make the window draggable
    makeDraggable(terminalWindow);
}

// Handle Terminal Commands and Sounds
function handleTerminalCommand(command) {
    const terminalOutput = document.getElementById('terminal-output');
    const meltdownSound = document.getElementById('meltdown-sound');
    const freezedownSound = document.getElementById('freezedown-sound');

    let response;
    switch (command.toLowerCase()) {
        case 'ping':
            response = 'Pong!';
            break;
        case 'list':
            response = 'Files: \n- core.txt\n- settings.cfg\n- temperature.log';
            break;
        case 'core temperature':
            response = 'Core Temperature: 45°C';
            break;
        case 'shutdown':
            response = 'Shutting down...';
            setTimeout(() => window.location.reload(), 2000);
            break;
        case 'meltdown':
            response = 'Warning: Core meltdown initiated!';
            meltdownSound.play();
            break;
        case 'freezedown':
            response = 'Core cooling in progress...';
            freezedownSound.play();
            break;
        default:
            response = 'Command not found: ' + command;
    }

    terminalOutput.innerHTML += `<p>$ ${command}</p><p>${response}</p>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Draggable function
function makeDraggable(el) {
    const titleBar = el.querySelector('.title-bar');
    let isDragging = false, x = 0, y = 0;
    
    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        x = e.clientX - el.offsetLeft;
        y = e.clientY - el.offsetTop;
        titleBar.classList.add('draggable');
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            el.style.left = (e.clientX - x) + 'px';
            el.style.top = (e.clientY - y) + 'px';
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        titleBar.classList.remove('draggable');
    });
}
