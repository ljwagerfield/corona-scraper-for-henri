const fetch = require('node-fetch');

function getQueryParam(event, paramName) {
  if (event.queryStringParameters) {
    return event.queryStringParameters[paramName]
  }

  const queryString = new URL(event.headers.referer).search.substring(1)
  paramName += "="
  return queryString.startsWith(paramName) && decodeURI(queryString.substring(paramName.length))
}

module.exports.invoke = async event => {
  const postcode = getQueryParam(event, "postcode")
  if (postcode === undefined) {
    return {
      statusCode: 400,
      body: "Please provide a postcode, e.g. ?postcode=SW18+3DT"
    };
  }

  const params = new URLSearchParams();
  params.append('postcode-lookup', postcode);

  const result = await fetch('https://www.gov.uk/find-coronavirus-local-restrictions', { method: 'POST', body: params })

  const data = await result.text()
  const extractedData = /^.*This area is in Tier (\d).*$/m.exec(data)[1]

  return {
    statusCode: 200,
    body: extractedData
  }
};
