import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export interface Options {
    text: string;
    optionSelected?: () => void;
}

export interface AlertProps {
    isVisible: boolean | undefined;
    title: string | undefined;
    options: Options[] | undefined;
}

interface AlertModalProps extends AlertProps {
    closeModal: (onHide: boolean) => void;
}

export function AlertModal({
    isVisible,
    title,
    options = [{ text: 'Fechar' }],
    closeModal,
}: AlertModalProps) {
    function handleOptionSelected(option: Options) {
        if (option.optionSelected) {
            option.optionSelected();
        }
        closeModal(false);
    }

    return (
        <Modal
            animationIn="slideInDown"
            statusBarTranslucent
            isVisible={isVisible}
            onBackButtonPress={() => closeModal(false)}
            onBackdropPress={() => closeModal(false)}
            style={{ margin: 0 }}
            backdropOpacity={0.2}
            onModalHide={() => closeModal(true)}
        >
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>

                <View style={styles.optionsContainer}>
                    {options?.map((option, index) => (
                        <View key={index} style={styles.optionsContainer2}>
                            <TouchableOpacity
                                onPress={() => handleOptionSelected(option)}
                                style={styles.button}
                            >
                                <Text>{option.text}</Text>
                            </TouchableOpacity>

                            {options?.length !== index + 1 && (
                                <View style={styles.divider} />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginHorizontal: 40,
        borderRadius: 10,
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 16,
    },
    optionsContainer: {
        flexDirection: 'row',
    },
    optionsContainer2: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        padding: 14,
        borderTopWidth: 1,
        borderTopColor: '#B2B2B2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divider: {
        width: 1,
        backgroundColor: '#B2B2B2',
    },
});
