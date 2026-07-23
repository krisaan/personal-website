module.exports = function (eleventyConfig) {
    // Tell 11ty to COPY script.js and style.css as raw static files, not process them as templates!
    eleventyConfig.addPassthroughCopy("src/script.js");
    eleventyConfig.addPassthroughCopy("src/style.css");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes"
        }
    };
};