#### VS Code + Mocha + Babel problem

VS Code can't debug tests run through Mocha properly, this repo was created to repro the issue.

#### To Build

    npm install
    npm run build

#### To Demonstrate Working Sourcemaps

    node --debug-brk dist/index.js

... and attach with node, or just `Launch` from with VS Code

#### To Demonstrate Broken Debugging in Mocha

    mocha --debug-brk test

(there's a mocha.opts that adds babel compiler already)

* debugger doesn't stop on "debugger" statements, but some other place in the file
* breakpoints don't work as expected
* symbols not available


#### It Does Work In Node Inspector

In another process..

    node-inspector

Then...

    mocha --debug-brk test

#### Notes

* Babel `sourceMaps` must be `inline` or `both` in order for node-inspector to work (which makes sense)
* When sourcemaps are not available, node-inspector correctly debugs the compiled code. VS Code shows the ES6 source, but with the breakpoints in the wrong place.