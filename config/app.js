module.exports = {
    port: process.env.SERVER_PORT,
    prefixApiVersion: process.env.PREFIX_API_VERSION || "/api/v1",
    jwtAccessKey : process.env.JWT_ACCESS_KEY || "akitajwt",
    static_folder: `${__dirname}/../src/public`,
    // router: `${__dirname}../src/routers`,
    // controller : `${__dirname}../src/controllers`,
    views_folder: `${__dirname}/../src/apps/views`,
    view_engine: "ejs",
    session_key: "vietPro",
    session_secure: false,
    tmp: `${__dirname}/../src/tmp/`,
};
