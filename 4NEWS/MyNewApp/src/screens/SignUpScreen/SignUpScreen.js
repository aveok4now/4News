import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SQLite from 'react-native-sqlite-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

SQLite.enablePromise(true);
const email_regex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const name_regex = /^[a-zA-Z]+$/;
const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');
    const navigation = useNavigation();
    const panelRef = useRef(null);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [showTermsSheet, setShowTermsSheet] = useState(false);
    const [showPrivacySheet, setShowPrivacySheet] = useState(false);
    const [isTyping, setIsTyping] = useState(false);



    const onRegisterPressed = async (data) => {
        try {
            const db = await SQLite.openDatabase({ name: 'news.db', location: 1 });
            const getLastUserID = async () => {
                return new Promise((resolve, reject) => {
                    db.transaction((tx) => {
                        tx.executeSql('SELECT MAX(userID) AS maxID FROM Users', [], (_, { rows }) => {
                            const { maxID } = rows.item(0);
                            resolve(maxID || 0);
                        },
                            (error) => {
                                reject(error);
                            });
                    });
                });
            };

            const lastUserID = await getLastUserID();
            const newUserID = lastUserID + 1;

            const [result] = await db.executeSql('INSERT INTO Users (userID, userLogin, userPassword) VALUES (?, ?, ?)', [newUserID, data.username, data.password]);

            if (result.rowsAffected > 0) {
                await AsyncStorage.setItem('username', data.username);
                await AsyncStorage.setItem('password', data.password);
                console.log(data)
                navigation.navigate('Домашняя страница');
            } else {
                console.warn('Ошибка при добавлении пользователя в базу данных');
            }
        } catch (error) {
            console.error(error);
        }
    };



    const onSignInPress = () => {
        navigation.navigate("Добро пожаловать !")
    }


    const onTermsOfUsePressed = () => {
        //console.warn("Условия пользования");
        setShowTermsSheet(true);
        setBottomSheetVisible(true);
    }

    const onPrivacyPolicyPressed = () => {
        //console.warn("Политика конфиденциальности");
        setShowPrivacySheet(true);
        setBottomSheetVisible(true);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.root}>
                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Имя пользователя"
                    rules={{
                        required: 'Необходимо ввести имя пользователя',
                        minLength: { value: 5, message: 'Имя пользователя должно быть не менее 5 символов' },
                        maxLength: { value: 15, message: 'Имя пользователя должно быть не более 15 символов' },
                        pattern: { value: name_regex, message: 'Некорректный ввод имени' }
                    }}
                    setIsTyping={setIsTyping}
                    selectionColor={'#C2F970'}
                />

                <CustomInput
                    name="email"
                    control={control}
                    placeholder="Эл. почта"
                    rules={{
                        required: 'Необходимо ввести адрес эл.почты',
                        pattern: { value: email_regex, message: 'Неправильный ввод электронной почты' }
                    }}
                    setIsTyping={setIsTyping}
                    selectionColor={'#00EEFB'}
                />

                <CustomInput
                    name="password"
                    control={control}
                    placeholder="Пароль"
                    secureTextEntry
                    rules={{
                        required: 'Необходимо ввести пароль',
                        minLength: {
                            value: 5,
                            message: 'Длина пароля должна быть не менее 5 символов'
                        },
                        maxLength: {
                            value: 15,
                            message: 'Длина пароля должна быть не больше 15 символов'
                        }
                    }}
                    setIsTyping={setIsTyping}
                    selectionColor={'#DF57BC'}
                />

                <CustomInput
                    name="password-repeat"
                    control={control}
                    placeholder="Повторите пароль"
                    secureTextEntry
                    rules={{
                        validate: value =>
                            value === pwd || 'Пароли не совпадают',
                    }}
                    setIsTyping={setIsTyping}
                    selectionColor={'#F6AE2D'}
                />

                <CustomButton
                    text="Зарегестрироваться"
                    onPress={handleSubmit(onRegisterPressed)}
                />

                <Text style={styles.text}>
                    Регистрируясь, Вы подтверждаете, что принимаете наши {''}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Условия использования</Text> и <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Политику конфиденциальности</Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    text="Есть аккаунт? Войти."
                    onPress={onSignInPress}
                    type="Tertiary"
                />

            </View>

            {showTermsSheet && (
                <BottomSheet
                    ref={panelRef}
                    onClose={() => setShowTermsSheet(false)}
                    sliderMaxHeight={height}
                    wrapperStyle={styles.bottomSheet}

                >
                    <View style={{ height: 500 }}>
                        <Text style={styles.terms}>Условия использования</Text>
                        <Text style={{ paddingVertical: 20, textAlign: 'justify' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Auctor neque vitae tempus quam pellentesque nec. Massa enim nec dui nunc mattis enim ut. Diam vulputate ut pharetra sit amet. Convallis aenean et tortor at risus viverra adipiscing. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Volutpat lacus laoreet non curabitur gravida arcu. Nunc eget lorem dolor sed. Nullam ac tortor vitae purus faucibus ornare. Massa ultricies mi quis hendrerit. Neque sodales ut etiam sit amet nisl. Sed libero enim sed faucibus turpis in. Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Ac ut consequat semper viverra nam.

                            Sodales ut etiam sit amet nisl purus. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Eu volutpat odio facilisis mauris sit amet massa vitae. Porttitor rhoncus dolor purus non. Pharetra magna ac placerat vestibulum lectus mauris ultrices. Viverra mauris in aliquam sem fringilla ut morbi. Nam at lectus urna duis convallis. In cursus turpis massa tincidunt dui. Nibh venenatis cras sed felis eget velit aliquet sagittis. Pellentesque nec nam aliquam sem et tortor consequat.

                            Vitae aliquet nec ullamcorper sit amet risus nullam.

                        </Text>
                    </View>
                </BottomSheet>
            )}

            {showPrivacySheet && (
                <BottomSheet
                    ref={panelRef}
                    onClose={() => setShowPrivacySheet(false)}
                    sliderMaxHeight={height}
                    wrapperStyle={styles.bottomSheet}
                >
                    <View style={{ height: 500 }}>
                        <Text style={styles.terms}>Политика конфиденциальности</Text>
                        <Text style={{ paddingVertical: 20, textAlign: 'justify' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. In est ante in nibh mauris cursus. Urna neque viverra justo nec ultrices dui sapien. Quam vulputate dignissim suspendisse in est ante in nibh mauris. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. In arcu cursus euismod quis viverra nibh cras. Adipiscing elit ut aliquam purus sit amet luctus. Sagittis purus sit amet volutpat consequat. Cras ornare arcu dui vivamus arcu felis.

                            Nunc id cursus metus aliquam eleifend mi in nulla. Nunc lobortis mattis aliquam faucibus purus in massa tempor nec. Aliquet sagittis id consectetur purus ut faucibus. Risus viverra adipiscing at in. Leo vel orci porta non pulvinar neque laoreet suspendisse. Vitae nunc sed velit dignissim sodales ut. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Lobortis mattis aliquam faucibus purus in. Malesuada fames ac turpis egestas maecenas. Enim ut tellus elementum sagittis vitae et leo duis ut. Aliquet nec ullamcorper sit amet risus. Posuere urna nec tincidunt praesent semper feugiat. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Nibh nisl condimentum id venenatis a.


                        </Text>
                    </View>
                </BottomSheet>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        marginTop: '10%',
        flex: 1
    },
    text: {
        fontSize: 12,
        color: '#FCF7F8',
        marginVertical: 10,
        textAlign: 'center'
    },
    link: {
        color: '#9FFFCB',
    },
    bottomSheet: {
        //marginTop: '50%'
        backgroundColor: '#7da9f2',

    },

    terms: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    }

})

export default SignUpScreen;
