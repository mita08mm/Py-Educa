import { createBrowserRouter, Outlet, Navigate} from "react-router-dom";
import { Layout } from "../../modules/layout/components/Layout";
import { CreateCoursePage } from "../../modules/courses/pages/CreateCoursePage";
import { MyLearning } from "../../modules/courses/pages/MyLearning";
import { CourseViewer } from "../../modules/courses/pages/CourseViewer";

export const router = createBrowserRouter([
    {
        path: "/",
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
    },
]);