import { bind } from "discourse-common/utils/decorators";
import Component from "@ember/component";
<<<<<<< HEAD
import { inject as service } from "@ember/service";
import isZoomed from "discourse/plugins/chat/discourse/lib/zoom-check";

const CSS_VAR = "--chat-vh";
let lastVH;

export default class ChatVh extends Component {
  @service capabilities;

=======
import isZoomed from "discourse/plugins/chat/discourse/lib/zoom-check";

const CSS_VAR = "--chat-vh";
let pendingUpdate = false;

export default class ChatVh extends Component {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  tagName = "";

  didInsertElement() {
    this._super(...arguments);

<<<<<<< HEAD
    if ("virtualKeyboard" in navigator) {
      navigator.virtualKeyboard.overlaysContent = true;
      navigator.virtualKeyboard.addEventListener("geometrychange", this.setVH);
    }

    this.activeWindow = window.visualViewport || window;
    this.activeWindow.addEventListener("resize", this.setVH);
    this.setVH();
=======
    this.setVHFromVisualViewPort();

    (window?.visualViewport || window).addEventListener(
      "resize",
      this.setVHFromVisualViewPort
    );

    if ("virtualKeyboard" in navigator) {
      navigator.virtualKeyboard.addEventListener(
        "geometrychange",
        this.setVHFromKeyboard
      );
    }
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  willDestroyElement() {
    this._super(...arguments);

<<<<<<< HEAD
    this.activeWindow?.removeEventListener("resize", this.setVH);
    lastVH = null;

    if ("virtualKeyboard" in navigator) {
      navigator.virtualKeyboard.removeEventListener(
        "geometrychange",
        this.setVH
      );
    }
  }

  @bind
  setVH() {
=======
    if ("virtualKeyboard" in navigator) {
      navigator.virtualKeyboard.removeEventListener(
        "geometrychange",
        this.setVHFromKeyboard
      );
    } else {
      (window?.visualViewport || window).removeEventListener(
        "resize",
        this.setVHFromVisualViewPort
      );
    }

    pendingUpdate = false;
  }

  @bind
  setVHFromKeyboard(event) {
    if (pendingUpdate) {
      return;
    }

    if (this.isDestroying || this.isDestroyed) {
      return;
    }

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (isZoomed()) {
      return;
    }

<<<<<<< HEAD
    let height;
    if ("virtualKeyboard" in navigator) {
      height =
        window.visualViewport.height -
        navigator.virtualKeyboard.boundingRect.height;
    } else {
      height = this.activeWindow?.height || window.innerHeight;
    }

    const vh = height * 0.01;

    if (lastVH === vh) {
      return;
    }
    lastVH = vh;

    document.documentElement.style.setProperty(CSS_VAR, `${vh}px`);
  }

  #blurActiveElement() {
    if (document.activeElement?.blur) {
      document.activeElement.blur();
    }
=======
    pendingUpdate = true;

    requestAnimationFrame(() => {
      const { height } = event.target.boundingRect;
      const vhInPixels =
        ((window.visualViewport?.height || window.innerHeight) - height) * 0.01;
      document.documentElement.style.setProperty(CSS_VAR, `${vhInPixels}px`);

      pendingUpdate = false;
    });
  }

  @bind
  setVHFromVisualViewPort() {
    if (pendingUpdate) {
      return;
    }

    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    if (isZoomed()) {
      return;
    }

    pendingUpdate = true;

    requestAnimationFrame(() => {
      const vhInPixels =
        (window.visualViewport?.height || window.innerHeight) * 0.01;
      document.documentElement.style.setProperty(CSS_VAR, `${vhInPixels}px`);

      pendingUpdate = false;
    });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }
}
