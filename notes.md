npx pbjs -t json -o public/proto/profedit.json public/proto/profedit.proto

npx pbjs -t static-module -w es6 -o public/proto/profedit.js public/proto/profedit.proto


### gh-pages icons fix


* add .nojekyll to public/ before build
* comment node_modules/ in .gitignore of gh-pages branch or add/edit .gitignore in public/
* update metro.config.js
* update babel.config.js
* yarn add      
  * "babel-plugin-module-resolver"
  * "babel-preset-expo"