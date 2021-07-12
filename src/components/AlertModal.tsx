import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

export interface Options {
    text: string;
    optionSelected: () => void;
}

export interface AlertProps {
    isVisible: boolean;
    title: string | undefined;
    options: Options[] | undefined;
}

interface AlertModalProps {
    alertProps: AlertProps | undefined;
    closeModal: (onHide: boolean) => void;
}

export function AlertModal({ alertProps, closeModal }: AlertModalProps) {
    return (
        <Modal
            animationIn="slideInDown"
            statusBarTranslucent
            isVisible={alertProps?.isVisible}
            onBackButtonPress={() => closeModal(false)}
            onBackdropPress={() => closeModal(false)}
            style={{ margin: 0 }}
            backdropOpacity={0}
            onModalHide={() => closeModal(true)}
        >
            <View
                style={{
                    backgroundColor: 'white',
                    marginHorizontal: 40,
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 15,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>{alertProps?.title}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {alertProps?.options?.map((option, index) => (
                        <View
                            key={index}
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => option.optionSelected()}
                                style={{
                                    flex: 1,
                                    padding: 10,
                                    borderTopWidth: 1,
                                    borderTopColor: '#B2B2B2',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text>{option.text}</Text>
                            </TouchableOpacity>

                            {alertProps?.options?.length !== index + 1 && (
                                <View
                                    style={{
                                        width: 1,
                                        backgroundColor: '#B2B2B2',
                                    }}
                                />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </Modal>
    );
}
