import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import AdminLayout from '../pages/admin/AdminLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import AddPost from '../pages/admin/post/AddPost';
import ManagePosts from '../pages/admin/post/ManagePosts';
import UpdatePost from '../pages/admin/post/UpdatePost';
import ManageUser from '../pages/admin/user/ManageUser';
import SingleBlog from '../pages/blogs/singleBlog/SingleBlog';
import Home from '../pages/home/Home';
import About from '../pages/miniPage/About'
import Contact from '../pages/miniPage/Contact'
import Login from '../pages/user/Login';
import Register from '../pages/user/Register';
import PrivateRouter from './PrivateRouter';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path:'/',
                element: <Home/>
            },
            {
                path:'/about-us',
                element: <About/>
            },
            {
                path:'/contact-us',
                element: <Contact/>
            },
            {
                path:'/blog/:id',
                element: <SingleBlog/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/dashboard',
                element: <PrivateRouter> <AdminLayout/> </PrivateRouter>,
                children: [
                    {
                        path: '',
                        element: <Dashboard/>
                    },
                    {
                        path: 'add-new-post',
                        element: <AddPost/>
                    },
                    {
                        path: 'manage-items',
                        element: <ManagePosts/>
                    },
                    {
                        path: 'users',
                        element: <ManageUser/>
                    },
                    {
                        path: 'update-post/:id',
                        element: <UpdatePost/>
                    }
                ]
            }
        ]
    },
]);

export default router;