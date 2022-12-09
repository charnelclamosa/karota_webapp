let narrowDesktopForced = false;

const NarrowDesktop = {
  narrowDesktopView: false,

  init() {
    this.narrowDesktopView =
      narrowDesktopForced ||
      this.isNarrowDesktopView(document.body.getBoundingClientRect().width);
  },

  isNarrowDesktopView(width) {
<<<<<<< HEAD
    return width < 768;
=======
    return width < 1000;
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },
};

export default NarrowDesktop;
