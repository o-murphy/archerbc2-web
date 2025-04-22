import { useThemeToggle } from "@/hooks/useThemeToggle";
import { md3PaperIconSource } from "../icons/md3PaperIcons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FileMenu } from "./fileMenu";
import { Appbar } from "react-native-paper";
import CountryFlag from "react-native-country-flag";


export const TopBar = ({ title }: { title: string }) => {
    const { theme, toggleTheme } = useThemeToggle()
    const themeIcon = md3PaperIconSource({ name: theme.dark ? "dark-mode" : "light-mode" });

    const { i18n, t } = useTranslation();
    const [currentLang, setCurrentLang] = useState<'en' | 'ua'>(() => i18n.language === 'ua' ? 'ua' : 'en');
    // const translateIcon = md3PaperIconSource({ name: "translate" })

    const toggleLanguage = async () => {
        const newLang = currentLang === 'en' ? 'ua' : 'en';
        await i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };

    return (
        <Appbar.Header>
            <FileMenu />
            <Appbar.Content title={title} />
            <Appbar.Action icon={themeIcon} onPress={toggleTheme} />
            {/* <Appbar.Action icon={translateIcon} onPress={toggleLanguage} /> */}
            <Appbar.Action icon={
                (props) => <CountryFlag isoCode={currentLang === 'en' ? 'ua' : 'us'} {...props} />
            } onPress={toggleLanguage} />
        </Appbar.Header>
    );
}