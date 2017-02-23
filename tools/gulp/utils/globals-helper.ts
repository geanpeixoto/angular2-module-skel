export interface StringMap {
  [k: string]: string;
};

const RXJS_GLOBALS: StringMap = {
  'rxjs/Subject': 'Rx',
  'rxjs/add/observable/fromEvent': 'Rx.Observable',
  'rxjs/add/observable/forkJoin': 'Rx.Observable',
  'rxjs/add/observable/of': 'Rx.Observable',
  'rxjs/add/observable/merge': 'Rx.Observable',
  'rxjs/add/observable/throw': 'Rx.Observable',
  'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
  'rxjs/add/operator/map': 'Rx.Observable.prototype',
  'rxjs/add/operator/filter': 'Rx.Observable.prototype',
  'rxjs/add/operator/do': 'Rx.Observable.prototype',
  'rxjs/add/operator/share': 'Rx.Observable.prototype',
  'rxjs/add/operator/finally': 'Rx.Observable.prototype',
  'rxjs/add/operator/catch': 'Rx.Observable.prototype',
  'rxjs/add/operator/first': 'Rx.Observable.prototype',
  'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/Observable': 'Rx',
  'rxjs/BehaviorSubject': 'Rx',
};

const SCOPE_MAP: StringMap = {
  angular: 'ng',
};

function toCamelCase(name: string) {
  return name.replace(/-\w/g, match => match[1].toUpperCase());
}

function getScope(module: string): string {
  try {
    const [, scope] = /^@(\w+)/gi.exec(module);
    return `${SCOPE_MAP[scope] || toCamelCase(scope)}.`;
  } catch (err) {
    return '';
  }
}

function getName(module: string): string {
  const [, name] = /(\w+)$/gi.exec(module);
  return toCamelCase(name);
}

export function getAlias(module: string): string {
  return RXJS_GLOBALS[module] || `${getScope(module)}${getName(module)}`;
}

export function fromDependencies(dependencies: string[]): StringMap {
  const map = dependencies.reduce<StringMap>((r, dep) => ({ ...r, [dep]: getAlias(dep) }), {});
  return { ...map, ...RXJS_GLOBALS };
}
