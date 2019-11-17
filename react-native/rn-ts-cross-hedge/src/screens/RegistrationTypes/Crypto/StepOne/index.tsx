import React from "react";
import { SafeAreaView, Text } from "react-native";
import FormBuilder from "../../../../components/FormBuilder";
import RegistrationTemplate from "../../../../components/RegistrationScreenTemplate";
import { router } from "../../../../services/router";
import { storage } from "../../../../services/storage";
import { User } from "../../../../types/userInfo";
import { t } from "../../../../utils/t";
import { theme } from "./theme";

interface State {
    errorMsg?: string;
    publicKey: string;
}

class CryptoStepOne extends React.PureComponent<any, State> {
    private form!: FormBuilder;
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: undefined,
            publicKey: ""
        };
    }
    render() {
        return (
            <SafeAreaView style={theme.safeArea}>
                <RegistrationTemplate
                    isDefaultContinueButton={true}
                    isDefaultTitle={false}
                    isBtnActive={
                        this.state.errorMsg !== undefined &&
                        !this.state.errorMsg
                    }
                    btnContent={t("btn_content_continue")}
                    isWarning={true}
                    warningContent={t("registration_type_crypto_warning")}
                    onStepForward={this.onPress}
                    style={{ width: "80%" }}
                >
                    <Text style={theme.title}>
                        {t("registration_type_crypto_title")}
                    </Text>
                    <FormBuilder
                        onRef={ref => (this.form = ref)}
                        fields={[
                            {
                                name: "key",
                                props: {
                                    placeholder: t(
                                        "registration_type_crypto_placeholder"
                                    ),
                                    errorMsg: this.state.errorMsg,
                                    getValue: this.handleInput
                                }
                            }
                        ]}
                    />
                </RegistrationTemplate>
            </SafeAreaView>
        );
    }

    handleInput = (value: string) => {
        this.setState({
            publicKey: value,
            errorMsg: this.validateKey(value)
        });
    };

    validateKey = (value: string) => {
        if (!value) return "Required";

        return "";
    };

    onPress = () => {
        this.form.validate();
        !this.validateKey(this.state.publicKey) &&
            storage
                .setStorageItem<User>("user", {
                    user_info: {
                        public_key: this.state.publicKey
                    }
                })
                .then(() => {
                    router.replaceRoute("registration_completed");
                });
    };
}

export default CryptoStepOne;
