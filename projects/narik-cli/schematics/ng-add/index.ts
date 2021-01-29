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
    SchematicsException,
} from '@angular-devkit/schematics';

import { workspaces, JsonArray } from '@angular-devkit/core';

import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { virtualFs } from '@angular-devkit/core';
import { Schema as AddSchema } from './schema';
import {
    getWorkspace,
    updateWorkspace,
} from '@schematics/angular/utility/workspace';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
    addImportToModule,
    insertImport,
    isImported,
    addProviderToModule,
} from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';

import {
    WorkspaceProject,
    WorkspaceSchema,
} from '@schematics/angular/utility/workspace-models';

import { normalize } from '@angular-devkit/core';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

const layoutStyles: any = {
    ngxadmin: [
        'node_modules/roboto-fontface/css/roboto/roboto-fontface.css',
        'node_modules/typeface-exo/index.css',
    ],
    architectui: [],
    coreui: ['node_modules/@coreui/icons/css/free.css'],
};
const commonStyles = [
    '~@fortawesome/fontawesome-free/css/all.min.css',
    '~ngx-toastr/toastr-bs4-alert',
    './styles/styles.scss',
];

const uiStyles: any = {
    material: ['node_modules/@narik/ui-material/styles/narik-ui-material.css'],
    devextreme: [
        'node_modules/devextreme/dist/css/dx.common.css',
        'node_modules/devextreme/dist/css/dx.light.css',
        'node_modules/@narik/ui-devextreme/styles/narik-ui-devextreme.css',
    ],
    'ng-bootstrap': [
        'node_modules/@swimlane/ngx-datatable/index.css',
        'node_modules/@swimlane/ngx-datatable/themes/bootstrap.css',
        'node_modules/@swimlane/ngx-datatable/assets/icons.css',
        'node_modules/@narik/ui-ng-bootstrap/styles/narik-ui-ng-bootstrap.css',
        'node_modules/@narik/ui-swimlane/styles/narik-ui-swimlane.css',
    ],
    nebular: [
        'node_modules/@swimlane/ngx-datatable/index.css',
        'node_modules/@swimlane/ngx-datatable/themes/bootstrap.css',
        'node_modules/@swimlane/ngx-datatable/assets/icons.css',
        'node_modules/@narik/ui-nebular/styles/narik-ui-nebular.css',
        'node_modules/@narik/ui-swimlane/styles/narik-ui-swimlane.css',
    ],
    primeng: [
        'node_modules/primeng/resources/themes/nova/theme.css',
        'node_modules/primeng/resources/primeng.min.css',
        'node_modules/primeicons/primeicons.css',
        'node_modules/@narik/ui-primeng/styles/narik-ui-prime.css',
    ],
};

const rtlUiStyles: any = {
    material: [
        'node_modules/@narik/ui-material/styles/narik-ui-material.rtl.css',
    ],
    devextreme: [
        'node_modules/@narik/ui-devextreme/styles/narik-ui-devextreme.rtl.css',
    ],
    'ng-bootstrap': [
        'node_modules/@narik/ui-ng-bootstrap/styles/narik-ui-ng-bootstrap.rtl.css',
        'node_modules/@narik/ui-swimlane/styles/narik-ui-swimlane.rtl.css',
    ],
    nebular: [
        'node_modules/@narik/ui-nebular/styles/narik-ui-nebular.rtl.css',
        'node_modules/@narik/ui-swimlane/styles/narik-ui-swimlane.rtl.css',
    ],
    primeng: ['node_modules/@narik/ui-primeng/styles/narik-ui-prime.rtl.css'],
};

