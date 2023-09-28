import { getResolverOption } from "discourse-common/resolver";
import require from "require";

export const __DISCOURSE_RAW_TEMPLATES = {};

export function addRawTemplate(name, template, opts = {}) {
  // Core templates should never overwrite themes / plugins
  if (opts.core && __DISCOURSE_RAW_TEMPLATES[name]) {
    return;
  }
  __DISCOURSE_RAW_TEMPLATES[name] = template;
}

export function removeRawTemplate(name) {
  delete __DISCOURSE_RAW_TEMPLATES[name];
}

export function findRawTemplate(name) {
  if (getResolverOption("mobileView")) {
    return (
      __DISCOURSE_RAW_TEMPLATES[`javascripts/mobile/${name}`] ||
      __DISCOURSE_RAW_TEMPLATES[`javascripts/${name}`] ||
      __DISCOURSE_RAW_TEMPLATES[`mobile/${name}`] ||
      __DISCOURSE_RAW_TEMPLATES[name]
    );
  }

  return (
    __DISCOURSE_RAW_TEMPLATES[`javascripts/${name}`] ||
    __DISCOURSE_RAW_TEMPLATES[name]
  );
}

export function buildRawConnectorCache() {
  let result = {};
<<<<<<< HEAD
  Object.keys(__DISCOURSE_RAW_TEMPLATES).forEach((resource) => {
    const segments = resource.split("/");
    const connectorIndex = segments.indexOf("connectors");

    if (connectorIndex >= 0) {
      const outletName = segments[connectorIndex + 1];
=======
  findOutlets(
    Object.keys(__DISCOURSE_RAW_TEMPLATES),
    (outletName, resource) => {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      result[outletName] ??= [];
      result[outletName].push({
        template: __DISCOURSE_RAW_TEMPLATES[resource],
      });
    }
<<<<<<< HEAD
  });
=======
  );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  return result;
}

export function eagerLoadRawTemplateModules() {
<<<<<<< HEAD
  for (const key of Object.keys(requirejs.entries)) {
    if (key.includes("/raw-templates/")) {
=======
  for (const [key, value] of Object.entries(requirejs.entries)) {
    if (
      key.includes("/templates/") &&
      value.deps.includes("discourse-common/lib/raw-templates")
    ) {
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
      require(key);
    }
  }
}
