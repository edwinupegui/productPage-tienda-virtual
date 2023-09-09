import crypto from 'crypto';
import moment from 'moment';

const UseApiToken = () => {
  const Secret = process.env.NEXT_PUBLIC_API_TOKEN_SECRET;
  const TokenDurationMinutes = process.env.NEXT_PUBLIC_API_TOKEN_DURATION;

  const generateToken = () => {
    const currentTime = moment
      .utc()
      .add(TokenDurationMinutes, 'minutes')
      .toDate();

    const ticks = currentTime.getTime() * 10000 + 621355968000000000;
    const dataToHash = `${currentTime.getHours() * 3}${
      currentTime.getDate() * 5
    }${currentTime.getFullYear() * 7}${currentTime.getHours() * 11}${ticks}`;
    const token = hashString(`${dataToHash}${Secret}`);

    return `${dataToHash}.${ticks}.${token}`;
  };

  const hashString = (input: string) => {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
  };

  const apiToken = generateToken();

  return {
    apiToken: apiToken,
    generateToken: generateToken,
  };
};

export default UseApiToken;