const devDependencies: any[] = [
    {
        name: '@angular-builders/custom-webpack',
        version: '^11.0.0',
    },
    {
        name: 'cheerio',
        version: '~1.0.0-rc.3',
    },
    {
        name: '@narik/webpack-tools',
        version: '^4.1.0',
    },
];
const commonDependencies: any[] = [
    {
        name: '@fortawesome/fontawesome-free',
        version: '^5.15.0',
    },
    {
        name: '@angular/cdk',
        version: '^11.0.0',
    },

    {
        name: '@ngx-translate/core',
        version: '^13.0.0',
    },
    {
        name: 'angular2-text-mask',
        version: '^9.0.0',
    },
    {
        name: '@angular/flex-layout',
        version: '^11.0.0-beta.33',
    },
    {
        name: 'angular2-uuid',
        version: '^1.1.1',
    },
    {
        name: 'bootstrap',
        version: '^4.5.0',
    },
    {
        name: 'localforage',
        version: '^1.9.0',
    },
    {
        name: 'lodash',
        version: '^4.17.20',
    },
    {
        name: 'ngforage',
        version: '^6.0.0',
    },
    {
        name: 'ngx-toastr',
        version: '^13.0.0',
    },
    {
        name: 'ngx-custom-validators',
        version: '^10.0.0',
    },
    {
        name: 'class-validator',
        version: '^0.12.2',
    },
    {
        name: 'data-adapter',
        version: '^0.2.3',
    },
    {
        name: '@narik/infrastructure',
        version: '^5.1.0',
    },
    {
        name: '@narik/common',
        version: '^5.1.0',
    },
    {
        name: '@narik/core',
        version: '^5.1.0',
    },
    {
        name: '@narik/app-core',
        version: '^5.1.0',
    },
    {
        name: '@narik/ui-core',
        version: '^5.1.0',
    },
    {
        name: '@narik/jwt-authentication',
        version: '^5.1.0',
    },
    {
        name: '@narik/client-storage',
        version: '^5.1.0',
    },
];

const rtlUiDependency: any = {
    'ng-bootstrap': [{ name: 'bootstrap-v4-rtl', version: '^4.5.2-1' }],
};
const layoutDependency: any = {
    ngxadmin: [
        {
            name: '@nebular/theme',
            version: '^7.0.0',
        },
        {
            name: 'eva-icons',
            version: '^1.1.3',
        },
        {
            name: '@nebular/eva-icons',
            version: '^7.0.0',
        },
        {
            name: 'roboto-fontface',
            version: '^0.10.0',
        },
        {
            name: 'typeface-exo',
            version: '^1.1.13',
        },
    ],
    architectui: [
        { name: '@ng-bootstrap/ng-bootstrap', version: '^8.0.0' },
        {
            name: 'ngx-perfect-scrollbar',
            version: '^10.0.0',
        },
        {
            name: '@ngx-loading-bar/core',
            version: '^5.1.0',
        },
        {
            name: '@ngx-loading-bar/router',
            version: '^5.1.0',
        },
        {
            name: 'redux',
            version: '4.0.5',
        },
        {
            name: 'angular-font-awesome',
            version: '^3.1.2',
        },
        {
            name: 'animate-sass',
            version: '^0.8.2',
        },
        {
            name: 'pe7-icon',
            version: '^1.0.4',
        },
        {
            name: '@angular-redux/store',
            version: '^10.0.0',
        },
    ],
    coreui: [
        {
            name: '@coreui/angular',
            version: '^2.9.0',
        },
        {
            name: '@coreui/coreui',
            version: '^2.1.16',
        },
        {
            name: '@coreui/icons',
            version: '^1.0.1',
        },
        {
            name: 'ngx-perfect-scrollbar',
            version: '^9.0.0',
        },
        {
            name: 'ngx-bootstrap',
            version: '^6.1.0',
        },
    ],
};
const uiDependency: any = {
    material: [
        {
            name: '@narik/ui-material',
            version: '^5.1.0',
        },
        {
            name: '@angular/material',
            version: '^11.0.0',
        },
    ],
    devextreme: [
        {
            name: '@narik/ui-devextreme',
            version: '^5.1.0',
        },
        {
            name: 'devextreme',
            version: '^20.2.4',
        },
        {
            name: 'devextreme-angular',
            version: '^20.2.4',
        },
        {
            name: 'stream',
            version: '0.0.2',
        },
    ],
    'ng-bootstrap': [
        { name: '@narik/ui-ng-bootstrap', version: '^5.1.0' },
        { name: '@narik/ui-swimlane', version: '^5.1.0' },
        { name: '@swimlane/ngx-datatable', version: '^18.0.0' },
        { name: '@ng-bootstrap/ng-bootstrap', version: '^8.0.0' },
        { name: '@angular/localize', version: '^11.0.0' },
    ],
    nebular: [
        { name: '@narik/ui-nebular', version: '^5.1.0' },
        { name: '@narik/ui-swimlane', version: '^5.1.0' },
        { name: '@swimlane/ngx-datatable', version: '^18.0.0' },
        { name: '@nebular/theme', version: '^7.0.0' },
        { name: '@nebular/date-fns', version: '^7.0.0' },
        { name: 'date-fns', version: '^2.16.0' },
    ],
    primeng: [
        { name: 'primeng', version: '^10.0.3' },
        { name: 'primeicons', version: '^4.0.0' },
        { name: '@narik/ui-primeng', version: '^5.1.0' },
    ],
};

