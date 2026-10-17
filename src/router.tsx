import { createBrowserRouter, Outlet } from 'react-router'
import Hub from './features/hub/Hub'
import  Todo  from './features/todo/Todo'
import  Tracker  from './features/tracker/Tracker'
import  Finance  from './features/finance/Finance'
import  Notes  from './features/notes/Notes'
import  NotesPage  from './features/notes/NotesPage'
import NotesProvider from './features/notes/context/NotesProvider'

import RootLayout from './RootLayout'
import NotebooksProvider from './features/notes/context/NotebooksProvider'
import NotebooksPage from './features/notes/NotebooksPage'
import TransactionsProvider from './features/finance/context/TransactionsProvider'
import CategoriesProvider from './features/finance/context/CategoriesProvider'
import HabitsProvider from './features/tracker/context/HabitsProvider'

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
                element: (
                    <HabitsProvider>
                        <Outlet/>
                    </HabitsProvider>
                ),
                children: [
                    {index: true, element: <Tracker/>}
                ]
            }, {
                path:'finance',
                element: (
                    <CategoriesProvider>
                        <TransactionsProvider>
                            <Outlet/>
                        </TransactionsProvider>
                    </CategoriesProvider>
                ),
                children: [
                    {index: true, element: <Finance/>}
                ]
            }, {
                path:'notes',
                element: (
                    <NotesProvider>
                        <NotebooksProvider>
                            <Outlet/>
                        </NotebooksProvider>
                    </NotesProvider>),
                children: [
                    { index: true, element: <NotebooksPage/>},
                    { path: ':notebookId', element: <Notes/> },
                    { path: ':notebookId/:noteId', element: <NotesPage/>}
                ]
            }
        ]
    }
], { basename: '/Canivete'})

export default router

