
interface searchTemplate {
  index: string
  request: any
}

interface ElasticsearchClient {
  auth: () => string;
  searchTemplate: ({
    index,
    request
  }: searchTemplate
  ) => Promise<any>;
}
const prefix = process.env.NEXT_PUBLIC_ELASTICSEARCH_ENVIRONMENT || 'dev_tv';
const ElasticsearchClient: ElasticsearchClient = {
  auth() {
    const basicAuthentication = Buffer.from(
      `${process.env.NEXT_PUBLIC_ELASTICSEARCH_USER}:${process.env.NEXT_PUBLIC_ELASTICSEARCH_PASSWORD}`,
      'utf-8'
    ).toString('base64');
    return `Basic ${basicAuthentication}`;
  },

  async searchTemplate(body: searchTemplate) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ElasticsearchClient.auth());
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ELASTICSEARCH_URL}/${
        prefix + body.index
      }/_search/template`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body.request.body),
      }
    );
    const json = await response.json();
    return json;
  },
};
export default ElasticsearchClient;
