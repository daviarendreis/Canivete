import { createBrowserRouter } from 'react-router'
import Hub from './features/hub/Hub'
import  Todo  from './features/todo/Todo'
import  Tracker  from './features/tracker/Tracker'
import  Finance  from './features/finance/Finance'
import  Notes  from './features/notes/Notes'
import  NotesPage  from './features/notes/NotesPage'
import RootLayout from './RootLayout'
import NotebooksPage from './features/notes/NotebooksPage'

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

