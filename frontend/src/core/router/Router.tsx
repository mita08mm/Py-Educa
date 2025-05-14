import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import { CreateCoursePage } from "../../modules/courses/pages/CreateCoursePage";
import { ModuleManagementPage } from "../../modules/courses/pages/ModulePage";
import { SectionManagementPage } from "../../modules/courses/pages/SectionPage";
import { SubsectionManagementPage } from "../../modules/courses/pages/SubsectionPage";
import { MyLearning } from "../../modules/courses/pages/MyLearning";
// import CourseViewer from "../../modules/courses/pages/CourseViewer"; 

export const router = createBrowserRouter([
    {
        path: "/",
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
    },
    { 
        path: "my-learning", 
        element: <MyLearning />, 
    },
    { 
        path: "my-learning/:courseId/*", 
        element: <MyLearning />,
    },
]);