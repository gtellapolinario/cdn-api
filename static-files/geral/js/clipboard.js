const Clipboard = {
  async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      return this.fallbackCopy(text);
    }
  },
  fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      document.body.removeChild(textarea);
      return false;
    }
  },
  async paste() {
    try {
      return await navigator.clipboard.readText();
    } catch (err) {
      return null;
    }
  }
};
