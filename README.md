# API Documentation

## API Endpoints

### /start ; method=GET ; 
```javascript
res = {
    "error" : null,
    "body" : {
      "message": "Ready",
      "uid"  :<id>
    },
    "status": "success"
  }
  ```
 
 ### /play ; method=GET; Request-Header: Authorization : Bearer uid  
 ```javascript
 res = {
    "_id": <id>,
    "uid": <uid>,
    "moves": ["4", "3"],
    "board": [
        [],
        [],
        [],
        [],
        [
           "1"
        ],
        [],
        []
    ],
    "turn": "2",
    "winner": null,
    "__v": 1
}
```

### /play/move/col/<colnum> ; method=GET; Request-Header: Authorization : Bearer uid  
```javascript
res = {
    "error": null,
    "body": {
        "message": "Valid" || "Invalid" || "Yellow Wins" || "Red Wins"
    },
    "status": "success"
}
```
 
 
