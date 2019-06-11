import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  url,
  apply,
  applyTemplates,
  move,
  mergeWith,
  forEach,
  FileEntry,
  SchematicsException
} from "@angular-devkit/schematics";
import * as ts from "typescript";
import { getWorkspace } from "@schematics/angular/utility/config";
import { getAppModulePath } from "@schematics/angular/utility/ng-ast-utils";
import {
  addImportToModule,
  insertImport,
  isImported,
  addProviderToModule
} from "@schematics/angular/utility/ast-utils";
import { Change, InsertChange } from "@schematics/angular/utility/change";
import {
  WorkspaceProject,
  WorkspaceSchema
} from "@angular-devkit/core/src/workspace";
import { normalize } from "@angular-devkit/core";
import { NodePackageInstallTask } from "@angular-devkit/schematics/tasks";

const commonStyles = [
  "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
  "node_modules/ngx-toastr/toastr.css",
  "src/styles/styles.scss"
];

const uiStyles: any = {
  material: ["node_modules/narik-ui-material/styles/narik-ui-material.css"],
  devextreme: [
    "node_modules/devextreme/dist/css/dx.common.css",
    "node_modules/devextreme/dist/css/dx.light.css",
    "node_modules/narik-ui-devextreme/styles/narik-ui-devextreme.css"
  ],
  "ng-bootstrap": [
    "node_modules/@swimlane/ngx-datatable/release/index.css",
    "node_modules/@swimlane/ngx-datatable/release/themes/bootstrap.css",
    "node_modules/@swimlane/ngx-datatable/release/assets/icons.css",
    "node_modules/narik-ui-ng-bootstrap/styles/narik-ui-ng-bootstrap.css",
    "node_modules/narik-ui-swimlane/styles/narik-ui-swimlane.css"
  ],
  nebular: [
    "node_modules/@swimlane/ngx-datatable/release/index.css",
    "node_modules/@swimlane/ngx-datatable/release/themes/bootstrap.css",
    "node_modules/@swimlane/ngx-datatable/release/assets/icons.css",
    "node_modules/narik-ui-nebular/styles/narik-ui-nebular.css",
    "node_modules/narik-ui-swimlane/styles/narik-ui-swimlane.css"
  ],
  primeng: [
    "node_modules/primeng/resources/themes/nova-light/theme.css",
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/primeicons/primeicons.css",
    "node_modules/narik-ui-primeng/styles/narik-ui-prime.css"
  ]
};

const rtlUiStyles: any = {
  material: ["node_modules/narik-ui-material/styles/narik-ui-material.rtl.css"],
  devextreme: [
    "node_modules/narik-ui-devextreme/styles/narik-ui-devextreme.rtl.css"
  ],
  "ng-bootstrap": [
    "node_modules/narik-ui-ng-bootstrap/styles/narik-ui-ng-bootstrap.rtl.css",
    "node_modules/narik-ui-swimlane/styles/narik-ui-swimlane.rtl.css"
  ],
  nebular: [
    "node_modules/narik-ui-nebular/styles/narik-ui-nebular.rtl.css",
    "node_modules/narik-ui-swimlane/styles/narik-ui-swimlane.rtl.css"
  ],
  primeng: ["node_modules/narik-ui-primeng/styles/narik-ui-prime.rtl.css"]
};

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
    version: "2.0.0"
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
    name: "narik-infrastructure",
    version: "^2.0.0"
  },
  {
    name: "narik-common",
    version: "^2.0.0"
  },
  {
    name: "narik-core",
    version: "^2.0.0"
  },
  {
    name: "narik-app-core",
    version: "^2.0.1"
  },
  {
    name: "narik-ui-core",
    version: "^2.0.1"
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
      version: "^2.0.0"
    },
    {
      name: "@angular/material",
      version: "^8.0.0"
    }
  ],
  devextreme: [
    {
      name: "narik-ui-devextreme",
      version: "^2.0.0"
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
    { name: "narik-ui-ng-bootstrap", version: "^2.0.0" },
    { name: "narik-ui-swimlane", version: "^2.0.0" },
    { name: "@swimlane/ngx-datatable", version: "^15.0.2" },
    { name: "@ng-bootstrap/ng-bootstrap", version: "^4.2.1" }
  ],
  nebular: [
    { name: "narik-ui-nebular", version: "^2.0.0" },
    { name: "narik-ui-swimlane", version: "^2.0.0" },
    { name: "@swimlane/ngx-datatable", version: "^15.0.1" },
    { name: "@nebular/theme", version: "^4.0.0" }
  ],
  primeng: [
    { name: "primeng", version: "^8.0.0-rc.1" },
    { name: "primeicons", version: "^1.0.0" },
    { name: "narik-ui-primeng", version: "^2.0.0" }
  ]
};

