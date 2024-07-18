const User = ({ user }) => {

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs: {user.blogs.length}</h3>
    </div>
  );
};

export default User;