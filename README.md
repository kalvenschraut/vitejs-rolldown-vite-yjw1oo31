To see sourcemap issue.

Install dependencies using pnpm

`pnpm i`

then build the package repo

`pnpm build:package`

and then run the dev server. Navigate to the URL and if you click on the browser link in console to see where console.logs are originating from it isn't to the same line
Also want to note that if you set minify to false in the package vite config then the the source maps and links in the chrome dev tools work as expected
