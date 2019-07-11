/*module.exports = [
    {
        "type": "video",
        "options": {
            "titel": "Lustiges Video",
            "description": "Ein cooles lustiges Video mit einem Hasen.",
            "path": "https://www.w3schools.com/html/mov_bbb.mp4",
            "resolution": "320x240",
            "runtime": "10.26s",
            "size": "131.509.108",
            "author": "Mario Linz"
        }
    },
    {
        "type": "text",
        "options": {
            "text": "This is a short text."
        }
    },
    {
        "type": "link",
        "options": {
            "title": "Neuronal Network with Brain.js",
            "title": "https://github.com/BrainJS/brain.js"
        }
    }
]*/

module.exports = [
    {
      input: {
        titel: 1,
        description: 1,
        path: 1,
        resolution: 1,
        runtime: 1,
        size: 1,
        author: 1,
      },
      output: {
        video: 1,
      },
    },
    {
      input: {
        title: 1,
        url: 1,
      },
      output: {
        link: 1,
      },
    },
    {
      input: {
        text: 1,
      },
      output: {
        text: 1,
      },
    },
  ];