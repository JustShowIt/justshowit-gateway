## SCHEMA.org .... Als Idee >> eventuell auf Stanards setzen, um Strukturen zu erkennen

## Ausgangsobjekt
```
const test = {
    "jo": "http://www.google.de",
    "klaro": "Irgend ein komischer kleiner Text",
    "xcsfdf": "http://www.gmx.de",
    "sdf": 123,
    "dsffdsf": true,
    "dsfds": "fkjb lfdkxbgv ldfiubg lödfuhbsl iudfbliu bdf ligufd"
};
```

## STEP 1 - Typenerkennung
```
const test1 = {
    "string": {
        "jo": "http://www.google.de",
        "klaro": "Irgend ein komischer kleiner Text",
        "xcsfdf": "http://www.gmx.de",
        "dsfds": "fkjb lfdkxbgv ldfiubg lödfuhbsl iudfbliu bdf ligufd"
    },
    "num": {
        "sdf": 123
    },
    "bool": {
        "dsffdsf": true
    },
    "object": {},
    "array": {}
};
```

## STEP 2 - Subtypenerkennung
```
// const test2 = {
//     "url": [
//         {
//             "jo": "http://www.google.de"
//         },
//         {
//             "xcsfdf": "http://www.gmx.de"
//         }
//     ],
//     "string": [
//         {
//             "klaro": "Irgend ein komischer kleiner Text"
//         },
//         {
//             "dsfds": "fkjb lfdkxbgv ldfiubg lödfuhbsl iudfbliu bdf ligufd"
//         }
//     ],
//     "num": [
//         {
//             "sdf": 123
//         }
//     ],
//     "bool": [
//         {
//             "dsffdsf": true
//         }
//     ],
//     "object": [],
//     "array": []
// };

const test2 = {
    "string.url": [
        {
            "jo": "http://www.google.de"
        },
        {
            "xcsfdf": "http://www.gmx.de"
        }
    ],
    "string": [
        {
            "klaro": "Irgend ein komischer kleiner Text"
        },
        {
            "dsfds": "fkjb lfdkxbgv ldfiubg lödfuhbsl iudfbliu bdf ligufd"
        }
    ],
    "num": [
        {
            "sdf": 123
        }
    ],
    "bool": [
        {
            "dsffdsf": true
        }
    ],
    "object": [],
    "array": []
};

const ui = [
    {
        "type": "link",
        "elements": [
            "string.url",
            "string"
        ]
    }
]
```

## STEP 3 - Zuordnungserkennung zu den Komponenten
```
const test3 = {
    "ui": [
        {
            "type": "link",
            "url": {
                "jo": "http://www.google.de"
            },
            "title": {
                "klaro": "Irgend ein komischer kleiner Text"
            }
        },
        {
            "type": "link",
            "url": {
                "xcsfdf": "http://www.gmx.de"
            },
            "title": {
                "dsfds": "fkjb lfdkxbgv ldfiubg lödfuhbsl iudfbliu bdf ligufd"
            }
        }
    ],
    "string.url": [],
    "string": [],
    "num": [
        {
            "sdf": 123
        }
    ],
    "bool": [
        {
            "dsffdsf": true
        }
    ],
    "object": [],
    "array": []
};
```

## STEP 4 - REST
```
const rest = {
    "url": [],
    "string": [],
    "num": [
        {
            "sdf": 123
        }
    ],
    "bool": [
        {
            "dsffdsf": true
        }
    ],
    "object": [],
    "array": []
};

const erkannt = {
    "ui": [
        {
            "type": "link",
            "url": {
                "jo": "http://www.google.de"
            },
            "title": {
                "klaro": "Irgend ein komischer kleiner Text"
            }
        },
        {
            "type": "link",
            "url": {
                "xcsfdf": "http://www.gmx.de"
            },
            "title": {
                "dsfds": "fkjb lfdkxbgv ldfiubg lödfuhbsl iudfbliu bdf ligufd"
            }
        }
    ]
};
```

## STEP 5 - REST wieder analysieren 

... >>> Step 1 ...