export function ngAdd(_options: AddSchema): Rule {
    const rtl = _options.rtl === true;
    const ui = _options.ui || 'material';
    const layout = _options.layout || 'ngxadmin';

    return chain([
        addPackageJsonDependencies(ui, rtl, layout),
        addStyles(ui, rtl, layout),
        addCustomBuilder(),
        addExtraFiles(ui, rtl, layout),
        updateTsConfig(ui),
        updateIndexHtml(ui, rtl),
        addLocalization(ui),
        installPackageJsonDependencies(),
    ]);
}

function updateAppModule(): Rule {
    return async (host: Tree) => {
        const project = await getProject(host);
        const modulePath = getAppModulePath(host, getProjectMainFile(project));
        const sourceText = host.read(modulePath)!.toString('utf-8');

        const scanner: ts.Scanner = ts.createScanner(
            ts.ScriptTarget.Latest,
            false
        );

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
    };
}

function addPackageJsonDependencies(
    ui: string,
    rtl: boolean,
    layout: string
): Rule {
    return (host: Tree, context: SchematicContext) => {
        commonDependencies.forEach((dependency) => {
            addPackageToPackageJson(
                host,
                dependency.name,
                `${dependency.version}`
            );
            context.logger.log('info', `✅️ Added "${dependency.name}`);
        });

        if (uiDependency[ui]) {
            for (const dependency of uiDependency[ui]) {
                addPackageToPackageJson(
                    host,
                    dependency.name,
                    `${dependency.version}`
                );
                context.logger.log('info', `✅️ Added "${dependency.name}`);
            }
        }

        if (layoutDependency[layout]) {
            for (const dependency of layoutDependency[layout]) {
                addPackageToPackageJson(
                    host,
                    dependency.name,
                    `${dependency.version}`
                );
                context.logger.log('info', `✅️ Added "${dependency.name}`);
            }
        }

        if (rtl && rtlUiDependency[ui]) {
            for (const dependency of rtlUiDependency[ui]) {
                addPackageToPackageJson(
                    host,
                    dependency.name,
                    `${dependency.version}`
                );
                context.logger.log('info', `✅️ Added "${dependency.name}`);
            }
        }

        devDependencies.forEach((dependency) => {
            addPackageToPackageJson(
                host,
                dependency.name,
                `${dependency.version}`,
                true
            );
            context.logger.log('info', `✅️ Added "${dependency.name}`);
        });

        return host;
    };
}

export function installPackageJsonDependencies(): Rule {
    return (host: Tree, context: SchematicContext) => {
        context.addTask(new NodePackageInstallTask());
        context.logger.log('info', `🔍 Installing packages...`);

        return host;
    };
}

export function addPackageToPackageJson(
    host: Tree,
    pkg: string,
    version: string,
    isDevdependencies: boolean = false
): Tree {
    if (host.exists('package.json')) {
        /* tslint:disable-next-line: no-non-null-assertion */
        const sourceText = host.read('package.json')!.toString('utf-8');
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

        host.overwrite('package.json', JSON.stringify(json, null, 2));
    }

    return host;
}

