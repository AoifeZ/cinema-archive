export async function handler(event) {
  try {
    const creatorsParam = event?.queryStringParameters?.creators ?? '';
    const creators = creatorsParam
      .split('|')
      .map((creator) => creator.trim())
      .filter(Boolean);

    if (creators.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing creators query parameter.' })
      };
    }

    const filters = creators.map((creator) => `creator:("${creator}")`);

    const params = new URLSearchParams();
    params.set('q', `mediatype:(movies) AND (${filters.join(' OR ')})`);
    params.append('fl[]', 'title');
    params.append('fl[]', 'description');
    params.append('fl[]', 'identifier');
    params.append('fl[]', 'downloads');
    params.append('sort[]', 'downloads desc');
    params.set('output', 'json');
    params.set('rows', '30');

    const response = await fetch(`https://archive.org/advancedsearch.php?${params.toString()}`);
    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: `Archive API returned ${response.status}.` })
      };
    }

    const data = await response.json();
    const docs = data?.response?.docs ?? [];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      },
      body: JSON.stringify({ docs })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error?.message ?? 'Unexpected server error.' })
    };
  }
}
