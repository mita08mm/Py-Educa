import { createBrowserRouter, Outlet } from "react-router-dom";
import { Layout } from "../../modules/layout/components/Layout";
import { CreateCoursePage } from "../../modules/courses/pages/CreateCoursePage";

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
        ],
    },
]);