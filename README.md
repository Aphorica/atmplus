# atm-plus

> ATM State Machine Demonstrator

## Build Setup

``` bash
# install dependencies
npm/yarn install

# serve with hot reload at localhost:8080
'npm run'/yarn serve (yarn serve)

# create fsm visualizations
'npm run'/yarn build_vis (yarn build_vis)

# build for production with minification
'npm run'/yarn build (yarn build)

# build for production and view the bundle analyzer report
'npm run'/yarn build --report (yarn build --report)
```

## Build Note
This will build to a subdirectory '/atmplus'.  To view the build, you need to
run a webserver, for instance 'npm serve', and serve from the project root ('serve .').
Then, in the browser, you would enter 'localhost:5000/atmplus'

## Update Notice - 06-Jan-2019
I've upgraded this to Vue3, however the mkvis file that
constructs the .dot images is broken due to babel issues.

I think the easiest fix will be to remove the docs from
this repo and make a separate repo just for the docs.

Meanwhile, the docs on the github.io site are valid.

Also: I've reinstated the live demo.  If anyone was
looking for it, it's back online, now.

## Documentation
Full documentation is here: https://aphorica.github.io/atmplus.

## Live Demo
Live demo at https://demos.aphorica.com/atmplus.