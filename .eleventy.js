module.exports = function (eleventyConfig) {
    // Tell Eleventy to copy the assets folder straight to the _site directory
    eleventyConfig.addPassthroughCopy("src/assets");

    // Your other configurations (e.g., passthrough for script.js, style.css, etc.)
    eleventyConfig.addPassthroughCopy("src/script.js");
    eleventyConfig.addPassthroughCopy("src/style.css");

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};