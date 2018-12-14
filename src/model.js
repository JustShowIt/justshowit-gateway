const request = require('request');

const mock = [
    {
        "id": "ds76s-ds78sd7-gf8f7",
        "type": "Unit",
        "units": [
            {
                "id": "ds76f-ds76fsd-ds7f6sd8f",
                "type": "TextField"
            },
            {
                "id": "sd8ds8-75ds7ds8sd-5sd78ds",
                "type": "Unit",
                "units": [
                    {
                        "id": "df78df-76df78d-f687df",
                        "type": "TextField"
                    }
                ]
            },
            {
                "id": "ds76sd-sd76sd-7df87f",
                "type": "Text"
            },
            {
                "id": "7sd5-78sd678-78s6d",
                "options": {
                "titel": "Lustiges Video",
                "description": "Ein cooles lustiges Video mit einem Hasen.",
                "path": "https://www.w3schools.com/html/mov_bbb.mp4",
                "resolution": "320x240",
                "runtime": "10.26s",
                "size": "131.509.108",
                "author": "Mario Linz",
                "intelligentSearchDepth": 5
                }
            }
        ]
    }
];


module.exports = {
    getTest (req) {
        return new Promise((resolve/*, rejected*/) => {
            resolve(mock[0]);
        });
    }
}