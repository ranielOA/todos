import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
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
        setTasks(tasks.filter((task) => task.id !== id));
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
