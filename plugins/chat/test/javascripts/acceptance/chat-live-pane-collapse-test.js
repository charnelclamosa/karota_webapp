import { click, visit } from "@ember/test-helpers";
import {
  acceptance,
  exists,
  visible,
} from "discourse/tests/helpers/qunit-helpers";
<<<<<<< HEAD
import { skip } from "qunit";
=======
import { test } from "qunit";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

acceptance("Discourse Chat - Chat live pane collapse", function (needs) {
  needs.user({
    username: "eviltrout",
    id: 1,
    can_chat: true,
    has_chat_enabled: true,
  });

  needs.settings({
    chat_enabled: true,
  });

  needs.pretender((server, helper) => {
    server.get("/chat/:chatChannelId/messages.json", () =>
      helper.response({
        meta: {
          can_chat: true,
          user_silenced: false,
        },
        chat_messages: [
          {
            id: 1,
            message: "https://www.youtube.com/watch?v=aOWkVdU4NH0",
            cooked:
<<<<<<< HEAD
              '<div class="youtube-onebox lazy-video-container" data-video-id="aOWkVdU4NH0" data-video-title="Picnic with my cat (shaved ice &amp; lemonade)" data-provider-name="youtube"> <a href="https://www.youtube.com/watch?v=aOWkVdU4NH0" target="_blank" rel="nofollow ugc noopener"> <img class="youtube-thumbnail" src="https://img.youtube.com/vi/aOWkVdU4NH0/maxresdefault.jpg" title="Picnic with my cat (shaved ice &amp; lemonade)"> </a> </div>',
=======
              '<div class="onebox lazyYT lazyYT-container" data-youtube-id="aOWkVdU4NH0" data-youtube-title="Picnic with my cat (shaved ice &amp; lemonade)" data-parameters="feature=oembed&amp;wmode=opaque"> <a href="https://www.youtube.com/watch?v=aOWkVdU4NH0" target="_blank" rel="nofollow ugc noopener"> <img class="ytp-thumbnail-image" src="/images/discourse-logo-sketch.png" title="Picnic with my cat (shaved ice &amp; lemonade)"></a></div>',
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
            excerpt:
              '<a href="https://www.youtube.com/watch?v=aOWkVdU4NH0">[Picnic with my cat (shaved ice &amp; lemonade&hellip;</a>',
            created_at: "2021-07-20T08:14:16.950Z",
            flag_count: 0,
            user: {
              avatar_template:
                "/letter_avatar_proxy/v4/letter/t/a9a28c/{size}.png",
              id: 1,
              name: "Tomtom",
              username: "tomtom",
            },
          },
          {
            id: 2,
            message: "",
            cooked: "",
            excerpt: "",
            uploads: [
              {
                id: 4,
                url: "/images/avatar.png",
                original_filename: "tomtom.jpeg",
                filesize: 93815,
                width: 480,
                height: 640,
                thumbnail_width: 375,
                thumbnail_height: 500,
                extension: "jpeg",
                retain_hours: null,
                human_filesize: "91.6 KB",
              },
            ],
            user: {
              avatar_template:
                "/letter_avatar_proxy/v4/letter/t/a9a28c/{size}.png",
              id: 1,
              name: "Tomtom",
              username: "tomtom",
            },
          },
        ],
      })
    );

    server.get("/chat/chat_channels.json", () =>
      helper.response({
        public_channels: [],
        direct_message_channels: [],
        message_bus_last_ids: {
          channel_metadata: 0,
          channel_edits: 0,
          channel_status: 0,
          new_channel: 0,
          user_tracking_state: 0,
        },
      })
    );

    server.get("/chat/chat_channels/:chatChannelId", () =>
      helper.response({ id: 1, title: "something" })
    );

    server.post("/uploads/lookup-urls", () =>
      helper.response([
        200,
        { "Content-Type": "application/json" },
        [
          {
            url: "/images/avatar.png",
          },
        ],
      ])
    );
  });

<<<<<<< HEAD
  skip("can collapse and expand videos in chat", async function (assert) {
    const videoContainer =
      ".chat-message-container[data-id='1'] .lazy-video-container";
=======
  test("can collapse and expand youtube chat", async function (assert) {
    const youtubeContainer = ".chat-message-container[data-id='1'] .lazyYT";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    const expandImage =
      ".chat-message-container[data-id='1'] .chat-message-collapser-closed";
    const collapseImage =
      ".chat-message-container[data-id='1'] .chat-message-collapser-opened";

<<<<<<< HEAD
    await visit("/chat/c/cat/1");

    assert.ok(visible(videoContainer));
=======
    await visit("/chat/channel/1/cat");

    assert.ok(visible(youtubeContainer));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    assert.ok(visible(collapseImage), "the open arrow is shown");
    assert.notOk(exists(expandImage), "the close arrow is hidden");

    await click(collapseImage);

<<<<<<< HEAD
    assert.notOk(visible(videoContainer));
=======
    assert.notOk(visible(youtubeContainer));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    assert.ok(visible(expandImage), "the close arrow is shown");
    assert.notOk(exists(collapseImage), "the open arrow is hidden");

    await click(expandImage);

<<<<<<< HEAD
    assert.ok(visible(videoContainer));
=======
    assert.ok(visible(youtubeContainer));
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    assert.ok(visible(collapseImage), "the open arrow is shown again");
    assert.notOk(exists(expandImage), "the close arrow is hidden again");
  });

<<<<<<< HEAD
  skip("lightbox shows up before and after expand and collapse", async function (assert) {
=======
  test("lightbox shows up before and after expand and collapse", async function (assert) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    const lightboxImage = ".mfp-img";
    const image = ".chat-message-container[data-id='2'] .chat-img-upload";
    const expandImage =
      ".chat-message-container[data-id='2'] .chat-message-collapser-closed";
    const collapseImage =
      ".chat-message-container[data-id='2'] .chat-message-collapser-opened";

<<<<<<< HEAD
    await visit("/chat/c/cat/1");
=======
    await visit("/chat/channel/1/cat");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    await click(image);

    assert.ok(
      exists(document.querySelector(lightboxImage)),
      "can see lightbox"
    );
    await click(document.querySelector(".mfp-container"));

    await click(collapseImage);
    await click(expandImage);

    await click(image);
    assert.ok(
      exists(document.querySelector(lightboxImage)),
      "can see lightbox after collapse expand"
    );
    await click(document.querySelector(".mfp-container"));
  });
});
