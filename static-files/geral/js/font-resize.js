const FontResize = {
  currentSize: 16,
  minSize: 12,
  maxSize: 24,
  step: 2,
  target: null,
  init(selector = 'body') {
    this.target = document.querySelector(selector);
    this.loadSize();
    this.apply();
  },
  increase() {
    if (this.currentSize < this.maxSize) {
      this.currentSize += this.step;
      this.apply();
      this.saveSize();
    }
  },
  decrease() {
    if (this.currentSize > this.minSize) {
      this.currentSize -= this.step;
      this.apply();
      this.saveSize();
    }
  },
  reset() { this.currentSize = 16; this.apply(); this.saveSize(); },
  apply() { if (this.target) this.target.style.fontSize = `${this.currentSize}px`; },
  saveSize() { localStorage.setItem('font-size', this.currentSize); },
  loadSize() {
    const saved = localStorage.getItem('font-size');
    if (saved) this.currentSize = parseInt(saved, 10);
  }
};
