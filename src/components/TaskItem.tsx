import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconM from 'react-native-vector-icons/MaterialIcons';
import trashIcon from '../assets/icons/trash/trash.png';
import { Task } from './TasksList';

interface TasksItemProps {
    index: number;
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({
    index,
    task,
    toggleTaskDone,
    removeTask,
    editTask,
}: TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [titleEdited, setTitleEdited] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setTitleEdited(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, titleEdited);
        setIsEditing(false);
    }

    useEffect(() => {
        if (isEditing) {
            textInputRef?.current?.focus();
        } else {
            textInputRef?.current?.blur();
        }
    }, [isEditing]);

    const styles = style(isEditing);

    return (
        <>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => !isEditing && toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={
                            task.done
                                ? styles.taskMarkerDone
                                : styles.taskMarker
                        }
                    >
                        {task.done && (
                            <Icon name="check" size={12} color="#FFF" />
                        )}
                    </View>

                    <TextInput
                        value={titleEdited}
                        onChangeText={setTitleEdited}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        style={
                            task.done ? styles.taskTextDone : styles.taskText
                        }
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                <TouchableOpacity
                    hitSlop={{ top: 15, right: 15, left: 15, bottom: 15 }}
                    onPress={() =>
                        isEditing ? handleCancelEditing() : handleStartEditing()
                    }
                >
                    <IconM
                        name={isEditing ? 'close' : 'edit'}
                        color="#B2B2B2"
                        size={24}
                    />
                </TouchableOpacity>

                <View style={styles.buttonsDivider} />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    hitSlop={{ top: 15, right: 15, left: 15, bottom: 15 }}
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing ? true : false}
                    style={styles.deleteButton}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const style = (isEditing: boolean) =>
    StyleSheet.create({
        taskButton: {
            flex: 1,
            paddingHorizontal: 24,
            paddingVertical: 15,
            marginBottom: 4,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
        },
        taskMarker: {
            height: 16,
            width: 16,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#B2B2B2',
            marginRight: 15,
            alignItems: 'center',
            justifyContent: 'center',
        },
        taskText: {
            color: '#666',
            fontFamily: 'Inter-Medium',
            flex: 1,
        },
        taskMarkerDone: {
            height: 16,
            width: 16,
            borderRadius: 4,
            backgroundColor: '#1DB863',
            marginRight: 15,
            alignItems: 'center',
            justifyContent: 'center',
        },
        taskTextDone: {
            color: '#1DB863',
            textDecorationLine: 'line-through',
            fontFamily: 'Inter-Medium',
        },
        iconsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginRight: 24,
        },
        buttonsDivider: {
            width: 1,
            height: 24,
            backgroundColor: 'rgba(196, 196, 196, 0.24)',
            marginHorizontal: 12,
        },
        deleteButton: {
            opacity: isEditing ? 0.2 : 1,
        },
    });
