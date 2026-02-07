const Editor = {
  textarea: null,
  init(selector) {
    this.textarea = document.querySelector(selector);
    if (!this.textarea) return;
    this.textarea.addEventListener('input', () => this.autoSave());
  },
  getText() { return this.textarea?.value || ''; },
  setText(text) { if (this.textarea) this.textarea.value = text; },
  insertText(text) {
    if (!this.textarea) return;
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const value = this.textarea.value;
    this.textarea.value = value.substring(0, start) + text + value.substring(end);
    this.textarea.selectionStart = this.textarea.selectionEnd = start + text.length;
  },
  autoSave() { localStorage.setItem('editor-content', this.getText()); },
  loadSaved() { this.setText(localStorage.getItem('editor-content') || ''); }
};
