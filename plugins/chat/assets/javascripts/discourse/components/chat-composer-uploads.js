import Component from "@ember/component";
import { clipboardHelpers } from "discourse/lib/utilities";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import UppyMediaOptimization from "discourse/lib/uppy-media-optimization-plugin";
import discourseComputed, { bind } from "discourse-common/utils/decorators";
import UppyUploadMixin from "discourse/mixins/uppy-upload";
<<<<<<< HEAD
import { cloneJSON } from "discourse-common/lib/object";
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

export default Component.extend(UppyUploadMixin, {
  classNames: ["chat-composer-uploads"],
  mediaOptimizationWorker: service(),
  chatStateManager: service(),
  id: "chat-composer-uploader",
  type: "chat-composer",
<<<<<<< HEAD
  existingUploads: null,
  uploads: null,
  useMultipartUploadsIfAvailable: true,
  uploadDropZone: null,
=======
  uploads: null,
  useMultipartUploadsIfAvailable: true,
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

  init() {
    this._super(...arguments);
    this.setProperties({
<<<<<<< HEAD
      fileInputSelector: `#${this.fileUploadElementId}`,
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.inProgressUploads?.length > 0) {
      this._uppyInstance?.cancelAll();
    }

    this.set(
      "uploads",
      this.existingUploads ? cloneJSON(this.existingUploads) : []
    );
=======
      uploads: [],
      fileInputSelector: `#${this.fileUploadElementId}`,
    });
    this.appEvents.on("chat-composer:load-uploads", this, "_loadUploads");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  didInsertElement() {
    this._super(...arguments);
<<<<<<< HEAD

=======
    this.composerInputEl = document.querySelector(".chat-composer-input");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.composerInputEl?.addEventListener("paste", this._pasteEventListener);
  },

  willDestroyElement() {
    this._super(...arguments);
<<<<<<< HEAD

=======
    this.appEvents.off("chat-composer:load-uploads", this, "_loadUploads");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.composerInputEl?.removeEventListener(
      "paste",
      this._pasteEventListener
    );
  },

  uploadDone(upload) {
    this.uploads.pushObject(upload);
<<<<<<< HEAD
    this._triggerUploadsChanged();
=======
    this.onUploadChanged(this.uploads);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  @discourseComputed("uploads.length", "inProgressUploads.length")
  showUploadsContainer(uploadsCount, inProgressUploadsCount) {
    return uploadsCount > 0 || inProgressUploadsCount > 0;
  },

  @action
  cancelUploading(upload) {
    this.appEvents.trigger(`upload-mixin:${this.id}:cancel-upload`, {
      fileId: upload.id,
    });
<<<<<<< HEAD
    this.removeUpload(upload);
=======
    this.uploads.removeObject(upload);
    this.onUploadChanged(this.uploads);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  @action
  removeUpload(upload) {
    this.uploads.removeObject(upload);
<<<<<<< HEAD
    this._triggerUploadsChanged();
  },

  _uploadDropTargetOptions() {
    return {
      target: this.uploadDropZone || document.body,
    };
  },

=======
    this.onUploadChanged(this.uploads);
  },

  _uploadDropTargetOptions() {
    let targetEl;
    if (this.chatStateManager.isFullPageActive) {
      targetEl = document.querySelector(".full-page-chat");
    } else {
      targetEl = document.querySelector(".chat-drawer.is-expanded");
    }

    if (!targetEl) {
      return this._super();
    }

    return {
      target: targetEl,
    };
  },

  _loadUploads(uploads) {
    this._uppyInstance?.cancelAll();
    this.set("uploads", uploads);
  },

>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  _uppyReady() {
    if (this.siteSettings.composer_media_optimization_image_enabled) {
      this._useUploadPlugin(UppyMediaOptimization, {
        optimizeFn: (data, opts) =>
          this.mediaOptimizationWorker.optimizeImage(data, opts),
        runParallel: !this.site.isMobileDevice,
      });
    }

    this._onPreProcessProgress((file) => {
      const inProgressUpload = this.inProgressUploads.findBy("id", file.id);
      if (!inProgressUpload?.processing) {
        inProgressUpload?.set("processing", true);
      }
    });

    this._onPreProcessComplete((file) => {
      const inProgressUpload = this.inProgressUploads.findBy("id", file.id);
      inProgressUpload?.set("processing", false);
    });
  },

  @bind
  _pasteEventListener(event) {
    if (document.activeElement !== this.composerInputEl) {
      return;
    }

    const { canUpload, canPasteHtml, types } = clipboardHelpers(event, {
      siteSettings: this.siteSettings,
      canUpload: true,
    });

    if (!canUpload || canPasteHtml || types.includes("text/plain")) {
      return;
    }

    if (event && event.clipboardData && event.clipboardData.files) {
      this._addFiles([...event.clipboardData.files], { pasted: true });
    }
  },
<<<<<<< HEAD

  onProgressUploadsChanged() {
    this._triggerUploadsChanged(this.uploads, {
      inProgressUploadsCount: this.inProgressUploads?.length,
    });
  },

  _triggerUploadsChanged() {
    this.onUploadChanged?.(this.uploads, {
      inProgressUploadsCount: this.inProgressUploads?.length,
    });
  },
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
});
