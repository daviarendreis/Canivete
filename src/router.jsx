import { createBrowserRouter, Outlet } from 'react-router-dom'
import Hub from './features/hub/Hub'
import  Todo  from './features/todo/Todo'
import  Tracker  from './features/tracker/Tracker'
import  Finance  from './features/finance/Finance'
import  Notes  from './features/notes/Notes'
import  NotesPage  from './features/notes/NotesPage'
import NotesProvider from './features/notes/context/NotesProvider'

import RootLayout from './RootLayout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Hub/>
            }, {
                path: 'todo',
                element: <Todo/>
            }, {
                path: 'tracker',
                element: <Tracker/>
            }, {
                path:'finance',
                element: <Finance/>
            }, {
                path:'notes',
                element: (
                    <NotesProvider>
                        <Outlet/>
                    </NotesProvider>),
                children: [
                    { index: true, element: <Notes/>},
                    { path: ':id', element: <NotesPage/>}
                ]
            }
        ]
    }
], { basename: '/Canivete'})

export default router

