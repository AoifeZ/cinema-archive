export async function handler(event) {
  try {
    const termsParam = event?.queryStringParameters?.terms ?? '';
    const terms = termsParam
      .split('|')
      .map((term) => term.trim())
      .filter(Boolean);

    if (terms.length === 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Missing terms query parameter.' })
      };
    }

    const filters = terms.map((term) => (
      `creator:("${term}") OR subject:("${term}") OR title:("${term}")`
    ));

    const params = new URLSearchParams();
    params.set('q', `collection:(feature_films) AND mediatype:(movies) AND (${filters.join(' OR ')})`);
    params.append('fl[]', 'title');
    params.append('fl[]', 'description');
    params.append('fl[]', 'identifier');
    params.append('sort[]', 'downloads desc');
    params.set('output', 'json');
    params.set('rows', '10');

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
