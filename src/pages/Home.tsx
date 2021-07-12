import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
import { AlertModal, AlertProps, Options } from '../components/AlertModal';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [alertModalProps, setAlertModalProps] = useState<AlertProps>();

    function showModal(title: string, options?: Options[]) {
        setAlertModalProps({
            isVisible: true,
            title: title,
            options: options,
        });
    }

    function closeModal(onHide: boolean) {
        if (onHide) {
            setAlertModalProps({ isVisible: false, title: '', options: [] });
            return;
        }

        setAlertModalProps({
            isVisible: false,
            title: alertModalProps?.title,
            options: alertModalProps?.options,
        });
    }

    function handleAddTask(newTaskTitle: string) {
        const repeatedTask = tasks.find((task) => task.title === newTaskTitle);
        if (repeatedTask) {
            showModal('Você não pode cadastrar uma task com o mesmo nome');

            return;
        }

        if (!newTaskTitle || repeatedTask) {
            return;
        }

        const newTask = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false,
        };

        setTasks((oldTasks) => [...oldTasks, newTask]);
    }

    function handleToggleTaskDone(id: number) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    done: !task.done,
                };
            }

            return { ...task };
        });

        setTasks(updatedTasks);
    }

    function handleRemoveTask(id: number) {
        showModal('Tem certeza que você deseja remover esse item?', [
            {
                text: 'Não',
            },
            {
                text: 'Sim',
                optionSelected: () => {
                    setTasks(tasks.filter((task) => task.id !== id));
                },
            },
        ]);
    }

    function handleEditTask(taskId: number, taskNewTitle: string) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    title: taskNewTitle,
                };
            }

            return { ...task };
        });

        setTasks(updatedTasks);
    }

    return (
        <View style={styles.container}>
            <AlertModal
                isVisible={alertModalProps?.isVisible}
                title={alertModalProps?.title}
                options={alertModalProps?.options}
                closeModal={(onHide) => closeModal(onHide)}
            />

            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
                editTask={handleEditTask}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
});
