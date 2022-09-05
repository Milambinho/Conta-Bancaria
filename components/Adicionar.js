import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import api from '../utils/Api';

export const Adicionar = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = useState('');

    const Cadastrar = () => {

        var URL = "";
        var data = [];

        if (props.tipo == "Cliente") {
            data = {
                nome: text
            }
            URL = "usuarios";
        }

        if (props.tipo == "Saldo") {
            data = {
                valor: parseFloat(text),
                usuarioId: props.idUsuario
            }
            URL = "usuarios/" + props.idUsuario + "/saldos";
        }

        api.post(URL, data).then(() => {
            setModalVisible(false)
            props.navigation.push(props.tipo + 's', { id: props.idUsuario, nome: props.nome })
        });
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitulo}>Novo {props.tipo}</Text>
                            <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(false)}>
                                <Text style={styles.txt}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput placeholder={props.tipo} style={styles.input} onChangeText={onChangeText} value={text} />
                        <TouchableOpacity style={styles.btnCadastro} onPress={() => Cadastrar()}>
                            <Text style={styles.txt}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
                <Text style={styles.txt}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Adicionar;

const styles = StyleSheet.create({
    btn: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#3F3D46',
        width: "50px",
        height: "50px",
        borderRadius: "12px",
        marginRight: "20px"
    },
    txt: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: "36px",
        marginTop: "-10px"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "100%",
        minHeight: "50%",
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitulo: {
        fontSize: "30px",
        fontWeight: "bold",
        color: "#3F3D46",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%"
    },
    input: {
        width: "100%",
        height: 40,
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: "12px"
    },
    btnCadastro: {
        flex: 1,
        backgroundColor: "#3F3D46",
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius: 10,
        margin: 10
    }
});