function sortObjectByKeys(obj: { [key: string]: string }) {
    return (
        Object.keys(obj)
            .sort()
            /* tslint:disable-next-line: no-any */
            .reduce(
                (result: any, key: any) => (result[key] = obj[key]) && result,
                {}
            )
    );
}

function addLocalization(ui: string): Rule {
    return async (host: Tree, context: SchematicContext) => {
        if (ui === 'ng-bootstrap') {
            const localizePolyfill = `import '@angular/localize/init';`;
            const localizeStr = `
/***************************************************************************************************
* Load \`$localize\` onto the global scope - used if i18n tags appear in Angular templates.
*/
${localizePolyfill}`;

            const workspace = await getWorkspace(host);
            const projectName: string | undefined = workspace.extensions
                .defaultProject as string;
            if (projectName) {
                appendToTargetOptionFile(
                    host,
                    projectName,
                    'polyfills',
                    localizeStr
                );
            }
        }
    };
}

function addToMainTs() {
    return async (host: Tree, context: SchematicContext) => {
        const workspace = await getWorkspace(host);
        const projectName: string | undefined = workspace.extensions
            .defaultProject as string;
        if (projectName) {
            appendToTargetOptionFile(
                host,
                projectName,
                'main',
                `import 'reflect-metadata';`
            );
        }

        return host;
    };
}

