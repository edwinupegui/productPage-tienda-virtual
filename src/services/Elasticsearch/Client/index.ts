import { Indices } from "@/types/Elasticsearch";

interface ElasticsearchClient {
  auth: () => string;
  search: <T>(
    index: Indices,
    request: any
  ) => Promise<any>;
  searchTemplate: <T>(
    index: Indices,
    request: any
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
  async search<T>(index: string, request: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ElasticsearchClient.auth());
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ELASTICSEARCH_URL}/${prefix + index}/_search`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(request.body),
      }
    );
    const json: any = await response.json();
    return json;
  },
  async searchTemplate<T>(index: string, request: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ElasticsearchClient.auth());
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ELASTICSEARCH_URL}/${
        prefix + index
      }/_search/template`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(request.body),
      }
    );
    const json: any = await response.json();
    return json;
  },
};
export default ElasticsearchClient;
