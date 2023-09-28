import Modifier from "ember-modifier";
import { registerDestructor } from "@ember/destroyable";
import { bind } from "discourse-common/utils/decorators";

export default class DraggableModifier extends Modifier {
  hasStarted = false;
  element;

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, (instance) => instance.cleanup());
  }

  modify(el, _, { didStartDrag, didEndDrag, dragMove }) {
    this.element = el;
    this.didStartDragCallback = didStartDrag;
    this.didEndDragCallback = didEndDrag;
    this.dragMoveCallback = dragMove;
    this.element.addEventListener("touchstart", this.dragMove, {
      passive: false,
    });
    this.element.addEventListener("mousedown", this.dragMove, {
      passive: false,
    });
<<<<<<< HEAD
    this.element.addEventListener("dragenter", this.dragMove, {
      passive: false,
    });
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  @bind
  dragMove(e) {
<<<<<<< HEAD
=======
    e.stopPropagation();
    e.preventDefault();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    if (!this.hasStarted) {
      this.hasStarted = true;

      if (this.didStartDragCallback) {
<<<<<<< HEAD
        this.didStartDragCallback(e);
=======
        this.didStartDragCallback();
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      }

      // Register a global event to capture mouse moves when element 'clicked'.
      document.addEventListener("touchmove", this.drag, { passive: false });
      document.addEventListener("mousemove", this.drag, { passive: false });
<<<<<<< HEAD
      document.addEventListener("dragover", this.drag, { passive: false });
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      document.body.classList.add("dragging");

      // On leaving click, stop moving.
      document.addEventListener("touchend", this.didEndDrag, {
        passive: false,
      });
      document.addEventListener("mouseup", this.didEndDrag, {
        passive: false,
      });
<<<<<<< HEAD
      document.addEventListener("drop", this.didEndDrag, {
        passive: false,
      });
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  }

  @bind
  drag(e) {
    if (this.hasStarted && this.dragMoveCallback) {
      this.dragMoveCallback(e, this.element);
    }
  }

  @bind
  didEndDrag(e) {
    if (this.hasStarted) {
      this.didEndDragCallback(e, this.element);

      document.removeEventListener("touchmove", this.drag);
      document.removeEventListener("mousemove", this.drag);
<<<<<<< HEAD
      document.removeEventListener("dragover", this.drag);
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

      document.body.classList.remove("dragging");
      this.hasStarted = false;
    }
  }

  cleanup() {
    document.removeEventListener("touchstart", this.dragMove);
    document.removeEventListener("mousedown", this.dragMove);
<<<<<<< HEAD
    document.removeEventListener("dragenter", this.dragMove);
    document.removeEventListener("touchend", this.didEndDrag);
    document.removeEventListener("mouseup", this.didEndDrag);
    document.removeEventListener("drop", this.didEndDrag);
    document.removeEventListener("mousemove", this.drag);
    document.removeEventListener("touchmove", this.drag);
    document.removeEventListener("dragover", this.drag);
=======
    document.removeEventListener("touchend", this.didEndDrag);
    document.removeEventListener("mouseup", this.didEndDrag);
    document.removeEventListener("mousemove", this.drag);
    document.removeEventListener("touchmove", this.drag);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    document.body.classList.remove("dragging");
  }
}
