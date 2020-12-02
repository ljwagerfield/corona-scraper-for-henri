# Corona Virus Scraper

🎁 Christmas present for Henri 🎁 

## Getting started

```bash
npm install -g serverless
npm install
```

## Deploying

### The Full Stack

```bash
serverless deploy
```

### Subsequent Deploys (Code Only == Quicker To Deploy)

```bash
serverless deploy function -f corona
```

## Running locally without deploying

```bash
serverless invoke local --function corona --data '{ "headers": { "referer": "https://foo/?postcode=HP27%209EN" } }'
```

## Logging

Output from any `console.log(..)`s will appear in CloudWatch.