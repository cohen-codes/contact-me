// @ts-nocheck

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

const createAirtableRecord = async (body) => {
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_ID
    )}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to create record in Airtable');
  }

  return response;
};

const submitHandler = async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }

  const form = await request.formData();
  let body;

  for await (const entry of await form.entries()) {
    body = entry[0];
  }
  const jsonStr = body.replace(/(\w+:)|(\w+ :)/g, function (s) {
    return '"' + s.substring(0, s.length - 1) + '":';
  });

  var obj = JSON.parse(jsonStr);

  const reqBody = {
    fields: { ...obj },
  };

  await createAirtableRecord(reqBody);

  return new Response('Record created successfully', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  return submitHandler(request);
}
