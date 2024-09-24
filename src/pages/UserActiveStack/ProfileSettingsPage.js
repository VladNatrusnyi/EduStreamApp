import {ProfilePageWrapper} from "../../wrappers/ProfilePageWrapper";
import {Text} from "react-native";
import {ActiveAreaWrapper} from "../../wrappers/ActiveAreaWrapper";
import {SettingsAccordion} from "../../components/UI/SettingsAccordion";

export const ProfileSettingsPage = () => {
    return (
        <ActiveAreaWrapper
            isPageWithKeyboard={true}
            myStyle={{flex: 1}}
        >
            <ProfilePageWrapper>
                <SettingsAccordion />
            </ProfilePageWrapper>
        </ActiveAreaWrapper>
    )
}