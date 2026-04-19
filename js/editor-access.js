// Visual Editor Access - Type "editor" quickly or press Ctrl+Shift+E

let editorAccessCode = '';
let editorAccessTimeout;
const EDITOR_ACTIVATION_KEYS = ['e', 'd', 'i', 't', 'o', 'r'];
let editorKeyIndex = 0;

function showEditorToast(message) {
  if (typeof showAdminToast === 'function') {
    showAdminToast(message);
  } else {
    console.log(message);
  }
}

// Listen for keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl+Shift+E to open editor
  if (e.ctrlKey && e.shiftKey && e.code === 'KeyE') {
    e.preventDefault();
    window.location.href = '/editor.html';
    return;
  }

  // Type "editor" quickly to open
  const char = e.key.toLowerCase();
  if (EDITOR_ACTIVATION_KEYS[editorKeyIndex] === char) {
    editorKeyIndex++;
    clearTimeout(editorAccessTimeout);
    editorAccessTimeout = setTimeout(() => {
      editorKeyIndex = 0;
    }, 1000);

    if (editorKeyIndex === EDITOR_ACTIVATION_KEYS.length) {
      showEditorToast('✏️ Opening Visual Editor...');
      setTimeout(() => {
        window.location.href = '/editor.html';
      }, 300);
      editorKeyIndex = 0;
    }
  } else {
    editorKeyIndex = 0;
  }
});

console.log('✅ Visual Editor Access Enabled');
console.log('🎨 Shortcuts:');
console.log('  • Press Ctrl+Shift+E');
console.log('  • Type "editor" quickly');
