import RequireRole from 'middleware/RequireRole';

import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import RequireAuth from 'middleware/RequireAuth';
import Login from 'pages/Login';
import Layout from 'pages/Admin/Layout';
import Books from 'pages/Admin/Books';
import AddEditBook from 'pages/Admin/AddEditBook';
import IssueBook from 'pages/Admin/IssueBook';
import ReturnBook from 'pages/Admin/ReturnBook';
import Users from 'pages/Admin/Users';
import BookDetails from 'pages/Admin/BookDetails';
import IssuedBooks from 'pages/Admin/IssuedBooks';
import AddEditUser from 'pages/Admin/AddEditUser';
import DashBoard from 'pages/Admin/DashBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} />


        <Route element={<RequireAuth />}>
          <Route element={<RequireRole allowedRoles={["ADMIN"]} />}>
            <Route path='/' element={<Navigate to="/admin" replace={true} />} />
              <Route path='admin' element={<Layout />}>
                <Route path='dashboard' element={<DashBoard />} />
                <Route path='profile' element={<Outlet />} />
                <Route path='books' element={<Outlet />} >
                  <Route index element={<Books />} />

                  <Route path=':id' element={<BookDetails />} />
                  <Route path='add' element={<AddEditBook />} />
                  <Route path='edit/:id' element={<AddEditBook />} />
                </Route>
                <Route path='issue-books' element={<IssueBook />} />
                <Route path='issued-books' element={<IssuedBooks />} />
                <Route path='return-books' element={<ReturnBook />} />
                <Route path='users' element={<Outlet />} >
                <Route index element={<Users />} />
                <Route path='add' element={<AddEditUser />} />
                <Route path='edit/:id' element={<AddEditUser />} />
                </Route>
              </Route>
         

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
