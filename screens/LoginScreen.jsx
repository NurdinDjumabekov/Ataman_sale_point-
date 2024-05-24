import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeDataLogin, clearLogin } from "../store/reducers/stateSlice";
import { ViewInput } from "../customsTags/ViewInput";
import { ViewContainer } from "../customsTags/ViewContainer";
import { ViewButton } from "../customsTags/ViewButton";
import { logInAccount } from "../store/reducers/requestSlice";
import logo from "../assets/images/logo.png";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dataLogin } = useSelector((state) => state.stateSlice);
  const { data } = useSelector((state) => state.saveDataSlice);

  const onChangeLogin = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, login: text }));
  };

  const onChangePassword = (text) => {
    dispatch(changeDataLogin({ ...dataLogin, password: text }));
  };

  const sendLogin = () => {
    if (dataLogin?.login && dataLogin?.password) {
      dispatch(logInAccount({ dataLogin, navigation, data }));
    } else {
      alert("Введите логин и пароль!");
    }
  };

  useEffect(() => {
    dispatch(clearLogin());
  }, []);

  return (
    <View styles={{ position: "relative" }}>
      <ViewContainer>
        <View>
          <Image style={styles.imgLogo} source={logo} />
          <ViewInput
            text="Введите логин"
            value={dataLogin?.login}
            onChangeText={onChangeLogin}
            placeholder="Ваш логин"
          />
          <ViewInput
            text="Введите пароль"
            value={dataLogin?.password}
            onChangeText={onChangePassword}
            placeholder="Ваш пароль"
            typePassword={true}
          />
        </View>
      </ViewContainer>
      <ViewButton onclick={sendLogin} styles={styles.loginBtn}>
        Войти
      </ViewButton>
    </View>
  );
};

const styles = StyleSheet.create({
  loginBtn: {
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    backgroundColor: "#e5322d",
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    minWidth: "90%",
    color: "#fff",
    marginTop: 0,
  },

  imgLogo: {
    width: 140,
    height: 140,
    // backgroundColor: "green",
    alignSelf: "center",
    marginBottom: 10,
  },
});