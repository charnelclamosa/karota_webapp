<<<<<<< HEAD
import { module, test } from "qunit";
import EmberObject from "@ember/object";
import discourseComputed from "discourse-common/utils/decorators";
import { withPluginApi } from "discourse/lib/plugin-api";
import { setupTest } from "ember-qunit";
import { getOwner } from "@ember/application";

module("Unit | Utility | plugin-api", function (hooks) {
  setupTest(hooks);

=======
import { discourseModule } from "discourse/tests/helpers/qunit-helpers";
import { test } from "qunit";
import EmberObject from "@ember/object";
import discourseComputed from "discourse-common/utils/decorators";
import { withPluginApi } from "discourse/lib/plugin-api";

discourseModule("Unit | Utility | plugin-api", function () {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  test("modifyClass works with classic Ember objects", function (assert) {
    const TestThingy = EmberObject.extend({
      @discourseComputed
      prop() {
        return "hello";
      },
    });

<<<<<<< HEAD
    getOwner(this).register("test-thingy:main", TestThingy);
=======
    this.registry.register("test-thingy:main", TestThingy);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    withPluginApi("1.1.0", (api) => {
      api.modifyClass("test-thingy:main", {
        pluginId: "plugin-api-test",

        @discourseComputed
        prop() {
          return `${this._super(...arguments)} there`;
        },
      });
    });

<<<<<<< HEAD
    const thingy = getOwner(this).lookup("test-thingy:main");
=======
    const thingy = this.container.lookup("test-thingy:main");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    assert.strictEqual(thingy.prop, "hello there");
  });

  test("modifyClass works with native class Ember objects", function (assert) {
    class NativeTestThingy extends EmberObject {
      @discourseComputed
      prop() {
        return "howdy";
      }
    }

<<<<<<< HEAD
    getOwner(this).register("native-test-thingy:main", NativeTestThingy);
=======
    this.registry.register("native-test-thingy:main", NativeTestThingy);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

    withPluginApi("1.1.0", (api) => {
      api.modifyClass("native-test-thingy:main", {
        pluginId: "plugin-api-test",

        @discourseComputed
        prop() {
          return `${this._super(...arguments)} partner`;
        },
      });
    });

<<<<<<< HEAD
    const thingy = getOwner(this).lookup("native-test-thingy:main");
=======
    const thingy = this.container.lookup("native-test-thingy:main");
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    assert.strictEqual(thingy.prop, "howdy partner");
  });

  test("modifyClass works with native classes", function (assert) {
    class ClassTestThingy {
      get keep() {
        return "hey!";
      }

      get prop() {
        return "top of the morning";
      }
    }

<<<<<<< HEAD
    getOwner(this).register("class-test-thingy:main", new ClassTestThingy(), {
=======
    this.registry.register("class-test-thingy:main", new ClassTestThingy(), {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      instantiate: false,
    });

    withPluginApi("1.1.0", (api) => {
      api.modifyClass("class-test-thingy:main", {
        pluginId: "plugin-api-test",

        get prop() {
          return "g'day";
        },
      });
    });

<<<<<<< HEAD
    const thingy = getOwner(this).lookup("class-test-thingy:main");
    assert.strictEqual(thingy.keep, "hey!");
    assert.strictEqual(thingy.prop, "g'day");
  });

  test("modifyClass works with getters", function (assert) {
    let Base = EmberObject.extend({
      get foo() {
        throw new Error("base getter called");
      },
    });

    getOwner(this).register("test-class:main", Base, {
      instantiate: false,
    });

    // Performing this lookup triggers `factory._onLookup`. In DEBUG builds, that invokes injectedPropertyAssertion()
    // https://github.com/emberjs/ember.js/blob/36505f1b42/packages/%40ember/-internals/runtime/lib/system/core_object.js#L1144-L1163
    // Which in turn invokes `factory.proto()`.
    // This puts things in a state which will trigger https://github.com/emberjs/ember.js/issues/18860 when a native getter is overridden.
    withPluginApi("1.1.0", (api) => {
      api.modifyClass("test-class:main", {
        pluginId: "plugin-api-test",

        get foo() {
          return "modified getter";
        },
      });
    });

    const obj = Base.create();
    assert.true(true, "no error thrown while merging mixin with getter");

    assert.strictEqual(obj.foo, "modified getter", "returns correct result");
  });
=======
    const thingy = this.container.lookup("class-test-thingy:main");
    assert.strictEqual(thingy.keep, "hey!");
    assert.strictEqual(thingy.prop, "g'day");
  });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
});
