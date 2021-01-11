type Props = {
  str: string;
  n?: number;
};

function truncate({ str, n = 100 }: Props): string {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}

export default truncate;
