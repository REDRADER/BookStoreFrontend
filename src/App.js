import RequireRole from 'middleware/RequireRole';

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import RequireAuth from 'middleware/RequireAuth';
import Login from 'pages/Login';
import Layout from 'pages/Admin/Layout';
import Books from 'pages/Admin/Books';
import AddEditBook from 'pages/Admin/AddEditBook';
import IssueBook from 'pages/Admin/IssueBook';
import ReturnBook from 'pages/Admin/ReturnBook';
import Users from 'pages/Admin/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} />


        <Route element={<RequireAuth />}>
          <Route element={<RequireRole allowedRoles={["ADMIN"]} />}>

            <Route path='/admin' element={<Layout />}>
              <Route path='dashboard' element={<Outlet />} />
              <Route path='profile' element={<Outlet />} />
              <Route path='books' element={<Outlet />} >
                <Route index element={<Books/>} />

                <Route path='add' element={<AddEditBook />} />
                <Route path='edit/:id' element={<AddEditBook />} />
              </Route>
              <Route path='issue-books' element={<IssueBook />} />
              <Route path='return-books' element={<ReturnBook />} />
              <Route path='users' element={<Users />} />
            </Route>


          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
