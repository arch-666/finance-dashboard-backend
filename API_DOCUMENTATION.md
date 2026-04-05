## Get Category-wise Balance Response

The response will return a JSON object that groups the balance by category, as shown below:

```json
{
  "categoryGroupedBalance": [
    { "_sum": { "amount": 5507 }, "category": "x" }
  ]
}
```