export function ngAdd(_options: any): Rule {
  let ui = _options.ui
    ? _options.ui
    : (_options as any)["--"] && (_options as any)["--"][1];

  const rtl = _options.rtl === true;

  ui = ui || "material";
  return chain([
    addPackageJsonDependencies(ui, rtl),
    addStyles(ui, rtl),
    addCustomBuilder(),
    addExtraFiles(ui, rtl),
    updateTsConfig(ui),
    updateIndexhtml(ui, rtl),
    // addModuleImports(ui, rtl),
    // addModuleProvids(ui),
    // updateAppModule(),
    installPackageJsonDependencies()
  ]);
}

function updateAppModule(): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = workspace.projects[workspace.defaultProject!];
    const modulePath = getAppModulePath(host, getProjectMainFile(project));
    const sourceText = host.read(modulePath)!.toString("utf-8");

    const scanner: ts.Scanner = ts.createScanner(ts.ScriptTarget.Latest, false);

    scanner.setText(sourceText);

    let token = scanner.scan();

    const statements = [];
    let start = null;
    while (token !== ts.SyntaxKind.EndOfFileToken) {
      const potentialStart = scanner.getStartPos();
      switch (token) {
        case ts.SyntaxKind.ClassExpression: {
          start = potentialStart;
          token = scanner.scan();
          break;
        }
        case ts.SyntaxKind.StringLiteral: {
          if (start !== null) {
            token = scanner.scan();
            const end = scanner.getStartPos();
            statements.push(sourceText.substring(start, end));
            start = null;
          } else {
            token = scanner.scan();
          }
          break;
        }
        default: {
          token = scanner.scan();
        }
      }
    }

    console.log(sourceText);
    return host;
  };
}

