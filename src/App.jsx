import { useEffect, useState } from 'react';
import { PubSub } from '@aws-amplify/pubsub';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';

const pubsub = new PubSub({
  endpoint: 'a2rpxp8igt30g1-ats.iot.us-east-1.amazonaws.com',
  region: 'us-east-1',
});

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Publishing ', count);
    pubsub
      .publish({
        topics: 'hello',
        message: { msg: `Hello ${count}` },
      })
      .catch((err) => console.error(err));
  }, [count]);

  useEffect(() => {
    fetchAuthSession().then((info) => {
      console.log(info.identityId);
    });
    // This triggers the connection to the AWS IoT MQTT broker
    pubsub.subscribe({ topics: [] }).subscribe({});

  }, []);

  return (
    <Authenticator>
      <div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={async () => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      </div>
    </Authenticator>
  );
}

export default withAuthenticator(App);