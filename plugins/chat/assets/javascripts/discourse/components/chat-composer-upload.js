<<<<<<< HEAD
import Component from "@glimmer/component";
import { isImage } from "discourse/lib/uploads";

export default class ChatComposerUpload extends Component {
  get isImage() {
    return isImage(
      this.args.upload.original_filename || this.args.upload.fileName
    );
  }

  get fileName() {
    return this.args.isDone
      ? this.args.upload.original_filename
      : this.args.upload.fileName;
  }
}
=======
import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
import { isImage } from "discourse/lib/uploads";

export default Component.extend({
  IMAGE_TYPE: "image",

  tagName: "",
  classNames: "chat-upload",
  isDone: false,
  upload: null,
  onCancel: null,

  @discourseComputed("upload.{original_filename,fileName}")
  type(upload) {
    if (isImage(upload.original_filename || upload.fileName)) {
      return this.IMAGE_TYPE;
    }
  },

  @discourseComputed("isDone", "upload.{original_filename,fileName}")
  fileName(isDone, upload) {
    return isDone ? upload.original_filename : upload.fileName;
  },
});
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