function addPackageJsonDependencies(ui: string, rtl: boolean): Rule {
  return (host: Tree, context: SchematicContext) => {
    commonDependencies.forEach(dependency => {
      addPackageToPackageJson(host, dependency.name, `${dependency.version}`);
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
        true
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
  isDevdependencies: boolean = false
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
      }
    } else {
      if (!json.dependencies) {
        json.dependencies = {};
      }

      if (!json.dependencies[pkg]) {
        json.dependencies[pkg] = version;
        json.dependencies = sortObjectByKeys(json.dependencies);
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

function updateIndexhtml(ui: string, rtl: boolean) {
  return (host: Tree) => {
    if (host.exists("src/index.html")) {
      let sourceText = host.read("src/index.html")!.toString("utf-8");

      if (ui === "material") {
        if (
          sourceText.toLowerCase().indexOf("https://fonts.googleapis.com") < 0
        ) {
          const headPosition = sourceText.toLowerCase().indexOf("</head>");
          if (headPosition >= 0) {
            sourceText = sourceText.replace(
              "</head>",
              '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></head>'
            );
          }
        }
      }

      if (rtl && sourceText.toLowerCase().indexOf(`dir="rtl"`) < 0) {
        if (ui === "primeng") {
          sourceText = sourceText.replace(
            "<html ",
            '<html  class="ui-rtl" dir="rtl" '
          );
        } else {
          sourceText = sourceText.replace("<html ", '<html dir="rtl" ');
        }
      }

      host.overwrite("src/index.html", sourceText);
    }

    return host;
  };
}

function updateTsConfig(ui: string) {
  const pathItems: any = {
    material: {
      "narik-ui-lib": ["node_modules/narik-ui-material"],
      "narik-ui-lib/*": ["node_modules/narik-ui-material/*"]
    },
    devextreme: {
      "narik-ui-lib": ["node_modules/narik-ui-devextreme"],
      "narik-ui-lib/*": ["node_modules/narik-ui-devextreme/*"]
    },
    "ng-bootstrap": {
      "narik-ui-lib": ["node_modules/narik-ui-ng-bootstrap"],
      "narik-ui-lib/*": ["node_modules/narik-ui-ng-bootstrap/*"]
    },
    nebular: {
      "narik-ui-lib": ["node_modules/narik-ui-nebular"],
      "narik-ui-lib/*": ["node_modules/narik-ui-nebular/*"]
    },
    primeng: {
      "narik-ui-lib": ["node_modules/narik-ui-primeng"],
      "narik-ui-lib/*": ["node_modules/narik-ui-primeng/*"]
    }
  };

  return (host: Tree) => {
    if (host.exists("tsconfig.json")) {
      const sourceText = host.read("tsconfig.json")!.toString("utf-8");
      const json = JSON.parse(sourceText);

      if (!json.compilerOptions.paths) {
        json.compilerOptions.paths = {};
      }

      const pathItem = pathItems[ui];
      if (pathItem) {
        for (const key in pathItem) {
          if (pathItem.hasOwnProperty(key)) {
            json.compilerOptions.paths[key] = pathItem[key];
          }
        }
      }
      host.overwrite("tsconfig.json", JSON.stringify(json, null, 2));
    }

    return host;
  };
}

function addModuleProvids(ui: string) {
  const provids: any[] = [
    {
      key: `{provide: MODULE_DATA_KEY,useValue: moduleKey}`,
      link: undefined
    },
    {
      key: `{
        provide: MODULE_UI_KEY,
        useValue: moduleKey
      }`,
      link: undefined
    },
    {
      key: `{
        provide: MEMORY_STORAGE_VALIDITY_LEN,
        useValue: 1
      }`,
      link: undefined
    },
    {
      key: ` {
        provide: FORM_ITEM_DEFAULT_CLASS,
        useValue: "item-full-width"
      }`,
      link: undefined,
      uiKey: "material"
    }
  ];

  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = workspace.projects[workspace.defaultProject!];
    const modulePath = getAppModulePath(host, getProjectMainFile(project));
    const moduleSource = getSourceFile(host, modulePath);

    for (const provide of provids) {
      if (provide.uiKey && provide.uiKey !== ui) {
        continue;
      }
      const changes = addProviderToModule(
        moduleSource,
        modulePath,
        provide.key,
        provide.link
      );

      const recorder = host.beginUpdate(modulePath);

      changes.forEach((change: Change) => {
        if (change instanceof InsertChange) {
          recorder.insertLeft(change.pos, change.toAdd);
        }
      });

      host.commitUpdate(recorder);
    }

    return host;
  };
}

function addModuleImports(ui: string, rtl: boolean) {
  const modules: any[] = [
    {
      moduleName:
        "TranslateModule.forRoot({loader: {provide: TranslateLoader,useFactory: HttpLoaderFactory,deps: [HttpClient, ConfigService]}})",
      link: `@ngx-translate/core`
    },
    {
      moduleName:
        'NbThemeModule.forRoot({name: "default" },undefined,undefined,NbLayoutDirection.LTR)',
      link: `@nebular/theme`
    },
    {
      moduleName: "HttpClientModule",
      link: `@angular/common/http`
    },
    {
      moduleName: `NarikCoreModule.forRoot({configFilePath: "assets/app-config.json",defaultLang: "en",useDefaultLang: true})`,
      link: `narik-core`
    },
    {
      moduleName: "NarikUiCoreModule",
      link: `narik-ui-core`
    },
    {
      moduleName: "NarikAppCoreModule.forRoot({})",
      link: `narik-app-core`
    },
    {
      moduleName:
        'NarikJwtAuthenticationModule.forRoot({loginEndPoint: "api/account/Authenticate",logoutEndPoint: "api/account/Logout",refreshEndPoint: "api/account/Authenticate",tokenStorage: "localStorage",loginPageUrl: "/"})',
      link: `narik-jwt-authentication`
    },
    {
      moduleName: "NarikClientStorageModule.forRoot()",
      link: `narik-client-storage`
    }
  ];

  const otherImports: any[] = [
    {
      name: "TranslateLoader",
      link: `@ngx-translate/core`
    },
    {
      name: "HttpClient",
      link: `@angular/common/http`
    },
    {
      name: "NbLayoutDirection",
      link: `@nebular/theme`
    },
    {
      name: "FORM_ITEM_DEFAULT_CLASS",
      link: `narik-ui-material`,
      uiKey: "material"
    },
    {
      name: "Observable",
      link: `rxjs/internal/Observable`
    },
    {
      name: "ConfigService,MODULE_DATA_KEY,MODULE_UI_KEY,ModuleInfo",
      link: "narik-infrastructure"
    },
    {
      name: `NarikTranslateLoader,MEMORY_STORAGE_VALIDITY_LEN,NarikModule`,
      link: "narik-core"
    }
  ];

  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = workspace.projects[workspace.defaultProject!];
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    for (const module of modules) {
      if (module.uiKey && module.uiKey !== ui) {
        continue;
      }
      if (rtl) {
        module.moduleName = module.moduleName.replace("LTR", "RTL");
      }
      if (hasNgModuleImport(host, appModulePath, module.moduleName)) {
        continue;
      }

      addModuleImportToRootModule(
        host,
        `${module.moduleName}`,
        module.link,
        project,
        true
      );
    }
    for (const importItem0 of otherImports) {
      if (importItem0.uiKey && importItem0.uiKey !== ui) {
        continue;
      }
      for (let importItem of importItem0.name.split(",")) {
        importItem = importItem.trim();
        addModuleImportToRootModule(
          host,
          `${importItem}`,
          importItem0.link,
          project,
          false
        );
      }
    }

    return host;
  };
}

export function addModuleImportToRootModule(
  host: Tree,
  moduleName: string,
  src: string,
  project: WorkspaceProject,
  isModuleImport: boolean = true
) {
  const modulePath = getAppModulePath(host, getProjectMainFile(project));
  addModuleImportToModule(host, modulePath, moduleName, src, isModuleImport);
}

export function addModuleImportToModule(
  host: Tree,
  modulePath: string,
  moduleName: string,
  src: string,
  isModuleImport: boolean = true
) {
  const moduleSource = getSourceFile(host, modulePath);

  if (!moduleSource) {
    throw new SchematicsException(`Module not found: ${modulePath}`);
  }
  let changes: Change[] = [];

  if (isModuleImport) {
    changes = addImportToModule(moduleSource, modulePath, moduleName, src);
  } else {
    if (!isImported(moduleSource, moduleName, src)) {
      const changeItem = insertImport(
        moduleSource,
        modulePath,
        moduleName,
        src
      );
      changes.push(changeItem);
    }
  }

  const recorder = host.beginUpdate(modulePath);

  changes.forEach((change: Change) => {
    if (change instanceof InsertChange) {
      recorder.insertLeft(change.pos, change.toAdd);
    }
  });

  host.commitUpdate(recorder);
}

export function getSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not find file for path: ${path}`);
  }
  const content = buffer.toString();

  return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}

function resolveIdentifierOfExpression(
  expression: ts.Expression
): ts.Identifier | null {
  if (ts.isIdentifier(expression)) {
    return expression;
  } else if (ts.isPropertyAccessExpression(expression)) {
    return resolveIdentifierOfExpression(expression.expression);
  }

  return null;
}

function isNgModuleCallExpression(callExpression: ts.CallExpression): boolean {
  if (
    !callExpression.arguments.length ||
    !ts.isObjectLiteralExpression(callExpression.arguments[0])
  ) {
    return false;
  }

  const decoratorIdentifier = resolveIdentifierOfExpression(
    callExpression.expression
  );

  return decoratorIdentifier ? decoratorIdentifier.text === "NgModule" : false;
}

export function hasNgModuleImport(
  tree: Tree,
  modulePath: string,
  className: string
): boolean {
  const moduleFileContent = tree.read(modulePath);

  if (!moduleFileContent) {
    throw new Error(`Could not read Angular module file: ${modulePath}`);
  }

  const parsedFile = ts.createSourceFile(
    modulePath,
    moduleFileContent.toString(),
    ts.ScriptTarget.Latest,
    true
  );
  let ngModuleMetadata: ts.ObjectLiteralExpression | null = null;

  const findModuleDecorator = (node: ts.Node) => {
    if (
      ts.isDecorator(node) &&
      ts.isCallExpression(node.expression) &&
      isNgModuleCallExpression(node.expression)
    ) {
      ngModuleMetadata = node.expression
        .arguments[0] as ts.ObjectLiteralExpression;

      return;
    }

    ts.forEachChild(node, findModuleDecorator);
  };

  ts.forEachChild(parsedFile, findModuleDecorator);

  if (!ngModuleMetadata) {
    throw new Error(
      `Could not find NgModule declaration inside: "${modulePath}"`
    );
  }

  /* tslint:disable-next-line: no-non-null-assertion */
  for (const property of ngModuleMetadata!.properties) {
    if (
      !ts.isPropertyAssignment(property) ||
      property.name.getText() !== "imports" ||
      !ts.isArrayLiteralExpression(property.initializer)
    ) {
      continue;
    }

    /* tslint:disable-next-line: no-any */
    if (
      property.initializer.elements.some(
        (element: any) => element.getText() === className
      )
    ) {
      return true;
    }
  }

  return false;
}

export function getProjectMainFile(project: WorkspaceProject): string {
  const buildOptions = getProjectTargetOptions(project, "build");

  if (!buildOptions.main) {
    throw new SchematicsException(
      `Could not find the project main file inside of the ` +
        `workspace config (${project.sourceRoot})`
    );
  }

  return buildOptions.main;
}

export function addStyles(
  ui: string,
  rtl: boolean
): (host: Tree, context: SchematicContext) => Tree {
  return function(host: Tree, context: SchematicContext): Tree {
    const workspace = getWorkspace(host);
    const project = workspace.projects[workspace.defaultProject!];
    let assets: string[] = [];
    if (!rtl || ui !== "ng-bootstrap") {
      assets.push("node_modules/bootstrap/dist/css/bootstrap.css");
    } else {
      assets.push("node_modules/bootstrap-4.1.3-rtl/css/bootstrap.css");
    }
    assets = assets.concat(commonStyles);

    if (uiStyles[ui]) {
      assets = assets.concat(uiStyles[ui] as string[]);
    }
    if (rtl) {
      if (rtlUiStyles[ui]) {
        assets = assets.concat(rtlUiStyles[ui] as string[]);
      }
    }
    context.logger.log("info", `🔍 Adding styles...`);
    addStyleToTarget(project, "build", host, assets, workspace);
    addStyleToTarget(project, "test", host, assets, workspace);
    context.logger.log("info", `🔍 Added styles...`);
    return host;
  };
}

export function addExtraFiles(
  ui: string,
  rtl: boolean
): (host: Tree, context: SchematicContext) => Rule {
  return function(host: Tree, context: SchematicContext): Rule {
    context.logger.log("info", `🔍 Adding  extra...`);
    const templateSource = apply(url("./files"), [
      applyTemplates({
        direction: rtl ? "RTL" : "LTR",
        ui: ui
      }),
      forEach((fileEntry: FileEntry) => {
        if (fileEntry.path.indexOf("@") >= 0) {
          if (fileEntry.path.indexOf(`@${ui}@`) < 0) {
            return null;
          } else {
            const newFilePath = fileEntry.path.replace(`@${ui}@`, "");
            if (host.exists(newFilePath)) {
              host.delete(newFilePath);
            }
            return {
              path: newFilePath,
              content: fileEntry.content
            } as any;
          }
        }
        if (host.exists(fileEntry.path)) {
          host.delete(fileEntry.path);
        }
        return fileEntry;
      }),
      move(normalize(""))
    ]);

    context.logger.log("info", `🔍 Added  extra...`);
    return chain([mergeWith(templateSource)]);
  };
}

export function addCustomBuilder(): (
  host: Tree,
  context: SchematicContext
) => Tree {
  return function(host: Tree, context: SchematicContext): Tree {
    const workspace = getWorkspace(host);
    const project = workspace.projects[workspace.defaultProject!];
    const buildTargetOptions = getProjectTarget(project, "build");

    buildTargetOptions.builder = "@angular-builders/custom-webpack:browser";

    buildTargetOptions.options.customWebpackConfig = {
      path: "./extra-webpack.config.js",
      mergeStrategies: {
        module: "prepend",
        "module.rules": "prepend",
        plugins: "prepend"
      }
    };

    const serveTargetOptions = getProjectTarget(project, "serve");
    serveTargetOptions.builder = "@angular-builders/custom-webpack:dev-server";
    serveTargetOptions.options = serveTargetOptions.options || {};
    serveTargetOptions.options.proxyConfig = "proxy.config.json";

    context.logger.log("info", `🔍 Adding custom builder...`);

    host.overwrite("angular.json", JSON.stringify(workspace, null, 2));

    return host;
  };
}

export function getProjectTarget(
  project: WorkspaceProject,
  buildTarget: string
) {
  const targetConfig =
    (project.architect && project.architect[buildTarget]) ||
    (project.targets && project.targets[buildTarget]);

  if (targetConfig) {
    return targetConfig;
  }

  throw new Error(
    `Cannot determine project target configuration for: ${buildTarget}.`
  );
}

export function getProjectTargetOptions(
  project: WorkspaceProject,
  buildTarget: string
) {
  const targetConfig =
    (project.architect && project.architect[buildTarget]) ||
    (project.targets && project.targets[buildTarget]);

  if (targetConfig && targetConfig.options) {
    return targetConfig.options;
  }

  throw new Error(
    `Cannot determine project target configuration for: ${buildTarget}.`
  );
}

export function addStyleToTarget(
  project: WorkspaceProject,
  targetName: string,
  host: Tree,
  assetPaths: string[],
  workspace: WorkspaceSchema
) {
  const targetOptions = getProjectTargetOptions(project, targetName);

  for (const assetPath of assetPaths) {
    if (!targetOptions.styles) {
      targetOptions.styles = [assetPath];
    } else {
      const existingStyles = targetOptions.styles.map(
        (style: string | { input: string }) => {
          return typeof style === "string" ? style : style.input;
        }
      );

      const hasStyle = existingStyles.find((style: string) => {
        return style.includes(assetPath);
      });

      if (!hasStyle) {
        targetOptions.styles.push(assetPath);
      }
    }
  }

  host.overwrite("angular.json", JSON.stringify(workspace, null, 2));
}
