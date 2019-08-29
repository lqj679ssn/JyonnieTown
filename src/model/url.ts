export function Url(host: string) {
  return (identifier: string) => {
    return host + identifier;
  };
}
