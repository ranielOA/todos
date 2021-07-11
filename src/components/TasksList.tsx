import { TaskItem } from './TaskItem';
import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { ItemWrapper } from './ItemWrapper';

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksListProps {
    tasks: Task[];
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TasksList({
    tasks,
    toggleTaskDone,
    removeTask,
    editTask,
}: TasksListProps) {
    return (
        <FlatList
            data={tasks}
            keyboardShouldPersistTaps="always"
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
                return (
                    <ItemWrapper index={index}>
                        <TaskItem
                            index={index}
                            task={item}
                            toggleTaskDone={toggleTaskDone}
                            removeTask={removeTask}
                            editTask={editTask}
                        />
                    </ItemWrapper>
                );
            }}
            style={{
                marginTop: 32,
            }}
        />
    );
}
