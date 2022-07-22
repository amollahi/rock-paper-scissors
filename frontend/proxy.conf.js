const PROXY_CONFIG = {
    "/rest-api": {
        "target": "http://localhost:8080",
        pathRewrite: {'^/rest-api': ''},
        "secure": false,
        "bypass": function (req, res, proxyOptions) {
            if (req.headers.accept.indexOf("html") !== -1) {
                console.log("Skipping proxy for browser request.");
                return "/index.html";
            }
            req.headers["X-Custom-Header"] = "yes";
        }
    }
}

module.exports = PROXY_CONFIG;
