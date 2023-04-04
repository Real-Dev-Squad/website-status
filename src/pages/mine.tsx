import { FC, useState, useEffect } from "react";
import { useAppContext } from "@/context";
import Head from "@/components/head";
import Layout from "@/components/Layout";
import Card from "@/components/tasks/card";
import useFetch from "@/hooks/useFetch";
import classNames from "@/styles/tasks.module.scss";
import task from "@/interfaces/task.type";
import { LOGIN_URL, TASKS_URL } from "@/components/constants/url";

function CardList(tasks: task[]) {
    return tasks.map((item: task) => (
        <Card
            content={item}
            key={item.id}
            shouldEdit={false}
            onContentChange={undefined}
        />
    ));
}

const Mine: FC = () => {
    const [tasks, setTasks] = useState<task[]>([]);
    const { response, error, isLoading, callAPI } = useFetch(
        TASKS_URL,
        {},
        false
    );
    const { state } = useAppContext();
    const { isLoading: isAuthenticating, isLoggedIn } = state;
    useEffect(() => {
        if (isLoggedIn && !Object.keys(response).length) {
            callAPI();
            setTasks(response);
        }
    }, [isLoggedIn, response]);

    return (
        <Layout>
            <Head title="Mine" />
            <div className={classNames.container}>
                <div className={classNames.container}>
                    {!isAuthenticating &&
                        (isLoggedIn ? (
                            isLoading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>
                                    Something went wrong! Please contact admin
                                </p>
                            ) : (
                                <>
                                    {tasks.length > 0 ? (
                                        <div>{CardList(tasks)}</div>
                                    ) : (
                                        <p>No Tasks Found</p>
                                    )}
                                </>
                            )
                        ) : (
                            <div>
                                <p>You are not Authorized</p>
                                <a
                                    href={LOGIN_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Click here to Login
                                </a>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    );
};
export default Mine;
