export function encodeJSONToURLParam(json: object): string {
  const jsonString = JSON.stringify(json);
  return encodeURIComponent(jsonString);
  //   const base64 = btoa(encodeURIComponent(jsonString)); // Encode URI components for full UTF-8 support
  //   return base64;
}

export function decodeJSONFromURLParam(encoded: string): object {
  const jsonString = decodeURIComponent(encoded);
  //   const jsonString = decodeURIComponent(atob(encoded));
  return JSON.parse(jsonString);
}
