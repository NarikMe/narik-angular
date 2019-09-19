import {
  Rule,
  SchematicContext,
  Tree,
  chain
} from "@angular-devkit/schematics";

import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

const devDependencies: any[] = [
  {
    name: "@angular-builders/custom-webpack",
    version: "^8.0.2"
  },
  {
    name: "cheerio",
    version: "^1.0.0-rc.3"
  },
  {
    name: "narik-webpack-tools",
    version: "2.0.1"
  }
];
const commonDependencies: any[] = [
  {
    name: "@fortawesome/fontawesome-free",
    version: "^5.9.0"
  },
  {
    name: "@angular/cdk",
    version: "^8.0.0"
  },
  {
    name: "@nebular/theme",
    version: "^4.0.0"
  },
  {
    name: "eva-icons",
    version: "^1.1.1"
  },
  {
    name: "@nebular/eva-icons",
    version: "^4.0.0"
  },
  {
    name: "@ngx-translate/core",
    version: "^11.0.1"
  },
  {
    name: "angular2-text-mask",
    version: "^9.0.0"
  },
  {
    name: "@angular/flex-layout",
    version: "^8.0.0-beta.26"
  },
  {
    name: "angular2-uuid",
    version: "^1.1.1"
  },
  {
    name: "bootstrap",
    version: "^4.3.1"
  },
  {
    name: "localforage",
    version: "^1.7.3"
  },
  {
    name: "lodash",
    version: "^4.17.11"
  },
  {
    name: "ngforage",
    version: "^4.0.3"
  },
  {
    name: "ngx-toastr",
    version: "^10.0.4"
  },
  {
    name: "ngx-custom-validators",
    version: "^8.0.0"
  },
  {
    name: "narik-infrastructure",
    version: "^2.0.2"
  },
  {
    name: "narik-common",
    version: "^2.0.1"
  },
  {
    name: "narik-core",
    version: "^2.0.1"
  },
  {
    name: "narik-app-core",
    version: "^2.0.2"
  },
  {
    name: "narik-ui-core",
    version: "^2.0.2"
  },
  {
    name: "narik-jwt-authentication",
    version: "^2.0.0"
  },
  {
    name: "narik-client-storage",
    version: "^2.0.0"
  }
];

const rtlUiDependency: any = {
  "ng-bootstrap": [{ name: "bootstrap-4.1.3-rtl", version: "^1.0.1" }]
};

const uiDependency: any = {
  material: [
    {
      name: "narik-ui-material",
      version: "^2.0.2"
    },
    {
      name: "@angular/material",
      version: "^8.0.0"
    }
  ],
  devextreme: [
    {
      name: "narik-ui-devextreme",
      version: "^2.0.2"
    },
    {
      name: "devextreme",
      version: "^19.1.3"
    },
    {
      name: "devextreme-angular",
      version: "^19.1.3"
    },
    {
      name: "stream",
      version: "0.0.2"
    }
  ],
  "ng-bootstrap": [
    { name: "narik-ui-ng-bootstrap", version: "^2.0.2" },
    { name: "narik-ui-swimlane", version: "^2.0.0" },
    { name: "@swimlane/ngx-datatable", version: "^15.0.2" },
    { name: "@ng-bootstrap/ng-bootstrap", version: "^4.2.1" }
  ],
  nebular: [
    { name: "narik-ui-nebular", version: "^2.0.3" },
    { name: "narik-ui-swimlane", version: "^2.0.0" },
    { name: "@swimlane/ngx-datatable", version: "^15.0.1" },
    { name: "@nebular/theme", version: "^4.0.0" },
    { name: "@nebular/date-fns", version: "^4.0.0" },
    { name: "date-fns", version: "^1.30.1" }
  ],
  primeng: [
    { name: "primeng", version: "^8.0.0-rc.1" },
    { name: "primeicons", version: "^1.0.0" },
    { name: "narik-ui-primeng", version: "^2.0.2" }
  ]
};

export function ngUpdate(_options: any): Rule {
  let ui = "";
  const rtl = false;
  ui = ui || "material";
  return chain([
    addPackageJsonDependencies(ui, rtl),
    installPackageJsonDependencies()
  ]);
}

function addPackageJsonDependencies(ui: string, rtl: boolean): Rule {
  return (host: Tree, context: SchematicContext) => {
    commonDependencies.forEach(dependency => {
      addPackageToPackageJson(
        host,
        dependency.name,
        `${dependency.version}`,
        false,
        false
      );
      context.logger.log("info", `✅️ Added "${dependency.name}`);
    });

    if (uiDependency[ui]) {
      for (const dependency of uiDependency[ui]) {
        addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
        context.logger.log("info", `✅️ Added "${dependency.name}`);
      }
    }

    if (rtl && rtlUiDependency[ui]) {
      for (const dependency of rtlUiDependency[ui]) {
        addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
        context.logger.log("info", `✅️ Added "${dependency.name}`);
      }
    }

    devDependencies.forEach(dependency => {
      addPackageToPackageJson(
        host,
        dependency.name,
        `${dependency.version}`,
        true,
        false
      );
      context.logger.log("info", `✅️ Added "${dependency.name}`);
    });

    return host;
  };
}

export function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log("info", `🔍 Installing packages...`);

    return host;
  };
}

export function addPackageToPackageJson(
  host: Tree,
  pkg: string,
  version: string,
  isDevdependencies: boolean = false,
  onlyUpdateIfExists = true
): Tree {
  if (host.exists("package.json")) {
    /* tslint:disable-next-line: no-non-null-assertion */
    const sourceText = host.read("package.json")!.toString("utf-8");
    const json = JSON.parse(sourceText);

    if (isDevdependencies) {
      if (!json.devDependencies) {
        json.devDependencies = {};
      }

      if (!json.devDependencies[pkg]) {
        json.devDependencies[pkg] = version;
        json.devDependencies = sortObjectByKeys(json.devDependencies);
      } else {
        if (!onlyUpdateIfExists) {
          json.devDependencies[pkg] = version;
        }
      }
    } else {
      if (!json.dependencies) {
        json.dependencies = {};
      }

      if (!json.dependencies[pkg]) {
        json.dependencies[pkg] = version;
        json.dependencies = sortObjectByKeys(json.dependencies);
      } else {
        if (!onlyUpdateIfExists) {
          json.dependencies[pkg] = version;
        }
      }
    }

    host.overwrite("package.json", JSON.stringify(json, null, 2));
  }

  return host;
}

function sortObjectByKeys(obj: { [key: string]: string }) {
  return (
    Object.keys(obj)
      .sort()
      /* tslint:disable-next-line: no-any */
      .reduce((result: any, key: any) => (result[key] = obj[key]) && result, {})
  );
}
