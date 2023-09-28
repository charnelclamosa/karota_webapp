import { withPluginApi } from "discourse/lib/plugin-api";
import { applyLocalDates } from "discourse/lib/local-dates";

export default {
  name: "chat-plugin-decorators",

  initializeWithPluginApi(api, siteSettings) {
    api.decorateChatMessage(
      (element) => {
        applyLocalDates(
          element.querySelectorAll(".discourse-local-date"),
          siteSettings
        );
      },
      {
        id: "local-dates",
      }
    );

    if (siteSettings.spoiler_enabled) {
      const applySpoiler = requirejs(
        "discourse/plugins/discourse-spoiler-alert/lib/apply-spoiler"
      ).default;
      api.decorateChatMessage(
        (element) => {
          element.querySelectorAll(".spoiler").forEach((spoiler) => {
            spoiler.classList.remove("spoiler");
            spoiler.classList.add("spoiled");
            applySpoiler(spoiler);
          });
        },
        {
          id: "spoiler",
        }
      );
    }
<<<<<<< HEAD
=======

    api.decorateChatMessage(
      (element) => {
        element
          .querySelectorAll(".lazyYT:not(.lazyYT-video-loaded)")
          .forEach((iframe) => {
            $(iframe).lazyYT();
          });
      },
      {
        id: "lazy-yt",
      }
    );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  },

  initialize(container) {
    if (container.lookup("service:chat").userCanChat) {
      const siteSettings = container.lookup("service:site-settings");
      withPluginApi("0.8.42", (api) => {
        this.initializeWithPluginApi(api, siteSettings);
      });
    }
  },
};
