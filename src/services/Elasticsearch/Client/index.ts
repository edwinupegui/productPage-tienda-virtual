/* eslint-disable no-prototype-builtins */

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
  msearchTemplate: <T>(
    request: any
  ) => Promise<Record<any, any>>;
  upSert: <T>(
    index: Indices,
    id: string,
    request: any
  ) => Promise<any>;
}
const prefix = process.env.NEXT_PUBLIC_ELASTICSEARCH_ENVIRONMENT || 'dev_new_';
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
  async msearchTemplate<T>(request: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ElasticsearchClient.auth());
    const body = request.body
      ?.map(
        (item: any & any) => {
          if (!item.hasOwnProperty('index')) return item;
          item.index = prefix + item.index;
          return item;
        }
      )
      .reduce((acc, crr) => `${acc}${JSON.stringify(crr)}\n`, '');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ELASTICSEARCH_URL}/_msearch/template`,
      {
        method: 'POST',
        headers,
        body,
      }
    );
    const json: any = await response.json();
    let responseObject = {} as Record<any, any>;
    request.body
      ?.filter((msearchBody) => msearchBody.hasOwnProperty('id'))
      .forEach((msearchBody, index) => {
        const msearchBodyConfig = msearchBody as any;
        if (msearchBodyConfig.id) {
          responseObject = {
            ...responseObject,
            [msearchBodyConfig.id]: json.responses[index],
          };
        }
      });
    return responseObject;
  },
  async upSert<T>(index: string, id: string, request: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ElasticsearchClient.auth());
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ELASTICSEARCH_URL}/${
        prefix + index
      }/_doc/${id}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(request),
      }
    );
    const json: any = await response.json();
    return json;
  },
};
export default ElasticsearchClient;
