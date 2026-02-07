const Sidebar = {
  element: null,
  isOpen: false,
  init(selector) {
    this.element = document.querySelector(selector);
    if (!this.element) return;
    this.loadState();
  },
  toggle() { this.isOpen ? this.close() : this.open(); },
  open() {
    this.element?.classList.add('open');
    this.isOpen = true;
    this.saveState();
  },
  close() {
    this.element?.classList.remove('open');
    this.isOpen = false;
    this.saveState();
  },
  saveState() { localStorage.setItem('sidebar-open', this.isOpen); },
  loadState() {
    if (localStorage.getItem('sidebar-open') === 'true') this.open();
  }
};
