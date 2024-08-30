import https from 'https';

const MSG91_API_KEY = '427665A02BOrht66cc2055P1';
const SENDER_ID = 'SOLWYZ22446688';
const TEMPLATE_ID = '66b0c0add6fc052a545511e2'; // Ensure this template ID is correct and approved

export const sendOtp = async (mobileNumber?: string, email?: string, name?: string): Promise<any> => {
  const recipient = mobileNumber ? `971${mobileNumber}` : '';

  const options = {
    method: 'POST',
    hostname: 'control.msg91.com',
    port: null,
    path: `/api/v5/otp?template_id=${TEMPLATE_ID}&mobile=${recipient}&authkey=${MSG91_API_KEY}&sender=${SENDER_ID}&realTimeResponse=true`,
    // https://control.msg91.com/api/v5/otp?template_id=66c83802d6fc0517a66b3bb2&mobile=971556983474&authkey=427665AvwJvL5waCX66b20318P1&realTimeResponse=
    headers: {
      'Content-Type': 'application/JSON'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks: any[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve(JSON.parse(body));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(JSON.stringify({
      Param1: mobileNumber ? mobileNumber : email,
      Param2: email ? email : '',
      Param3: name ? name : ''
    }));

    req.end();
  });
};

export const verifyOtp = async (otp: string, mobileNumber: string): Promise<any> => {
  const recipient = `971${mobileNumber}`;

  const options = {
    method: 'GET',
    hostname: 'control.msg91.com',
    port: null,
    path: `/api/v5/otp/verify?otp=${otp}&mobile=${recipient}`,
    headers: {
      authkey: MSG91_API_KEY,
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks: any[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve(JSON.parse(body));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
};
