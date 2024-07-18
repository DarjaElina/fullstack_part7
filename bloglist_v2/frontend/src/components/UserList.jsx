import { Link } from 'react-router-dom';

import styled from 'styled-components';

const GridContainer = styled.li`
  width: 400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
`;

const FlexContainer = styled.div`
  margin: 0 auto;
  display: flex;
  width: 400px;
  justify-content: space-between;
`;


const UserList = ({ users }) => {
  if (!users) {
    return null;
  }


  return (
    <div>
      <FlexContainer>
        <h2>Users</h2>
        <h2>Blogs created</h2>
      </FlexContainer>
      {users.map(user => (
        <GridContainer key={user.id}>
          <p><Link to={`/users/${user.id}`}>{user.name}</Link></p>
          <p>{user.blogs.length}</p>
        </GridContainer>
      ))}
    </div>
  );
};

export default UserList;