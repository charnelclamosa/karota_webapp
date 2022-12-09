import {
  acceptance,
  exists,
  publishToMessageBus,
  query,
} from "discourse/tests/helpers/qunit-helpers";
<<<<<<< HEAD
import { triggerEvent, visit } from "@ember/test-helpers";
=======
import { visit } from "@ember/test-helpers";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
import { test } from "qunit";
import { cloneJSON } from "discourse-common/lib/object";
import topicFixtures from "../fixtures/topic";
import pretender, { response } from "discourse/tests/helpers/create-pretender";

<<<<<<< HEAD
function topicWithoutUserStatus(topicId, mentionedUserId) {
  const topic = cloneJSON(topicFixtures[`/t/${topicId}.json`]);
  topic.archetype = "regular";
  const firstPost = topic.post_stream.posts[0];
  firstPost.cooked =
    '<p>I am mentioning <a class="mention" href="/u/user1">@user1</a> again.</p>';
  firstPost.mentioned_users = [
    {
      id: mentionedUserId,
      username: "user1",
      avatar_template: "/letter_avatar_proxy/v4/letter/a/bbce88/{size}.png",
    },
  ];
  return topic;
}

function topicWithUserStatus(topicId, mentionedUserId, status) {
  const topic = topicWithoutUserStatus(topicId, mentionedUserId);
  topic.post_stream.posts[0].mentioned_users[0].status = status;
  return topic;
}

