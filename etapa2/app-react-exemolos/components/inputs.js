import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity,
StyleSheet} from 'react-native'

class Inputs extends Component {
    state = {
        email: '',
        password: ''
    }
    handleEmail = (text) => {
        this.setState({email: text});
    }
    handlePassword = (text) => {
        this.setState({password: text}); 
    }
    Login = (email, pass) => {
        alert(`email: ${email} \npassword: ${pass}`)
    }
    

    render() { 
        return (
            <View style={StyleSheet.container}> 
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={this.handleEmail}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="password"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    secureTextEntry
                    onChangeText={this.handlePassword}
                /> 
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.Login(
                            this.state.email,
                            this.state.password
                        )
                    }
                >
                    <Text style={styles.submitButtonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Inputs;

const styles = StyleSheet.create({
    container: {
        paddingTop: 24
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    }
});