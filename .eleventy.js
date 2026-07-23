module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/style.css");
    eleventyConfig.addPassthroughCopy("src/script.js");
    eleventyConfig.addPassthroughCopy("src/assets");

    return {
        pathPrefix: "/personal-website/", // Replace with your exact GitHub repository name
        dir: {
            input: "src",
            output: "_site"
        }
    };
};