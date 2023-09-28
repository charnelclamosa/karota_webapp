import { buildRawConnectorCache } from "discourse-common/lib/raw-templates";
import deprecated from "discourse-common/lib/deprecated";
<<<<<<< HEAD
import {
  getComponentTemplate,
  hasInternalComponentManager,
  setComponentTemplate,
} from "@glimmer/manager";
import templateOnly from "@ember/component/template-only";
=======
import DiscourseTemplateMap from "discourse-common/lib/discourse-template-map";
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)

let _connectorCache;
let _rawConnectorCache;
let _extraConnectorClasses = {};

export function resetExtraClasses() {
  _extraConnectorClasses = {};
}

// Note: In plugins, define a class by path and it will be wired up automatically
// eg: discourse/connectors/<OUTLET NAME>/<CONNECTOR NAME>
export function extraConnectorClass(name, obj) {
  _extraConnectorClasses[name] = obj;
}

const OUTLET_REGEX =
  /^discourse(\/[^\/]+)*?(?<template>\/templates)?\/connectors\/(?<outlet>[^\/]+)\/(?<name>[^\/\.]+)$/;

function findOutlets(keys, callback) {
<<<<<<< HEAD
  return keys.forEach((res) => {
    const match = res.match(OUTLET_REGEX);
    if (match) {
      callback({
        outletName: match.groups.outlet,
        connectorName: match.groups.name,
        moduleName: res,
        isTemplate: !!match.groups.template,
      });
=======
  keys.forEach(function (res) {
    const segments = res.split("/");
    if (segments.includes("connectors")) {
      const outletName = segments[segments.length - 2];
      const uniqueName = segments[segments.length - 1];

      callback(outletName, res, uniqueName);
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
    }
  });
}

export function clearCache() {
  _connectorCache = null;
  _rawConnectorCache = null;
}

<<<<<<< HEAD
/**
 * Sets component template, ignoring errors if it's already set to the same template
 */
function safeSetComponentTemplate(template, component) {
  try {
    setComponentTemplate(template, component);
  } catch (e) {
    if (getComponentTemplate(component) !== template) {
      throw e;
    }
  }
}

/**
 * Clear the cache of connectors. Should only be used in tests when
 * `requirejs.entries` is changed.
 */
export function expireConnectorCache() {
  _connectorCache = null;
}

class ConnectorInfo {
  #componentClass;
  #templateOnly;

  constructor(outletName, connectorName) {
    this.outletName = outletName;
    this.connectorName = connectorName;
=======
function findClass(outletName, uniqueName) {
  if (!_classPaths) {
    _classPaths = {};
    findOutlets(Object.keys(require._eak_seen), (outlet, res, un) => {
      const possibleConnectorClass = requirejs(res).default;
      if (possibleConnectorClass.__id) {
        // This is the template, not the connector class
        return;
      }
      _classPaths[`${outlet}/${un}`] = possibleConnectorClass;
    });
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
  }

  get componentClass() {
    return (this.#componentClass ??= this.#buildComponentClass());
  }

  get templateOnly() {
    return (this.#templateOnly ??= this.#buildTemplateOnlyClass());
  }

  get classicClassNames() {
    return `${this.outletName}-outlet ${this.connectorName}`;
  }

  get connectorClass() {
    if (this.classModule) {
      return require(this.classModule).default;
    } else {
      return _extraConnectorClasses[`${this.outletName}/${this.connectorName}`];
    }
  }

  get template() {
    if (this.templateModule) {
      return require(this.templateModule).default;
    }
  }

  get humanReadableName() {
    return `${this.outletName}/${this.connectorName} (${
      this.classModule || this.templateModule
    })`;
  }

  #buildComponentClass() {
    const klass = this.connectorClass;
    if (klass && hasInternalComponentManager(klass)) {
      if (this.template) {
        safeSetComponentTemplate(this.template, klass);
      }
      this.#warnUnusableHooks();
      return klass;
    } else {
      return false;
    }
  }

  #buildTemplateOnlyClass() {
    const component = templateOnly();
    setComponentTemplate(this.template, component);
    this.#warnUnusableHooks();
    return component;
  }

  #warnUnusableHooks() {
    for (const methodName of [
      "actions",
      "setupComponent",
      "teardownComponent",
    ]) {
      if (this.connectorClass?.[methodName]) {
        deprecated(
          `actions, setupComponent and teardownComponent hooks cannot be used with Glimmer plugin outlets. Define a component class instead. (${this.outletName}/${this.connectorName}).`,
          { id: "discourse.plugin-outlet-classic-hooks" }
        );
      }
    }
  }
}

/**
 * Clear the cache of connectors. Should only be used in tests when
 * `requirejs.entries` is changed.
 */
export function expireConnectorCache() {
  _connectorCache = null;
}

function buildConnectorCache() {
  _connectorCache = {};

<<<<<<< HEAD
  const outletsByModuleName = {};
  findOutlets(
    Object.keys(require.entries),
    ({ outletName, connectorName, moduleName, isTemplate }) => {
      let key = isTemplate
        ? moduleName.replace("/templates/", "/")
        : moduleName;

      let info = (outletsByModuleName[key] ??= new ConnectorInfo(
        outletName,
        connectorName
      ));

      if (isTemplate) {
        info.templateModule = moduleName;
      } else {
        info.classModule = moduleName;
      }
    }
  );

  for (const info of Object.values(outletsByModuleName)) {
    _connectorCache[info.outletName] ??= [];
    _connectorCache[info.outletName].push(info);
  }
}

export function connectorsExist(outletName) {
  if (!_connectorCache) {
    buildConnectorCache();
  }
  return Boolean(_connectorCache[outletName]);
=======
  findOutlets(
    DiscourseTemplateMap.keys(),
    (outletName, resource, uniqueName) => {
      _connectorCache[outletName] = _connectorCache[outletName] || [];

      _connectorCache[outletName].push({
        outletName,
        templateName: resource,
        template: require(DiscourseTemplateMap.resolve(resource)).default,
        classNames: `${outletName}-outlet ${uniqueName}`,
        connectorClass: findClass(outletName, uniqueName),
      });
    }
  );
>>>>>>> 887f49d048 (Fix merge conflicts to sync to the main upstream)
}

export function connectorsFor(outletName) {
  if (!_connectorCache) {
    buildConnectorCache();
  }
  return _connectorCache[outletName] || [];
}

export function renderedConnectorsFor(outletName, args, context) {
  return connectorsFor(outletName).filter((con) => {
    const shouldRender = con.connectorClass?.shouldRender;
    return !shouldRender || shouldRender(args, context);
  });
}

export function rawConnectorsFor(outletName) {
  if (!_rawConnectorCache) {
    _rawConnectorCache = buildRawConnectorCache();
  }
  return _rawConnectorCache[outletName] || [];
}

export function buildArgsWithDeprecations(args, deprecatedArgs) {
  const output = {};

  Object.keys(args).forEach((key) => {
    Object.defineProperty(output, key, { value: args[key] });
  });

  Object.keys(deprecatedArgs).forEach((key) => {
    Object.defineProperty(output, key, {
      get() {
        deprecated(`${key} is deprecated`, {
          id: "discourse.plugin-connector.deprecated-arg",
        });

        return deprecatedArgs[key];
      },
    });
  });

  return output;
}
