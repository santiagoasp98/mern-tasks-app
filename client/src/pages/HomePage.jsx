import { Card, Image } from 'antd';

import task from '../assets/task-list.svg';
import examples from '../assets/tasks-examples.png';

function HomePage() {
  return (
    <Card
      bordered={true}
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <Image preview={false} src={task} alt="Task Manager Image" height={400} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 2, textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '3em',
              fontWeight: 'bold',
              color: 'black',
              margin: '20px 0',
            }}
          >
            Welcome to the Task Manager
          </h1>
          <p style={{ fontSize: '1.5em', color: 'black'}}>
            Manage your tasks efficiently with our Task Manager.<br />
            Keep track of your to-dos, set deadlines, and stay organized!
          </p>
          <Image 
            preview={false} 
            src={examples} 
            alt="Tasks examples" 
            height={200}
            style={{ borderRadius: '5px' }} 
          />
        </div>
      </div>
    </Card>
  );
}

export default HomePage;
