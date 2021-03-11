# Sample shopper data generation

### How?
```
npm run generate
```

This should generate [shopper-data.json](./shopper-data.json)

### CSV
```
cat shopper-data.json | jq -r '(.[0] | keys_unsorted) as $keys | ([$keys] + map([.[ $keys[] ]])) [] | @csv' > shopper-data.csv
```
