module.exports = {
    theme: {
        fontFamily: {
            title: ["Poppins", "-apple-system"]
        }
    },
    variants: {
        opacity: ["responsive", "disabled"],
        display: ["responsive", "empty"]
    },
    plugins: [
        function({ addVariant, e }) {
            addVariant("disabled", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`disabled${separator}${className}`)}:disabled`;
                });
            });
            addVariant("empty", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.${e(`empty${separator}${className}`)}:empty`;
                });
            });
        }
    ]
};
