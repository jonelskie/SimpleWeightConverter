import { React, useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, KeyboardAvoidingView, Pressable } from 'react-native';

export default function App() {

  const [input, onChangeInput] = useState()
  const [result, onChangeResult] = useState();
  const [weight, setweight] = useState({ l: 'pounds', r: 'pounds' });
  const [status, setStatus] = useState({ modal: false, weightDirection: 'l' });

  let wLeft = weight.l, wRight = weight.r

  const weightOnChange = (len) => {
    setStatus({ modal: false, weightDirection: status.weightDirection })

    if (status.weightDirection === 'l') wLeft = len
    else if (status.weightDirection === 'r') wRight = len

    setweight({ l: wLeft, r: wRight })

    onChangeResult('')
    onChangeInput('')
  }

  const calculate = (num) => {
    onChangeInput(num)
    num = parseInt(num)

    // Pounds
    if (weight.l === 'pounds' && weight.r === 'kilograms') num /= 2.205
    if (weight.l === 'pounds' && weight.r === 'ounces') num *= 16
    if (weight.l === 'pounds' && weight.r === 'stones') num /= 14

    // Kilograms
    if (weight.l === 'kilograms' && weight.r === 'pounds') num *= 2.205
    if (weight.l === 'kilograms' && weight.r === 'ounces') num *= 35.274
    if (weight.l === 'kilograms' && weight.r === 'stones') num /= 6.35

    // Ounces
    if (weight.l === 'ounces' && weight.r === 'pounds') num /= 16
    if (weight.l === 'ounces' && weight.r === 'kilograms') num /= 35.274
    if (weight.l === 'ounces' && weight.r === 'stones') num /= 224

    // Stones
    if (weight.l === 'stones' && weight.r === 'pounds') num *= 14
    if (weight.l === 'stones' && weight.r === 'kilograms') num *= 6.35
    if (weight.l === 'stones' && weight.r === 'ounces') num *= 224

    onChangeResult(num)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent={true}
        visible={status.modal}
        style={styles.modal}
        animationType='slide'>

        <View style={styles.container}>
          <View style={styles.modalView}>
            <Pressable styles={[styles.weightButtons, styles.buttonClose]} onPress={() => weightOnChange('pounds')}>
              <Text style={styles.weightItems}>pounds</Text>
            </Pressable>

            <Pressable styles={styles.weightButtons} onPress={() => weightOnChange('kilograms')}>
              <Text style={styles.weightItems}>kilograms</Text>
            </Pressable>

            <Pressable styles={styles.weightButtons} onPress={() => weightOnChange('ounces')}>
              <Text style={styles.weightItems}>ounces</Text>
            </Pressable>

            <Pressable styles={styles.weightButtons} onPress={() => weightOnChange('stones')}>
              <Text style={styles.weightItems}>stones</Text>
            </Pressable>

          </View>
        </View>

      </Modal>

      <View style={styles.result}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>{result}</Text>
      </View>

      <KeyboardAvoidingView
        behavior={'height'}
        style={styles.writeTaskWrapper}>

        <View style={styles.weightWrapper}>
          <TouchableOpacity style={styles.weight} onPress={() => setStatus({ modal: true, weightDirection: 'l' })}>
            <Text style={{ color: 'grey', fontWeight: 'bold' }}>{weight.l}</Text>
          </TouchableOpacity>
          <Text style={{ color: 'grey', fontWeight: 'bold' }}>=</Text>
          <TouchableOpacity style={styles.weight} onPress={() => setStatus({ modal: true, weightDirection: 'r' })}>
            <Text style={{ color: 'grey', fontWeight: 'bold' }}>{weight.r}</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder={"Input here..."}
          onChangeText={text => calculate(text)}
          value={input}
        />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: '80%',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  weightItems: {
    backgroundColor: '#03c2fc',
    borderRadius: 5,
    width: 200,
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
    color: '#808080',
    fontWeight: 'bold'
  },
  result: {
    padding: 10,
    borderRadius: 5,
    padding: 50,
    minWidth: '80%',
    alignItems: 'center',
  },
  weightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 250,
    marginBottom: 10,
  },
  weight: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    margin: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    padding: 5,
    width: 250,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '95%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffff',
    borderRadius: 15,
    elevation: 2
  },
});
