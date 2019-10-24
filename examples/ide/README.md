## link upper uiengine-ide

> cd examples/ide
> rm -rf ../../node_modules/ && npm link ../../

## link uiengine for uiengine-ide

### Entering the uiengine-ide forder from

> cd ../../

Provide your uiengine at same level as uiengine-ide

> npm link ../uiengine

### running uiengine-ide

run both server socket and client server

> cd examples/ide
> npm run all
