# TO FIX

`monaco-editor need dynamically loaded from /lib/, not manuall ln -s ../../lib/*.index.* ./public && ln -s ../../lib/monaco-editor ./public`

## link upper uiengine-ide

rm -rf ../../node_modules/ && npm link ../../

## link react

npm link ../../node_modules/react-dom && npm link ../../node_modules/react"