async function appendToTargetOptionFile(
    host: Tree,
    projectName: string,
    optionName: string,
    str: string
) {
    const project = await getProject(host, projectName);
    const buildTargetOptions = getProjectTarget(project, 'build');

    if (buildTargetOptions.options) {
        const path = buildTargetOptions.options[optionName];
        const data = host.read(path as string);
        if (!data) {
            // If the file doesn't exist, just ignore it.
            return;
        }
        const content = virtualFs.fileBufferToString(data);
        if (content.includes(str) || content.includes(str.replace(/'/g, '"'))) {
            // If the file already contains the polyfill (or variations), ignore it too.
            return;
        }

        // Add string at the end of the file.
        const recorder = host.beginUpdate(path as string);
        recorder.insertRight(content.length, str);
        host.commitUpdate(recorder);
    }
}

function updateIndexHtml(ui: string, rtl: boolean) {
    return (host: Tree) => {
        if (host.exists('src/index.html')) {
            let sourceText = host.read('src/index.html')!.toString('utf-8');

            if (ui === 'material') {
                if (
                    sourceText
                        .toLowerCase()
                        .indexOf('https://fonts.googleapis.com') < 0
                ) {
                    const headPosition = sourceText
                        .toLowerCase()
                        .indexOf('</head>');
                    if (headPosition >= 0) {
                        sourceText = sourceText.replace(
                            '</head>',
                            '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></head>'
                        );
                    }
                }
            }

            if (rtl && sourceText.toLowerCase().indexOf(`dir="rtl"`) < 0) {
                if (ui === 'primeng') {
                    sourceText = sourceText.replace(
                        '<html ',
                        '<html  class="ui-rtl" dir="rtl" '
                    );
                } else {
                    sourceText = sourceText.replace(
                        '<html ',
                        '<html dir="rtl" '
                    );
                }
            }

            host.overwrite('src/index.html', sourceText);
        }

        return host;
    };
}

function updateTsConfig(ui: string) {
    const pathItems: any = {
        material: {
            '@narik/ui-lib': ['node_modules/@narik/ui-material'],
            '@narik/ui-lib/*': ['node_modules/@narik/ui-material/*'],
        },
        devextreme: {
            '@narik/ui-lib': ['node_modules/@narik/ui-devextreme'],
            '@narik/ui-lib/*': ['node_modules/@narik/ui-devextreme/*'],
        },
        'ng-bootstrap': {
            '@narik/ui-lib': ['node_modules/@narik/ui-ng-bootstrap'],
            '@narik/ui-lib/*': ['node_modules/@narik/ui-ng-bootstrap/*'],
        },
        nebular: {
            '@narik/ui-lib': ['node_modules/@narik/ui-nebular'],
            '@narik/ui-lib/*': ['node_modules/@narik/ui-nebular/*'],
        },
        primeng: {
            '@narik/ui-lib': ['node_modules/@narik/ui-primeng'],
            '@narik/ui-lib/*': ['node_modules/@narik/ui-primeng/*'],
        },
    };

    return (host: Tree, context: SchematicContext) => {
        if (host.exists('tsconfig.json')) {
            let sourceText = host.read('tsconfig.json')!.toString('utf-8');
            sourceText = sourceText.replace(
                /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,
                ''
            );
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
            host.overwrite('tsconfig.json', JSON.stringify(json, null, 2));
            context.logger.log('info', `🔍 Apply path in  tsconfig.json`);
        }

        return host;
    };
}

function addModuleProviders(ui: string) {
    const providers: any[] = [
        {
            key: `{provide: MODULE_DATA_KEY,useValue: moduleKey}`,
            link: undefined,
        },
        {
            key: `{
        provide: MODULE_UI_KEY,
        useValue: moduleKey
      }`,
            link: undefined,
        },
        {
            key: `{
        provide: MEMORY_STORAGE_VALIDITY_LEN,
        useValue: 1
      }`,
            link: undefined,
        },
        {
            key: ` {
        provide: FORM_ITEM_DEFAULT_CLASS,
        useValue: "item-full-width"
      }`,
            link: undefined,
            uiKey: 'material',
        },
    ];

    return async (host: Tree) => {
        const project = await getProject(host);
        const modulePath = getAppModulePath(host, getProjectMainFile(project));
        const moduleSource = getSourceFile(host, modulePath);

        for (const provide of providers) {
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
                'TranslateModule.forRoot({loader: {provide: TranslateLoader,useFactory: HttpLoaderFactory,deps: [HttpClient, ConfigService]}})',
            link: `@ngx-translate/core`,
        },
        {
            moduleName:
                'NbThemeModule.forRoot({name: "default" },undefined,undefined,NbLayoutDirection.LTR)',
            link: `@nebular/theme`,
        },
        {
            moduleName: 'HttpClientModule',
            link: `@angular/common/http`,
        },
        {
            moduleName: `NarikCoreModule.forRoot({configFilePath: "assets/app-config.json",defaultLang: "en",useDefaultLang: true})`,
            link: `@narik/core`,
        },
        {
            moduleName: 'NarikUiCoreModule',
            link: `@narik/ui-core`,
        },
        {
            moduleName: 'NarikAppCoreModule.forRoot({})',
            link: `@narik/app-core`,
        },
        {
            moduleName:
                'NarikJwtAuthenticationModule.forRoot({loginEndPoint: "api/account/Authenticate",logoutEndPoint: "api/account/Logout",refreshEndPoint: "api/account/Authenticate",tokenStorage: "localStorage",loginPageUrl: "/"})',
            link: `@narik/jwt-authentication`,
        },
        {
            moduleName: 'NarikClientStorageModule.forRoot()',
            link: `@narik/client-storage`,
        },
    ];

    const otherImports: any[] = [
        {
            name: 'TranslateLoader',
            link: `@ngx-translate/core`,
        },
        {
            name: 'HttpClient',
            link: `@angular/common/http`,
        },
        {
            name: 'NbLayoutDirection',
            link: `@nebular/theme`,
        },
        {
            name: 'FORM_ITEM_DEFAULT_CLASS',
            link: `@narik/ui-material`,
            uiKey: 'material',
        },
        {
            name: 'Observable',
            link: `rxjs`,
        },
        {
            name: 'ConfigService,MODULE_DATA_KEY,MODULE_UI_KEY,ModuleInfo',
            link: '@narik/infrastructure',
        },
        {
            name: `NarikTranslateLoader,MEMORY_STORAGE_VALIDITY_LEN,NarikModule`,
            link: '@narik/core',
        },
    ];

    return async (host: Tree) => {
        const project = await getProject(host);
        const appModulePath = getAppModulePath(
            host,
            getProjectMainFile(project)
        );

        for (const module of modules) {
            if (module.uiKey && module.uiKey !== ui) {
                continue;
            }
            if (rtl) {
                module.moduleName = module.moduleName.replace('LTR', 'RTL');
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
            for (let importItem of importItem0.name.split(',')) {
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
    project: workspaces.ProjectDefinition,
    isModuleImport: boolean = true
) {
    const modulePath = getAppModulePath(host, getProjectMainFile(project));
    addModuleImportToModule(host, modulePath, moduleName, src, isModuleImport);
}

export async function getProject(
    host: Tree,
    projectName?: string,
    workSpace?: workspaces.WorkspaceDefinition
): Promise<workspaces.ProjectDefinition> {
    const workspace = workSpace || (await getWorkspace(host));
    const project = workspace.projects.get(
        projectName || (workspace.extensions.defaultProject as string)
    );

    if (project) {
        return project;
    }
    throw new Error(
        `Could not find project : ${
            projectName || (workspace.extensions.defaultProject as string)
        }`
    );
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

    return decoratorIdentifier
        ? decoratorIdentifier.text === 'NgModule'
        : false;
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
            property.name.getText() !== 'imports' ||
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

export function getProjectMainFile(
    project: workspaces.ProjectDefinition
): string {
    const buildOptions = getProjectTargetOptions(project, 'build');

    if (!buildOptions.main) {
        throw new SchematicsException(
            `Could not find the project main file inside of the ` +
                `workspace config (${project.sourceRoot})`
        );
    }

    return buildOptions.main as string;
}

export function addStyles(ui: string, rtl: boolean, layout: string): Rule {
    return async function (host: Tree, context: SchematicContext) {
        const workspace = await getWorkspace(host);
        const project = await getProject(host, undefined, workspace);
        const styles: string[] = ['src/styles.scss'];

        context.logger.log('info', `🔍 Adding styles...`);
        addStyleToTarget(project, 'build', styles);
        addStyleToTarget(project, 'test', styles);

        return updateWorkspace(workspace);
    };
}

function createStyles(ui: string, rtl: boolean, layout: string): string[] {
    let assets: string[] = [];
    if (!rtl || ui !== 'ng-bootstrap') {
        assets.push('~bootstrap/scss/bootstrap');
    } else {
        assets.push('~bootstrap-v4-rtl/scss/bootstrap');
    }
    assets = assets.concat(commonStyles);

    if (uiStyles[ui]) {
        assets = assets.concat(
            (uiStyles[ui] as string[]).map((x) =>
                x.replace('node_modules/', '~')
            )
        );
    }

    if (layoutStyles[layout]) {
        assets = assets.concat(
            (layoutStyles[layout] as string[]).map((x) =>
                x.replace('node_modules/', '~')
            )
        );
    }

    if (rtl) {
        if (rtlUiStyles[ui]) {
            assets = assets.concat(
                (rtlUiStyles[ui] as string[]).map((x) =>
                    x.replace('node_modules/', '~')
                )
            );
        }
    }

    return assets;
}
function getLayoutModule(layout: string) {
    switch (layout) {
        case 'ngxadmin':
            return 'NarikNgxLayout';
        case 'architectui':
            return 'NarikArchitectUiLayout';
        case 'coreui':
            return 'NarikCoreUiLayout';
    }
}

function getLayoutModulePath(layout: string) {
    switch (layout) {
        case 'ngxadmin':
            return "import { NarikNgxLayout } from './modules/narik-ngx-layout/narik-ngx-layout.module';";
        case 'architectui':
            return "import { NarikArchitectUiLayout } from './modules/narik-architectui-layout/narik-architectui-layout.module';";
        case 'coreui':
            return "import { NarikCoreUiLayout } from './modules/narik-coreui-layout/narik-coreui-layout.module';";
    }
}

export function addExtraFiles(
    ui: string,
    rtl: boolean,
    layout: string
): (host: Tree, context: SchematicContext) => Rule {
    return function (host: Tree, context: SchematicContext): Rule {
        context.logger.log('info', `🔍 Adding  extra...`);
        const layoutModule = getLayoutModule(layout);
        const layoutModulePath = getLayoutModulePath(layout);
        const styles = createStyles(ui, rtl, layout);
        const templateSource = apply(url('./files'), [
            applyTemplates({
                direction: rtl ? 'RTL' : 'LTR',
                ui: ui,
                layoutStr: layout,
                layoutModule: layoutModule,
                layoutModulePath: layoutModulePath,
                styles: styles,
            }),
            forEach((fileEntry: FileEntry) => {
                if (fileEntry.path.indexOf('@') >= 0) {
                    if (fileEntry.path.indexOf(`@${ui}@`) < 0) {
                        return null;
                    } else {
                        const newFilePath = fileEntry.path.replace(
                            `@${ui}@`,
                            ''
                        );
                        if (host.exists(newFilePath)) {
                            host.delete(newFilePath);
                        }
                        return {
                            path: newFilePath,
                            content: fileEntry.content,
                        } as any;
                    }
                } else if (fileEntry.path.indexOf('#') >= 0) {
                    if (fileEntry.path.indexOf(`#${layout}#`) < 0) {
                        return null;
                    } else {
                        const newFilePath = fileEntry.path.replace(
                            `#${layout}#`,
                            ''
                        );
                        if (host.exists(newFilePath)) {
                            host.delete(newFilePath);
                        }
                        return {
                            path: newFilePath,
                            content: fileEntry.content,
                        } as any;
                    }
                }

                if (host.exists(fileEntry.path)) {
                    host.delete(fileEntry.path);
                }
                return fileEntry;
            }),
            move(normalize('')),
        ]);

        context.logger.log('info', `🔍 Added  extra...`);
        return chain([mergeWith(templateSource)]);
    };
}

export function addCustomBuilder(): Rule {
    return async function (host: Tree, context: SchematicContext) {
        const workspace = await getWorkspace(host);
        const project = await getProject(host, undefined, workspace);
        const buildTargetOptions = getProjectTarget(project, 'build');

        context.logger.log('info', `🔍 111`);

        buildTargetOptions.builder = '@angular-builders/custom-webpack:browser';

        if (!buildTargetOptions.options) {
            buildTargetOptions.options = {};
        }
        buildTargetOptions.options.customWebpackConfig = {
            path: './extra-webpack.config.js',
            mergeStrategies: {
                module: 'prepend',
                'module.rules': 'prepend',
                plugins: 'prepend',
            },
        };

        const serveTargetOptions = getProjectTarget(project, 'serve');
        serveTargetOptions.builder =
            '@angular-builders/custom-webpack:dev-server';
        serveTargetOptions.options = serveTargetOptions.options || {};
        serveTargetOptions.options.proxyConfig = 'proxy.config.json';

        context.logger.log('info', `🔍 Adding custom builder...`);

        return updateWorkspace(workspace);
        // host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
    };
}

export function getProjectTarget(
    project: workspaces.ProjectDefinition,
    buildTarget: string
) {
    const buildTargetObject = project.targets.get(buildTarget);

    if (buildTargetObject) {
        return buildTargetObject;
    }

    throw new Error(
        `Cannot determine project target configuration for: ${buildTarget}.`
    );
}

export function getProjectTargetOptions(
    project: workspaces.ProjectDefinition,
    buildTarget: string
) {
    const buildTargetObject = project.targets.get(buildTarget);
    if (buildTargetObject && buildTargetObject.options) {
        return buildTargetObject.options;
    }

    throw new SchematicsException(
        `Cannot determine project target configuration for: ${buildTarget}.`
    );
}

export function addStyleToTarget(
    project: workspaces.ProjectDefinition,
    targetName: string,
    styles: string[]
) {
    const targetOptions = getProjectTargetOptions(project, targetName);
    let existingStyles = targetOptions.styles as JsonArray | undefined;

    if (!existingStyles) {
        existingStyles = [];
    }

    for (const styleItem of styles) {
        const hasStyle = existingStyles.find((style: string) => {
            return style === styleItem;
        });
        if (!hasStyle) {
            existingStyles.push(styleItem);
        }
    }

    targetOptions.styles = existingStyles;
}
