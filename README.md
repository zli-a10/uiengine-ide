# UIEngine IDE core

## Run example

```
# build library
cd .
npm i
npm link ../../uiengine #in developing phase, need manually load the uiengine
npm run dev

# run example
cd examples/ide
npm i
npm start
```

## TO DO

E2E: stimulate customer input no need extra tool, just stimulate dataNode data
UIEngine CLI stimulate data, state, and uinode ,every kinds of objects

> add resources like datasource & event, should load immediately to assign to the selector
> table component
> layout support, save layout once adjusted
> group select and group
> generate data for table template select
> watch one ID and keep the records
> plugin data only focus on specific items
> mobile preview
> components group
> fix debug UI JSON issue
> release tools definiation
