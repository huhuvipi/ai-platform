
export interface  SummarizeRequest  {
  provider: string;
  text: string;
  language: string;  
}

export interface  SummarizeResponse  {
result: string;
  language: string;
  provider: String;
}