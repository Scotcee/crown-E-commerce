const path = require('path');

module.exports = {
    // Other configurations...
    module: {
        rules: [
            // Other rules...
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
    // Other configurations...
};