## Testing AWS Lambda on Local
1. `npm install -g lambda-local`  
2. `cp event.json.example event.json`  
3. Update the values in event.json and run  
4. `lambda-local -l index.js -h handler -e event.json -t 20`