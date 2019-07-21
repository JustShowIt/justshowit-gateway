export default [
    { input: ".mp4", output: "url" },
    { input: ".mp4", output: "video" },
    { input: "www.google.de", output: "url" },
    { input: "www.", output: "url" },
    { input: "http://www.", output: "url" },
    { input: "https://www.", output: "url" },
    { input: "abcdefghijklimopqrstuvwxyz", output: "text" },
    { input: "01234564789", output: "text" },
    { input: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.", output: "text" },
    { input: "Muh sagt die Kuh", output: "text" }
];
