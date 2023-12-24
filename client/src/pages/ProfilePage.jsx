import { Card, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  const { Paragraph } = Typography;

  return (
    <Card
      title={<strong style={{ fontSize: '1.5em' }}>My Profile</strong>}
      style={{
        width: '300px', // adjust this value as needed
        height: '500px', // adjust this value as needed
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '15px' // rounded corners
      }}
    >
      {user && user.username && user.email && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            marginBottom: 150
          }}
        >
          <Avatar icon={<UserOutlined />} size={100} /> {/* bigger avatar */}
          <h1 style={{ marginTop: '20px' }}>{user.username}</h1> {/* bigger title */}
          <Paragraph>{user.email}</Paragraph> {/* description */}
          {/* Add more details here */}
        </div>
      )}
    </Card>
  );
}

export default ProfilePage;
