'use strict';

export const Config = {
    apiUrl: 'http://localhost:3040',
    app: {
        title: 'cbook'
    },
    port: 3040,
    db: 'mongodb://localhost/cbook',
    secret: 'cbook',
    adminUser: {
        username: 'admin',
        password: 'admin@123',
        roles: ['admin'],
        emailId: 'admin@admin.com'
    }
};


export function getGlobbedFiles(globPatterns, removeRoot) {
    // For context switching
    var _this = this;

    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob 
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            glob(globPatterns, {
                sync: true
            }, function (err, files) {
                if (removeRoot) {
                    files = files.map(function (file) {
                        return file.replace(removeRoot, '');
                    });
                }

                output = _.union(output, files);
            });
        }
    }

    return output;
};