acceptance("Post inline mentions", function (needs) {
=======
acceptance("Post inline mentions test", function (needs) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  needs.user();

  const topicId = 130;
  const mentionedUserId = 1;
  const status = {
    description: "Surfing",
    emoji: "surfing_man",
    ends_at: null,
  };

<<<<<<< HEAD
  test("shows user status on inline mentions", async function (assert) {
    pretender.get(`/t/${topicId}.json`, () => {
      return response(topicWithUserStatus(topicId, mentionedUserId, status));
=======
  function topicWithoutUserStatus() {
    const topic = cloneJSON(topicFixtures[`/t/${topicId}.json`]);
    const firstPost = topic.post_stream.posts[0];
    firstPost.cooked =
      '<p>I am mentioning <a class="mention" href="/u/user1">@user1</a> again.</p>';
    firstPost.mentioned_users = [
      {
        id: mentionedUserId,
        username: "user1",
        avatar_template: "/letter_avatar_proxy/v4/letter/a/bbce88/{size}.png",
      },
    ];
    return topic;
  }

  function topicWithUserStatus() {
    const topic = topicWithoutUserStatus();
    topic.post_stream.posts[0].mentioned_users[0].status = status;
    return topic;
  }

  test("shows user status on inline mentions", async function (assert) {
    pretender.get(`/t/${topicId}.json`, () => {
      return response(topicWithUserStatus());
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });

    await visit(`/t/lorem-ipsum-dolor-sit-amet/${topicId}`);

    assert.ok(
<<<<<<< HEAD
      exists(".topic-post .cooked .mention .user-status-message"),
      "user status is shown"
    );
    const statusElement = query(
      ".topic-post .cooked .mention .user-status-message img"
=======
      exists(".topic-post .cooked .mention .user-status"),
      "user status is shown"
    );
    const statusElement = query(".topic-post .cooked .mention .user-status");
    assert.equal(
      statusElement.title,
      status.description,
      "status description is correct"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );
    assert.ok(
      statusElement.src.includes(status.emoji),
      "status emoji is correct"
    );
  });

  test("inserts user status on message bus message", async function (assert) {
    pretender.get(`/t/${topicId}.json`, () => {
<<<<<<< HEAD
      return response(topicWithoutUserStatus(topicId, mentionedUserId));
=======
      return response(topicWithoutUserStatus());
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
    await visit(`/t/lorem-ipsum-dolor-sit-amet/${topicId}`);

    assert.notOk(
<<<<<<< HEAD
      exists(".topic-post .cooked .mention .user-status-message"),
=======
      exists(".topic-post .cooked .mention .user-status"),
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      "user status isn't shown"
    );

    await publishToMessageBus("/user-status", {
      [mentionedUserId]: {
        description: status.description,
        emoji: status.emoji,
      },
    });

    assert.ok(
<<<<<<< HEAD
      exists(".topic-post .cooked .mention .user-status-message"),
      "user status is shown"
    );
    const statusElement = query(
      ".topic-post .cooked .mention .user-status-message img"
=======
      exists(".topic-post .cooked .mention .user-status"),
      "user status is shown"
    );
    const statusElement = query(".topic-post .cooked .mention .user-status");
    assert.equal(
      statusElement.title,
      status.description,
      "status description is correct"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );
    assert.ok(
      statusElement.src.includes(status.emoji),
      "status emoji is correct"
    );
  });

  test("updates user status on message bus message", async function (assert) {
    pretender.get(`/t/${topicId}.json`, () => {
<<<<<<< HEAD
      return response(topicWithUserStatus(topicId, mentionedUserId, status));
=======
      return response(topicWithUserStatus());
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
    await visit(`/t/lorem-ipsum-dolor-sit-amet/${topicId}`);

    assert.ok(
<<<<<<< HEAD
      exists(".topic-post .cooked .mention .user-status-message"),
=======
      exists(".topic-post .cooked .mention .user-status"),
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      "initial user status is shown"
    );

    const newStatus = {
      description: "off to dentist",
      emoji: "tooth",
    };
    await publishToMessageBus("/user-status", {
      [mentionedUserId]: {
        description: newStatus.description,
        emoji: newStatus.emoji,
      },
    });

    assert.ok(
<<<<<<< HEAD
      exists(".topic-post .cooked .mention .user-status-message"),
      "updated user status is shown"
    );
    const statusElement = query(
      ".topic-post .cooked .mention .user-status-message img"
=======
      exists(".topic-post .cooked .mention .user-status"),
      "updated user status is shown"
    );
    const statusElement = query(".topic-post .cooked .mention .user-status");
    assert.equal(
      statusElement.title,
      newStatus.description,
      "updated status description is correct"
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    );
    assert.ok(
      statusElement.src.includes(newStatus.emoji),
      "updated status emoji is correct"
    );
  });

  test("removes user status on message bus message", async function (assert) {
    pretender.get(`/t/${topicId}.json`, () => {
<<<<<<< HEAD
      return response(topicWithUserStatus(topicId, mentionedUserId, status));
=======
      return response(topicWithUserStatus());
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    });
    await visit(`/t/lorem-ipsum-dolor-sit-amet/${topicId}`);

    assert.ok(
<<<<<<< HEAD
      exists(".topic-post .cooked .mention .user-status-message"),
=======
      exists(".topic-post .cooked .mention .user-status"),
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      "initial user status is shown"
    );

    await publishToMessageBus("/user-status", {
      [mentionedUserId]: null,
    });

    assert.notOk(
<<<<<<< HEAD
      exists(".topic-post .cooked .mention .user-status-message"),
=======
      exists(".topic-post .cooked .mention .user-status"),
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      "updated user has disappeared"
    );
  });
});
<<<<<<< HEAD

acceptance("Post inline mentions – user status tooltip", function (needs) {
  needs.user();

  const topicId = 130;
  const mentionedUserId = 1;
  const status = {
    description: "Surfing",
    emoji: "surfing_man",
    ends_at: null,
  };

  async function mouseMove(selector) {
    await triggerEvent(selector, "mousemove");
  }

  test("shows user status tooltip", async function (assert) {
    pretender.get(`/t/${topicId}.json`, () => {
      return response(topicWithUserStatus(topicId, mentionedUserId, status));
    });

    await visit(`/t/lorem-ipsum-dolor-sit-amet/${topicId}`);
    assert.ok(
      exists(".topic-post .cooked .mention .user-status-message"),
      "user status is shown"
    );

    await mouseMove(".user-status-message");
    const statusTooltip = document.querySelector(
      ".user-status-message-tooltip"
    );
    assert.ok(statusTooltip, "status tooltip is shown");
    assert.ok(
      statusTooltip.querySelector("img").src.includes(status.emoji),
      "emoji is correct"
    );
    assert.equal(
      statusTooltip.querySelector(".user-status-tooltip-description").innerText,
      status.description,
      "status description is correct"
    );
  });
});

acceptance("Post inline mentions as an anonymous user", function () {
  const topicId = 130;
  const mentionedUserId = 1;
  const status = {
    description: "Surfing",
    emoji: "surfing_man",
    ends_at: null,
  };

  test("an anonymous user can see user status on mentions", async function (assert) {
    pretender.get(`/t/${topicId}.json`, () => {
      const topic = topicWithUserStatus(topicId, mentionedUserId, status);
      return response(topic);
    });
    await visit(`/t/lorem-ipsum-dolor-sit-amet/${topicId}`);

    assert.ok(
      exists(".topic-post .cooked .mention .user-status-message"),
      "user status is shown"
    );
  });

  test("an anonymous user can see user status with an end date on mentions", async function (assert) {
    pretender.get(`/t/${topicId}.json`, () => {
      const statusWithEndDate = Object.assign(status, {
        ends_at: "2100-02-01T09:00:00.000Z",
      });
      const topic = topicWithUserStatus(
        topicId,
        mentionedUserId,
        statusWithEndDate
      );
      return response(topic);
    });
    await visit(`/t/lorem-ipsum-dolor-sit-amet/${topicId}`);

    assert.ok(
      exists(".topic-post .cooked .mention .user-status-message"),
      "user status is shown"
    );
  });
});
=======
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
