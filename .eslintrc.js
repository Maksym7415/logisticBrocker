/*module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "extends": [
        "react-app",
        "airbnb",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": ["react"],
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error", 
            "never"
        ],
        "arrow-spacing": [
            "error",
        ],
        "no-console": [
            "error",
        ],
    }
};*/
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "react-app",
        "airbnb",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error", 
            "never"
        ],
        "no-console": 0,
        "no-alert": "warn",
        "comma-dangle": [
            "error", 
            "never"
        ],
        "arrow-spacing": "error",
        "react/prop-types": 0,
        "react-hooks/exhaustive-deps": "off",
        "react-hooks/rules-of-hooks": "error",
        "react/jsx-filename-extension": [
            1,
            { "extensions": [
                ".js",
                ".jsx"
            ] }
        ],
        "no-confusing-arrow": 0,
        "react/destructuring-assignment": [
            "error",
            "never"
        ],
        "jsx-quotes": [
            "error",
            "prefer-single"
        ],
        "object-curly-spacing": 0,
        "sort-imports": "off",
        "no-return-assign": 0,
        "prefer-const": 0,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "react/button-has-type": 0,
        "no-tabs": ["error", { allowIndentationTabs: true }],
    }
};

