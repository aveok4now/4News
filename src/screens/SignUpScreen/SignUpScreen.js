import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native';
import CustomInput from '../../components/customs/CustomInput/CustomInput';
import CustomButton from '../../components/customs/CustomButton/CustomButton';
import SocialSignInButtons from '../../components/customs/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import BottomSheet from 'react-native-simple-bottom-sheet';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {height} from '../../utils/global/getDimensions';
import GradientBackground from '../../components/GradientBackground';

SQLite.enablePromise(true);

const email_regex =
  /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const name_regex = /^[a-zA-Z]+$/;

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const panelRef = useRef(null);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [showTermsSheet, setShowTermsSheet] = useState(false);
  const [showPrivacySheet, setShowPrivacySheet] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isExistByUsername, setIsExistByUsername] = useState(false);
  const [isExistByUserEmail, setIsExistByUserEmail] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handlePasswordVisibilityChange = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (isTyping || !isButtonPressed) {
      setIsExistByUsername(false);
      setIsExistByUserEmail(false);
    }
  }, [isTyping, isButtonPressed]);

  const showToast = (text, type = 'error') => {
    Toast.show({
      text1: text,
      type: type,
      position: 'bottom',
      visibilityTime: 4000,
      autoHide: true,
    });
  };

  const onRegisterPressed = async data => {
    setIsButtonPressed(true);

    try {
      const db = await SQLite.openDatabase({name: 'news.db', location: 1});

      const [existingUserByUsername] = await db.executeSql(
        'SELECT * FROM Users WHERE userLogin = ?',
        [data.username],
      );
      const [existingUserByEmail] = await db.executeSql(
        'SELECT * FROM Users WHERE userEmail = ?',
        [data.email],
      );

      setIsExistByUsername(existingUserByUsername.rows.length > 0);
      setIsExistByUserEmail(existingUserByEmail.rows.length > 0);

      if (
        existingUserByUsername.rows.length > 0 ||
        existingUserByEmail.rows.length > 0
      ) {
        console.log(
          'Пользователь с таким именем или электронной почтой уже существует',
        );
        showToast('Пользователь с таким именем уже существует.');
      } else {
        let result = null;
        const getLastID = async (id, table) => {
          return new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql(
                `SELECT MAX(${id}) AS maxID FROM ${table}`,
                [],
                (_, {rows}) => {
                  const {maxID} = rows.item(0);
                  resolve(maxID || 0);
                },
                error => {
                  reject(error);
                },
              );
            });
          });
        };

        const lastUserID = await getLastID('userId', 'Users');
        const newUserID = lastUserID + 1;

        const lastAdminID = await getLastID('adminId', 'Administrators');
        const newAdminID = lastAdminID + 1;

        //let query1 = `DELETE FROM Administrators`;
        //                 let query2 = `
        //     INSERT INTO Administrators (adminId, adminLogin, adminPassword, adminComments, adminPosts, adminEmail)
        //     SELECT userId, userLogin, userPassword, 0, 0, userEmail
        //     FROM Users
        //     WHERE userLogin LIKE 'admin%';
        // `;

        //await db.executeSql(query1);
        //await db.executeSql(query2);

        if (data.username.includes('admin')) {
          [result] = await db.executeSql(
            'INSERT INTO Administrators (adminId, adminLogin, adminPassword, adminComments, adminPosts, adminEmail) VALUES (?, ?, ?, ?, ?, ?)',
            [newAdminID, data.username, data.password, 0, 0, data.email],
          );
        } else {
          [result] = await db.executeSql(
            'INSERT INTO Users (userId, userLogin, userPassword, userEmail) VALUES (?, ?, ?, ?)',
            [newUserID, data.username, data.password, data.email],
          );
        }

        if (result.rowsAffected > 0) {
          await AsyncStorage.setItem('username', data.username);
          await AsyncStorage.setItem('password', data.password);
          await AsyncStorage.setItem('email', data.email);

          console.log(data);
          navigation.navigate('Домашняя страница');
          navigation.reset({
            index: 0,
            routes: [{name: 'Домашняя страница'}],
          });
        } else {
          console.warn('Ошибка при добавлении пользователя в базу данных');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('Добро пожаловать !', {status: 'logout'});
  };

  const onTermsOfUsePressed = () => {
    //console.warn("Условия пользования");
    setShowTermsSheet(true);
    setBottomSheetVisible(true);
  };

  const onPrivacyPolicyPressed = () => {
    //console.warn("Политика конфиденциальности");
    setShowPrivacySheet(true);
    setBottomSheetVisible(true);
  };

  return (
    <>
      <StatusBar backgroundColor="#357ae0" />
      <GradientBackground colors={['#357ae0', '#48AFBD']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.root}>
            <CustomInput
              name="username"
              control={control}
              placeholder="Имя пользователя"
              rules={{
                required: 'Необходимо ввести имя пользователя',
                minLength: {
                  value: 5,
                  message: 'Имя пользователя должно быть не менее 5 символов',
                },
                maxLength: {
                  value: 15,
                  message: 'Имя пользователя должно быть не более 15 символов',
                },
                pattern: [
                  {value: name_regex, message: 'Некорректный ввод имени'},
                ],
              }}
              setIsTyping={setIsTyping}
              //selectionColor={'#C2F970'}
            />

            <CustomInput
              name="email"
              control={control}
              placeholder="Эл. почта"
              rules={{
                required: 'Необходимо ввести адрес эл.почты',
                pattern: {
                  value: email_regex,
                  message: 'Неправильный ввод электронной почты',
                },
              }}
              setIsTyping={setIsTyping}
              //selectionColor={'#00EEFB'}
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
                  message: 'Длина пароля должна быть не менее 5 символов',
                },
                maxLength: {
                  value: 15,
                  message: 'Длина пароля должна быть не больше 15 символов',
                },
              }}
              setIsTyping={setIsTyping}
              isPasswordVisible={isPasswordVisible}
              onPasswordVisibilityChange={handlePasswordVisibilityChange}
              //selectionColor={'#DF57BC'}
            />

            <CustomInput
              name="password-repeat"
              control={control}
              placeholder="Повторите пароль"
              secureTextEntry
              showeye={false}
              rules={{
                validate: value => value === pwd || 'Пароли не совпадают',
              }}
              setIsTyping={setIsTyping}
              isPasswordVisible={isPasswordVisible}
              onPasswordVisibilityChange={handlePasswordVisibilityChange}
              //selectionColor={'#F6AE2D'}
            />

            <CustomButton
              text="Зарегестрироваться"
              onPress={handleSubmit(onRegisterPressed)}
              showBorder
            />

            <Text style={styles.text}>
              Регистрируясь, Вы подтверждаете, что принимаете наши {''}
              <Text style={styles.link} onPress={onTermsOfUsePressed}>
                Условия использования
              </Text>{' '}
              и{' '}
              <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
                Политику конфиденциальности
              </Text>
            </Text>

            <SocialSignInButtons />

            <CustomButton
              text="Есть аккаунт? Войти."
              onPress={onSignInPress}
              type="Tertiary"
            />

            <Toast />
          </View>

          {showTermsSheet && (
            <BottomSheet
              ref={panelRef}
              onClose={() => setShowTermsSheet(false)}
              sliderMaxHeight={height}
              wrapperStyle={styles.bottomSheet}>
              <View style={{height: 500}}>
                <Text style={styles.terms}>Условия использования</Text>
                <Text
                  style={{
                    paddingVertical: 20,
                    textAlign: 'justify',
                    fontFamily: 'Inter-Light',
                  }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Commodo elit at imperdiet dui accumsan sit amet nulla
                  facilisi. Auctor neque vitae tempus quam pellentesque nec.
                  Massa enim nec dui nunc mattis enim ut. Diam vulputate ut
                  pharetra sit amet. Convallis aenean et tortor at risus viverra
                  adipiscing. Dis parturient montes nascetur ridiculus mus
                  mauris vitae ultricies leo. Volutpat lacus laoreet non
                  curabitur gravida arcu. Nunc eget lorem dolor sed. Nullam ac
                  tortor vitae purus faucibus ornare. Massa ultricies mi quis
                  hendrerit. Neque sodales ut etiam sit amet nisl. Sed libero
                  enim sed faucibus turpis in. Nulla facilisi morbi tempus
                  iaculis urna id volutpat lacus. Ac ut consequat semper viverra
                  nam. Sodales ut etiam sit amet nisl purus. Vitae semper quis
                  lectus nulla at volutpat diam ut venenatis. Vitae aliquet nec
                  ullamcorper sit amet risus nullam.
                </Text>
              </View>
            </BottomSheet>
          )}

          {showPrivacySheet && (
            <BottomSheet
              ref={panelRef}
              onClose={() => setShowPrivacySheet(false)}
              sliderMaxHeight={height}
              wrapperStyle={styles.bottomSheet}>
              <View style={{height: 500}}>
                <Text style={styles.terms}>Политика конфиденциальности</Text>
                <Text
                  style={{
                    paddingVertical: 20,
                    textAlign: 'justify',
                    fontFamily: 'Inter-Light',
                  }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis viverra nibh cras pulvinar mattis nunc sed blandit. Nec
                  tincidunt praesent semper feugiat nibh sed pulvinar proin
                  gravida. In est ante in nibh mauris cursus. Urna neque viverra
                  justo nec ultrices dui sapien. Quam vulputate dignissim
                  suspendisse in est ante in nibh mauris. Vel fringilla est
                  ullamcorper eget nulla facilisi etiam dignissim. In arcu
                  cursus euismod quis viverra nibh cras. Adipiscing elit ut
                  aliquam purus sit amet luctus. Sagittis purus sit amet
                  volutpat consequat. Cras ornare arcu dui vivamus arcu felis.
                  Nunc id cursus metus aliquam eleifend mi in nulla. Nunc
                  lobortis mattis aliquam faucibus purus in massa tempor nec.
                  Aliquet sagittis id consectetur purus ut faucibus. Risus
                  viverra adipiscing at in. Leo vel orci porta non pulvinar
                  neque laoreet suspendisse.
                </Text>
              </View>
            </BottomSheet>
          )}
        </ScrollView>
      </GradientBackground>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    marginTop: '10%',
    flex: 1,
  },
  text: {
    fontSize: 12,
    color: '#FCF7F8',
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'Inter-ExtraLight',
  },
  link: {
    color: '#9FFFCB',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    fontFamily: 'Inter-Light',
  },
  bottomSheet: {
    //marginTop: '50%'
    backgroundColor: '#7da9f2',
  },

  terms: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Inter-ExtraBold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  errorText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 14,
    color: '#F0A5A5',
    paddingVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
});

export default SignUpScreen;
