# angular2-module-skel
Projeto skeleton para desenvolvimento de Módulos em Angular2

### Instalação
Clone o projeto utilizando o git
```bash
git clone https://github.com/geanpeixoto/angular2-module-skel.git
```

Altere as configurações dos seguintes arquivos:
* `package.json`
* `src/lib/package.json`
* `src/lib/tsconfig.json`
* `src/lib/tsconfig-srcs.json`
* `src/demo-app/tsconfig.json`
* `src/demo-app/system.config.ts`

### Comandos

Para compilar uma release do módulo
```bash
npm run build
```

Para compilar e executar o *preview*
```bash
npm start
```

### Notas
* Optou-se pela compilação em `commonjs` durante o processo de desenvolvimento para que
*relative paths* passe a funcionar como o esperado. 
Mais informações em: [https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html](https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html)
