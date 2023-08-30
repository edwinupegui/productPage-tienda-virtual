export interface ElasticLogIndex {
  uuid: string;
  cuid: string;
  trace: Step[];
}

export interface Step {
  name: string;
  detail: string;
  url: string;
  date: string;
}
