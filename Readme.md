Run `npm run build-swc` and e.g. `npx http-server dist` to see the error in the console:
`TypeError: Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`

This happens because webpack + swc-loader somehow lead to the following js code:
```javascript
_asyncToGenerator(function() {
    var _tmp;
    return __generator(this, function(_state) {
        switch(_state.label){
            case 0:
                return [
                    4,
                    a()
                ];
            case 1:
                _tmp = [
                    _state.sent()
                ];
                return [
                    4,
                    a()
                ];
            case 2:
                return [
                    2,
                    c.apply(void 0, _tmp.concat(_state.sent()))
                ];
        }
    });
})().then();
```

where `_tmp.concat(_state.sent()))` already deconstructs the array when passing it to the function instead of passing the whole array as one argument.
