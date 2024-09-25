
import { useEffect, useState } from 'react';
import { PubSub } from '@aws-amplify/pubsub';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { Amplify} from 'aws-amplify';
import outputs from '../amplify_outputs.json';


Amplify.configure(outputs);



import { fetchAuthSession } from 'aws-amplify/auth';
fetchAuthSession().then((info) => {
  const cognitoIdentityId = info.identityId;
});

// Apply plugin with configuration
const pubsub = new PubSub({
  region: 'us-east-1',
  endpoint:
    'wss://a2rpxp8igt30g1-ats.iot.us-east-1.amazonaws.com/mqtt'
});


pubsub.subscribe({ topics: 'myTopic' }).subscribe({
  next: (data) => console.log('Message received', data),
  error: (error) => console.error(error),
  complete: () => console.log('Done')
});

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    pubsub.subscribe({topics: ['messages']}).subscribe({
        next: (data) => {
          setMessage(data.msg);
        }
    });
  }, []);
    

  
   return (
    <>
      <div>
      <h1>Vite + React</h1>
      <>{message}</>
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
    </>
  );
}


export default withAuthenticator(App);
