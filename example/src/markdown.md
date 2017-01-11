# vue marked loader

## props
```props
{
  "propA": {
    "description": "Prop without demo."
  },
  "propB": {
    "type": "Array",
    "default": [0, 1, 3],
    "description": "Prop with demo overview.",
    "demo": {
      "type": "Overview",
      "value": [0, 1, 2]
    }
  },
  "propC": {
    "type": "Boolean",
    "default": false,
    "description": "Prop with a boolean value.",
    "demo": {
      "value": true
    }
  },
  "propD": {
    "type": "Select",
    "default": 0,
    "description": "Prop with multiple values options.",
    "demo": {
      "options": [{
        "text": "0",
        "value": 0
      }, {
        "text": "1",
        "value": 1
      }, {
        "text": "[2]",
        "value": [2]
      }, {
        "text": "[3, 4]",
        "value": [3, 4]
      }],
      "value": 0
    }
  }
}
```

## props2
```props
{
    "attributes": ['a', 'b']
}
```

