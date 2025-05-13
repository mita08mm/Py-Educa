<<<<<<< HEAD
import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { CreateCoursePage } from "../../modules/courses/pages/CreateCoursePage";
import { ModuleManagementPage } from "../../modules/courses/pages/ModulePage";
import { SectionManagementPage } from "../../modules/courses/pages/SectionPage";
import { SubsectionManagementPage } from "../../modules/courses/pages/SubsectionPage";
=======
import { createBrowserRouter, Outlet, Navigate} from "react-router-dom";
import { Layout } from "../../modules/layout/components/Layout";
import { CreateCoursePage } from "../../modules/courses/pages/CreateCoursePage";
import { MyLearning } from "../../modules/courses/pages/MyLearning";
import { CourseViewer } from "../../modules/courses/pages/CourseViewer";
>>>>>>> feature/course-form

export const router = createBrowserRouter([
    {
        path: "/",
<<<<<<< HEAD
        element: <App />,
    },
    {
        path: "/courses/create",
        element: <CreateCoursePage />,
    },
    {
        path: "/modules/create",
        element: <ModuleManagementPage />,
    },
    {
        path: "/sections/create",
        element: <SectionManagementPage />,
    },
    {
        path: "/subsections/create",
        element: <SubsectionManagementPage />,
=======
        element: (
            <Layout>
                <Outlet />
            </Layout>
        ),
        children: [
            {
                path: "courses/create",
                element: <CreateCoursePage />,
            },
            { 
                index: true, 
                element: <Navigate 
                to="my-learning" replace />,
            },
            { 
                path: "my-learning", 
                element: <MyLearning />, },
            { 
                path: "my-learning/:courseId/*", 
                element: <CourseViewer />,
                // children: courseViewerChildren,
            },
        ],
>>>>>>> feature/course-form
    },
]);