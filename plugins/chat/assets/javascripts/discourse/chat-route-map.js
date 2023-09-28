export default function () {
  this.route("chat", { path: "/chat" }, function () {
<<<<<<< HEAD
    this.route("channel", { path: "/c/:channelTitle/:channelId" }, function () {
      this.route("near-message", { path: "/:messageId" });
      this.route("threads", { path: "/t" });
      this.route("thread", { path: "/t/:threadId" }, function () {
        this.route("near-message", { path: "/:messageId" });
      });
    });

    this.route(
      "channel.info",
      { path: "/c/:channelTitle/:channelId/info" },
      function () {
        this.route("about", { path: "/about" });
        this.route("members", { path: "/members" });
        this.route("settings", { path: "/settings" });
      }
    );

=======
    this.route(
      "channel",
      { path: "/channel/:channelId/:channelTitle" },
      function () {
        this.route("info", { path: "/info" }, function () {
          this.route("about", { path: "/about" });
          this.route("members", { path: "/members" });
          this.route("settings", { path: "/settings" });
        });
      }
    );

    this.route("draft-channel", { path: "/draft-channel" });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    this.route("browse", { path: "/browse" }, function () {
      this.route("all", { path: "/all" });
      this.route("closed", { path: "/closed" });
      this.route("open", { path: "/open" });
      this.route("archived", { path: "/archived" });
    });
    this.route("message", { path: "/message/:messageId" });
<<<<<<< HEAD
=======
    this.route("channelByName", { path: "/chat_channels/:channelName" });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  });
}
