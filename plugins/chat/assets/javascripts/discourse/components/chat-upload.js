import Component from "@glimmer/component";

import { inject as service } from "@ember/service";
<<<<<<< HEAD
import { isAudio, isImage, isVideo } from "discourse/lib/uploads";
=======
import { isImage, isVideo } from "discourse/lib/uploads";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { htmlSafe } from "@ember/template";

export default class extends Component {
  @service siteSettings;

  @tracked loaded = false;

  IMAGE_TYPE = "image";
  VIDEO_TYPE = "video";
<<<<<<< HEAD
  AUDIO_TYPE = "audio";
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  ATTACHMENT_TYPE = "attachment";

  get type() {
    if (isImage(this.args.upload.original_filename)) {
      return this.IMAGE_TYPE;
    }

    if (isVideo(this.args.upload.original_filename)) {
      return this.VIDEO_TYPE;
    }

<<<<<<< HEAD
    if (isAudio(this.args.upload.original_filename)) {
      return this.AUDIO_TYPE;
    }

=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    return this.ATTACHMENT_TYPE;
  }

  get size() {
    const width = this.args.upload.width;
    const height = this.args.upload.height;

    const ratio = Math.min(
      this.siteSettings.max_image_width / width,
      this.siteSettings.max_image_height / height
    );
    return { width: width * ratio, height: height * ratio };
  }

  get imageStyle() {
    if (this.args.upload.dominant_color && !this.loaded) {
      return htmlSafe(`background-color: #${this.args.upload.dominant_color};`);
    }
  }

  @action
  imageLoaded() {
    this.loaded = true;
  }
}
