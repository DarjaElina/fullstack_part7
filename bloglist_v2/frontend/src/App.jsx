import { useContext, useEffect, useState } from 'react';
import blogService from './services/blogs';
import userService from './services/users';
import BlogList from './components/BlogList';
import LogInForm from './components/LogInForm';
import Notification from './components/Notification';
import User from './components/User';
import Blog from './components/Blog';
import UserList from './components/UserList';
import Footer from './components/Footer';
import GlobalStyle from './GlobalStyles';
import NavBar from './layout/NavBar';
import MobileMenu from './components/MobileMenu';
import Main from './layout/Main';
import breakpoints from './constants/breakpoints';
import UserContext from './context/UserContext';
import { NotificationContextProvider } from './context/NotificationContext';
import usePath from './hooks/usePath';
import useFetch from './hooks/useFetch';
import { Routes, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const WelcomeMessage = styled.div`
  color: #F3D9DC;
  text-align: center;
  font-size: 30px;
`;

const App = () => {
  const [user, userDispatch] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'SET_USER', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const findByUserId = usePath('/users/:id').findByParams;
  const findByBlogId = usePath('/blogs/:id').findByParams;

  const usersData = useFetch('users', userService.getAll);
  const blogsData = useFetch('blogs', blogService.getAll);

  if (usersData.isLoading || blogsData.isLoading) {
    return <div>loading data</div>;
  }

  const users = usersData.data;
  const blogs = blogsData.data.sort((a, b) => b.likes - a.likes);

  const userObj = findByUserId(users);
  const blogObj = findByBlogId(blogs);

  return (
    <NotificationContextProvider>
      <ThemeProvider theme={{ breakpoints }}>
        <GlobalStyle />
        <Content>
          {!user && <Link to='/login'>log in</Link>}
          {user && <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />}
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
          <Notification />
          <h1>Blog App 🐝👩‍💻👨‍💻</h1>
          {!user && <WelcomeMessage>Please log in to start using the app</WelcomeMessage>}
          <Main>
            <Routes>
              <Route path='/users/:id' element={<User user={userObj} />} />
              <Route path='/blogs/:id' element={<Blog blog={blogObj} />} />
              <Route path='/login' element={<LogInForm />} />
              <Route path='/users' element={<UserList users={users} />} />
              <Route path='/' element={<BlogList blogs={blogs} />} />
            </Routes>
          </Main>
          <Footer />
        </Content>
      </ThemeProvider>
    </NotificationContextProvider>
  );
};

export default App;

